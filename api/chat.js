/* ============================================================
   ServisPilot — Pilot Asistan AI Proxy (Vercel serverless)
   POST /api/chat  { messages: [{ role: 'user'|'assistant', content }] }
   dönüş: { reply, provider }

   - Birincil: Z.ai GLM-4.7-Flash · Yedek: Groq gpt-oss-120b
     (ikisi de OpenAI-uyumlu chat completions protokolü)
   - API anahtarları yalnızca env'de: ZAI_API_KEY, GROQ_API_KEY
   - Model adları env ile değiştirilebilir: ZAI_MODEL, GROQ_MODEL
   - Lokal/UI testi için: AI_MOCK_REPLY="..." → sağlayıcı çağrılmaz
   - Koruma: CORS kısıtlı, mesaj 500 krk, geçmiş 10 mesaj,
     IP başına RATE_LIMIT_PER_MIN (10), günlük DAILY_LIMIT (400)
   ============================================================ */

const SYSTEM_PROMPT = [
  'Sen "Pilot Asistan"sın — ServisPilot (bulut tabanlı oto servis yönetim sistemi) web sitesinin satış öncesi asistanı.',
  'Türkçe, samimi ve net konuşursun; en fazla 3-4 cümle yazarsın. Arada bir emoji kullanabilirsin ama abartmazsın.',
  '',
  'BİLGİ TABANIN (sadece bunlarla konuş, asla uydurma):',
  '- Paketler: Aylık 2.399 ₺/ay · 6 Aylık 1.899 ₺/ay (%21 indirim + 100 QR hediye) · Yıllık 1.599 ₺/ay (%33 indirim + 200 QR hediye, önerilen)',
  '- Tüm paketlerde 14 gün ücretsiz deneme; kredi kartı istenmez',
  '- Kurulumu ServisPilot ekibi ÜCRETSİZ yapar (~15 dakika); Excel/CSV veri aktarımı (müşteri, cari, stok) ~15 dakikada eksiksiz yapılır',
  '- Özellikler: Ruhsat OCR (saniyeler içinde iş emri), QR parça takibi (stok kaybı sıfır), WhatsApp onay portalı (öncesi/sonrası foto + parça listesi + tutar, onay sonrası otomatik ilerleme), yerleşik GİB E-Arşiv/E-Fatura (ek entegratör ücreti yok), Usta Kokpiti (sadece 4 büyük buton, okuma-yazma yeterli)',
  '- Güvenlik: ISO 27001 + KVKK uyumlu Türkiye merkezli sunucular, 256-bit SSL, günlük otomatik çift yedekleme',
  '- Taahhüt yok, iptal cezası yok, istediğin an bırakılır',
  '- İletişim: WhatsApp 0530 992 95 05 · info@servispilot.com.tr',
  '',
  'KURALLAR:',
  '1. Bilgi tabanında olmayan fiyat, özellik veya tarih vaat ETME; "bunu ekibe sorayım" deyip WhatsApp\'a yönlendir.',
  '2. Konu ServisPilot dışına çıkarsa kibarca geri dön: oraya yardımcı olamayacağını ama ServisPilot sorularında burada olduğunu söyle.',
  '3. Kayıt/deneme/kurulum niyeti görürsen yanıtın sonuna [[WHATSAPP]] etiketini; görüşme/randevu isteklerinde [[TAKVIM]] etiketini ekle. Her mesaja değil, gerçekten uygunsa ekle.',
  '4. Rakipler hakkında konuşma; indirim pazarlığı yapma ("en iyi koşulu ekip WhatsApp\'tan söyler").',
  '5. Kişisel veri (TC, kart, adres) isteme; sadece satış öncesi bilgi ver.',
  '6. Fiyatları yalnızca bilgi tabanındaki rakamlarla söyle.'
].join('\n');

const PROVIDERS = [
  {
    id: 'zai',
    url: 'https://api.z.ai/api/paas/v4/chat/completions',
    key: process.env.ZAI_API_KEY,
    model: process.env.ZAI_MODEL || 'glm-4.7-flash'
  },
  {
    id: 'groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    key: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b'
  }
];

const RATE_LIMIT_PER_MIN = Number(process.env.RATE_LIMIT_PER_MIN || 10);
const DAILY_LIMIT = Number(process.env.DAILY_LIMIT || 400);
const MAX_MESSAGES = 10;
const MAX_CHARS = 500;
const PROVIDER_TIMEOUT_MS = 15000;
const MAX_OUTPUT_TOKENS = 350;

const DEFAULT_ORIGINS = [
  'https://servispilot-web.vercel.app',
  'https://sps.servispilot.com.tr',
  'https://servispilot.com.tr',
  'https://www.servispilot.com.tr',
  'http://localhost:8471',
  'http://localhost:8472',
  'http://localhost:3000'
];

// Bellek içi sayaçlar (serverless örneği başına yaklaşık ölçüm)
const hits = new Map(); // ip -> [timestamp]
const daily = new Map(); // yyyy-mm-dd -> count

function corsHeaders(origin) {
  const allowed = (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(','))
    .split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  const ok = !origin || allowed.indexOf(origin) !== -1;
  return {
    ok: ok,
    headers: {
      'Access-Control-Allow-Origin': ok ? (origin || '*') : '',
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    }
  };
}

function send(res, code, obj, headers) {
  res.statusCode = code;
  for (const k in (headers || {})) res.setHeader(k, headers[k]);
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise(function (resolve) {
    if (req.body) return resolve(req.body);
    let data = '';
    req.on('data', function (c) {
      data += c;
      if (data.length > 1e5) req.destroy();
    });
    req.on('end', function () {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { resolve(null); }
    });
    req.on('error', function () { resolve(null); });
  });
}

function isLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(function (t) { return now - t < 60000; });
  if (arr.length >= RATE_LIMIT_PER_MIN) { hits.set(ip, arr); return true; }
  arr.push(now);
  hits.set(ip, arr);

  const day = new Date().toISOString().slice(0, 10);
  const n = (daily.get(day) || 0) + 1;
  daily.set(day, n);
  return n > DAILY_LIMIT;
}

function validMessages(body) {
  if (!body || !Array.isArray(body.messages)) return null;
  const msgs = body.messages
    .filter(function (m) { return m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'; })
    .slice(-MAX_MESSAGES)
    .map(function (m) { return { role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }; })
    .filter(function (m) { return m.content.length > 0; });
  return msgs.length ? msgs : null;
}

function callProvider(p, messages) {
  const ctrl = new AbortController();
  const timer = setTimeout(function () { ctrl.abort(); }, PROVIDER_TIMEOUT_MS);
  return fetch(p.url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + p.key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: p.model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }].concat(messages),
      temperature: 0.6,
      max_tokens: MAX_OUTPUT_TOKENS
    }),
    signal: ctrl.signal
  }).then(function (r) {
    clearTimeout(timer);
    if (!r.ok) return r.text().then(function (t) { throw new Error(p.id + '_http_' + r.status + ': ' + t.slice(0, 120)); });
    return r.json().then(function (j) {
      const reply = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
      if (!reply) throw new Error(p.id + '_empty');
      return String(reply).trim().slice(0, 1500);
    });
  }).catch(function (err) {
    clearTimeout(timer);
    throw err;
  });
}

module.exports = async function handler(req, res) {
  const origin = req.headers && req.headers.origin;
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') return send(res, 204, {}, cors.headers);
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' }, cors.headers);
  if (!cors.ok) return send(res, 403, { error: 'origin_not_allowed' }, { 'Content-Type': 'application/json' });

  const ip = (req.headers && (req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim())
    || (req.socket && req.socket.remoteAddress) || 'unknown';
  if (isLimited(ip)) return send(res, 429, { error: 'rate_limited' }, cors.headers);

  const body = await readBody(req);
  const messages = validMessages(body);
  if (!messages) return send(res, 400, { error: 'invalid_messages' }, cors.headers);

  // Lokal test anahtarı: sağlayıcıya bağlanmadan uçtan uca UI testi
  if (process.env.AI_MOCK_REPLY) {
    return send(res, 200, { reply: process.env.AI_MOCK_REPLY, provider: 'mock' }, cors.headers);
  }

  const chain = PROVIDERS.filter(function (p) { return !!p.key; });
  if (!chain.length) return send(res, 503, { error: 'no_provider_key' }, cors.headers);

  for (let i = 0; i < chain.length; i++) {
    try {
      const reply = await callProvider(chain[i], messages);
      return send(res, 200, { reply: reply, provider: chain[i].id }, cors.headers);
    } catch (err) {
      console.error('[chat]', err && err.message);
    }
  }
  return send(res, 503, { error: 'ai_unavailable' }, cors.headers);
};

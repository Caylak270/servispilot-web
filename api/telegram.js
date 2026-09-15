// ServisPilot Telegram Ajan — Vercel serverless webhook
// Komutlar: /durum /tara /yaz <konu> /yardim
// Gerekli env (Vercel dashboard'dan): TELEGRAM_BOT_TOKEN, TELEGRAM_ALLOWED_IDS,
// GITHUB_TOKEN, GITHUB_REPO (örn "Caylak270/servispilot-web"),
// GLM_API_KEY, GLM_BASE_URL, GLM_MODEL

const ALLOWED = (process.env.TELEGRAM_ALLOWED_IDS || '').split(',').map(s => s.trim());
const GH = { token: process.env.GITHUB_TOKEN, repo: process.env.GITHUB_REPO };

async function tgSend(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
}

async function dispatch(type, payload) {
  const res = await fetch(`https://api.github.com/repos/${GH.repo}/dispatches`, {
    method: 'POST',
    headers: { 'Authorization': `token ${GH.token}`, 'Accept': 'application/vnd.github+json' },
    body: JSON.stringify({ event_type: type, client_payload: payload })
  });
  return res.status === 204;
}

async function latestReports() {
  const res = await fetch(`https://api.github.com/repos/${GH.repo}/contents/ekip/raporlar`, {
    headers: { 'Authorization': `token ${GH.token}` }
  });
  if (!res.ok) return [];
  const files = await res.json();
  return files.filter(f => f.name.endsWith('.md')).slice(-5).reverse().map(f => f.name);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ServisPilot Telegram Ajan calisiyor.');
  const update = req.body || {};
  const msg = update.message || update.edited_message;
  if (!msg || !msg.text) return res.status(200).end();
  const chatId = String(msg.chat.id);
  const text = msg.text.trim();

  // GUVENLIK: sadece izinli kullanicilar
  if (ALLOWED.length && !ALLOWED.includes(chatId)) {
    await tgSend(chatId, '⛔ Bu bot sadece yetkili kullaniciya yanit verir.');
    return res.status(200).end();
  }

  try {
    if (text.startsWith('/durum')) {
      const reports = await latestReports();
      await tgSend(chatId,
        `📊 <b>ServisPilot Ajan Durumu</b>\n\nSon raporlar:\n${reports.map(r => '• ' + r).join('\n') || 'Henüz rapor yok'}\n\nKomutlar: /tara · /yaz <konu> · /yardim`);
    }
    else if (text.startsWith('/tara')) {
      const ok = await dispatch('seo-scan', { triggered_by: chatId, at: new Date().toISOString() });
      await tgSend(chatId, ok ? '🔍 SEO taramasi baslatildi — bittiginde rapor ekip/raporlar/ altina duser.' : '⚠️ Baslatilamadi (GitHub yetkisi kontrol et).');
    }
    else if (text.startsWith('/yaz')) {
      const topic = text.replace('/yaz', '').trim();
      if (!topic) { await tgSend(chatId, 'Kullanim: /yaz <konu>'); return res.status(200).end(); }
      const ok = await dispatch('content', { topic, triggered_by: chatId, at: new Date().toISOString() });
      await tgSend(chatId, ok ? `✍️ Icerik gorevi kuyruya alindi: "${topic}"\nTaslak hazirlaninca repoda blog-taslaklari/ altinda olacak.` : '⚠️ Baslatilamadi (GitHub yetkisi kontrol et).');
    }
    else {
      await tgSend(chatId,
        `🤖 <b>ServisPilot Ajan</b>\n/durum — son raporlar\n/tara — SEO/rakip taramasi baslat\n/yaz <konu> — blog taslagi uret\n/yardim — bu mesaj`);
    }
  } catch (e) {
    await tgSend(chatId, '⚠️ Hata: ' + String(e).slice(0, 120));
  }
  return res.status(200).end();
}

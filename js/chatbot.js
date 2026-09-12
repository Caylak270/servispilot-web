/* ============================================================
   ServisPilot — Pilot Asistan (ücretsiz site içi chatbot)
   - Tamamen kendi kodumuz: üçüncü taraf script yok, kota yok, ücret yok.
   - SSS tabanlı anahtar kelime motoru; cevaplayamadığında tek yön
     WhatsApp funnel'ı (wa.me) ve randevu takvimi.
   - Ölçüm: chat_open, chat_bot_reply, chat_to_whatsapp (analytics.js)
   - config.js → chat: { enabled, assistantName, showOnMobile }
   ============================================================ */

(function () {
  const cfg = (window.SERVISPILOT_CONFIG || {}).chat || {};
  if (cfg.enabled === false) return;

  const WA_NUMBER = (window.SERVISPILOT_CONFIG && window.SERVISPILOT_CONFIG.whatsappNumber) || '905309929505';
  const NAME = cfg.assistantName || 'Pilot Asistan';
  const DESKTOP_ONLY = cfg.showOnMobile !== true;

  /* ---------------- Bilgi tabanı (SSS + fiyat + funnel) ---------------- */
  const KB = [
    {
      id: 'fiyat',
      kw: ['fiyat', 'ücret', 'ucret', 'paket', 'abonelik', 'kaç para', 'kac para', 'maliyet', 'ne kadar', 'tarife', 'plan', 'aylık', 'aylik', 'yıllık', 'yillik'],
      a: '3 paketimiz var, hepsinde kurulum ücretsiz:<br><b>Yıllık — 1.599 ₺/ay</b> (%33 indirim + 200 QR hediye) ⭐ önerilen<br><b>6 Aylık — 1.899 ₺/ay</b> (%21 indirim + 100 QR hediye)<br><b>Aylık — 2.399 ₺/ay</b><br><br>Hepsinde <b>14 gün ücretsiz deneme</b> var, kredi kartı gerekmez.',
      cta: [
        { label: 'Fiyatları sayfada gör', type: 'scroll', target: 'fiyatlandirma' },
        { label: 'WhatsApp\'tan sor', type: 'whatsapp', msg: 'Merhaba, paket fiyatları hakkında bilgi almak istiyorum.' }
      ]
    },
    {
      id: 'deneme',
      kw: ['deneme', 'ücretsiz', 'ucretsiz', '14 gün', '14 gun', 'trial', 'kredi kartı', 'kredi karti', 'kart bilgisi'],
      a: '<b>14 gün boyunca tüm özellikleri ücretsiz ve sınırsız</b> deneyebilirsiniz. Kredi kartı istemiyoruz — WhatsApp\'tan yazmanız yeterli, kurulumu ekibimiz aynı gün yapar.',
      cta: [
        { label: 'WhatsApp\'tan başla', type: 'whatsapp', msg: 'Merhaba, ServisPilot\'un 14 günlük ücretsiz denemesini başlatmak istiyorum.' }
      ]
    },
    {
      id: 'kurulum',
      kw: ['kurulum', 'entegrasyon', 'nasıl başlar', 'nasil baslar', 'başla', 'basla', 'geçiş', 'gecis', 'hemen kullan', 'aktifleş', 'aktifles'],
      a: 'Kurulumu <b>ekibimiz tamamen ücretsiz yapıyor</b> — ortalama <b>15 dakika</b>. Siz sadece WhatsApp\'tan yazın; hesabınız, verileriniz ve QR sisteminiz hazır şekilde teslim edilir. Bilgisayar bilgisi gerekmez.',
      cta: [
        { label: '15 dk görüşme planla', type: 'calendar' },
        { label: 'WhatsApp\'tan yaz', type: 'whatsapp', msg: 'Merhaba, ServisPilot kurulumu hakkında görüşmek istiyorum.' }
      ]
    },
    {
      id: 'gib',
      kw: ['e-fatura', 'efatura', 'gib', 'fatura', 'e-arşiv', 'earşiv', 'entegratör', 'entegrator', 'e-defter', 'edefter', 'mali', 'vergi'],
      a: 'ServisPilot\'ta <b>GİB E-Arşiv / E-Fatura altyapısı yerleşik</b> gelir. Dışarıdan entegratör yazılımı almaz, ek lisans veya aracı ücreti ödemezsiniz — fatura iş emrinden <b>tek tıkla</b> kesilir.',
      cta: [
        { label: 'Kokpitte canlı izle', type: 'scroll', target: 'canli-kokpit' }
      ]
    },
    {
      id: 'guvenlik',
      kw: ['güven', 'guven', 'güvenlik', 'guvenlik', 'yedekleme', 'yedeklenir', 'yedekleniyor', 'veri kaybı', 'veri kaybi', 'sunucu', 'ssl', 'iso', 'verilerim', 'veri güvende', 'silinir mi', 'çalınırsa', 'calinirsa'],
      a: 'Tüm verileriniz <b>ISO 27001 ve KVKK uyumlu, Türkiye merkezli sunucularda</b> 256-bit SSL şifreleme ile barındırılır. Günlük otomatik çift yedekleme sayesinde hiçbir bilginiz kaybolmaz.',
      cta: [
        { label: 'Gizlilik politikası', type: 'link', href: 'gizlilik.html' }
      ]
    },
    {
      id: 'aktarim',
      kw: ['aktar', 'aktarım', 'aktarim', 'excel', 'csv', 'mevcut kayıt', 'eski kayıt', 'taşı', 'tası', 'carı', 'cari', 'stok aktar', 'parçalar', 'stoklar', 'parça aktar'],
      a: 'Evet. Excel/CSV formatındaki <b>müşteri listeniz, cari bakiyeleriniz ve parça stoklarınızı teknik ekibimiz ~15 dakikada eksiksiz aktarır</b>. Hiçbir veri kaybı yaşamazsınız.',
      cta: [
        { label: 'WhatsApp\'tan sor', type: 'whatsapp', msg: 'Merhaba, mevcut kayıtlarımı ServisPilot\'a aktarmak istiyorum.' }
      ]
    },
    {
      id: 'usta',
      kw: ['usta', 'kullanabilir mi', 'kolay mı', 'kolay mi', 'bilgisayar', 'yaşlı', 'yasli', 'eğitim', 'egitim', 'öğren', 'ogren', 'kullanım', 'kullanim'],
      a: 'ServisPilot, bilgisayar kullanmayı bilmeyen ustalar için tasarlandı. <b>"Usta Kokpiti" modunda sadece 4 büyük ve net buton</b> vardır; okuma-yazma ve temel telefon kullanımı yeterlidir.',
      cta: [
        { label: 'Usta Kokpiti\'ni izle', type: 'scroll', target: 'canli-kokpit' }
      ]
    },
    {
      id: 'whatsapp-onay',
      kw: ['whatsapp onay', 'müşteri onayı', 'musteri onay', 'onay portal', 'müşteriye sor', 'onay nasıl'],
      a: 'İş emri açılınca müşteriye <b>WhatsApp\'tan otomatik onay mesajı</b> gider: öncesi/sonrası fotoğraflar, parça listesi ve tutar tek ekranda. Müşteri onaylayınca iş emri otomatik ilerler, GİB onaylı fatura kesilir.',
      cta: [
        { label: 'Canlı kokpitte gör', type: 'scroll', target: 'canli-kokpit' }
      ]
    },
    {
      id: 'qr',
      kw: ['qr', 'parça', 'parca', 'stok', 'parça takip', 'kayıp', 'kayip', 'depo'],
      a: '<b>QR parça takibi</b> ile her parça okutularak iş emrine işlenir; stoklar anlık düşer, kayıp ve unutulan parçalar sıfırlanır. Yıllık pakette <b>+200 QR hediye</b> var.',
      cta: [
        { label: 'Fiyatları gör', type: 'scroll', target: 'fiyatlandirma' }
      ]
    },
    {
      id: 'ocr',
      kw: ['ocr', 'ruhsat', 'plaka', 'araç kabul', 'arac kabul', 'iş emri', 'is emri', 'kabul'],
      a: 'Araç kabulde ruhsatı okutursunuz — <b>Ruhsat OCR</b> plakayı, şasi ve sahibi bilgilerini saniyeler içinde iş emrine doldurur. Elle yazım hatası ve uzun bekleyiş kalmaz.',
      cta: [
        { label: 'Kokpitte canlı izle', type: 'scroll', target: 'canli-kokpit' }
      ]
    },
    {
      id: 'iptal',
      kw: ['iptal', 'sözleşme', 'sozlesme', 'taahhüt', 'taahhut', 'ceza', 'bırakır', 'birakir', 'kapatır', 'kapater'],
      a: '<b>Taahhüt ve iptal cezası yok.</b> 14 günlük deneme boyunca da, sonrasında da istediğiniz an bırakabilirsiniz.',
      cta: []
    },
    {
      id: 'gorusme',
      kw: ['görüş', 'gorus', 'konuş', 'konus', 'randevu', 'takvim', 'insan', 'temsilci', 'seninle', 'birileri', 'arama', 'arayın', 'arayin'],
      a: 'Tabii! Ekibimizle <b>15 dakikalık ücretsiz kurulum görüşmesi</b> planlayabilirsiniz — takvimden size uygun saati seçin, ya da WhatsApp\'tan direkt yazın.',
      cta: [
        { label: 'Görüşme planla', type: 'calendar' },
        { label: 'WhatsApp\'tan yaz', type: 'whatsapp', msg: 'Merhaba, ServisPilot hakkında görüşmek istiyorum.' }
      ]
    },
    {
      id: 'iletisim',
      kw: ['iletişim', 'iletisim', 'telefon', 'e-posta', 'eposta', 'ulaş', 'ulas', 'adres'],
      a: '📞 WhatsApp / Telefon: <b>0530 992 95 05</b><br>✉️ E-posta: <b>info@servispilot.com.tr</b><br><br>Çalışma saatleri dışında da WhatsApp\'tan yazabilirsiniz.',
      cta: [
        { label: 'WhatsApp\'tan yaz', type: 'whatsapp', msg: 'Merhaba, ServisPilot hakkında bilgi almak istiyorum.' }
      ]
    },
    {
      id: 'odeme',
      kw: ['ödeme', 'odeme', 'havale', 'kredi kartıyla', 'kredi kartiyla', 'taksit', 'nasıl öderim', 'nasil oderim'],
      a: 'Deneme süresince <b>hiçbir ödeme alınmaz, kart bilgisi istenmez</b>. Deneme sonunda beğenirseniz WhatsApp\'tan paketinizi söylersiniz; ödeme bilgileri ekibimizle paylaşılır.',
      cta: [
        { label: 'Fiyatları gör', type: 'scroll', target: 'fiyatlandirma' }
      ]
    }
  ];

  const CHIPS = [
    'Fiyatlar', '14 gün ücretsiz', 'Kurulum nasıl oluyor?', 'GİB E-Fatura', 'Verilerim güvende mi?', 'İnsanla görüş'
  ];

  const FALLBACK = 'Bunu tam anlayamadım 🤔 Bu soruyu ekibimize <b>WhatsApp\'tan</b> sorabilirsiniz — genelde dakikalar içinde dönüyorlar.';

  /* ---------------- Yardımcılar ---------------- */
  function trLower(s) {
    return (s || '')
      .replace(/İ/g, 'i').replace(/I/g, 'ı').replace(/Ğ/g, 'ğ').replace(/Ü/g, 'ü')
      .replace(/Ş/g, 'ş').replace(/Ö/g, 'ö').replace(/Ç/g, 'ç')
      .toLowerCase();
  }
  function waLink(msg) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  function scoreEntry(text, entry) {
    let score = 0;
    entry.kw.forEach(function (k) {
      if (text.indexOf(k) !== -1) score += k.length; // uzun anahtar = daha spesifik
    });
    return score;
  }

  function findAnswer(text) {
    const norm = trLower(text);
    let best = null, bestScore = 0;
    KB.forEach(function (e) {
      const s = scoreEntry(norm, e);
      if (s > bestScore) { bestScore = s; best = e; }
    });
    return bestScore >= 4 ? best : null;
  }

  /* ---------------- UI ---------------- */
  const CSS = '' +
    '.spchat-root{position:fixed;z-index:50;right:22px;bottom:22px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;}' +
    '@media (max-width:1023px){.spchat-root.spchat-desktop-only{display:none!important}}' +
    '.spchat-bubble{width:60px;height:60px;border-radius:9999px;background:linear-gradient(135deg,#f59e0b,#f66018);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px -4px rgba(245,158,11,.55);transition:transform .2s,brightness .2s;position:relative;}' +
    '.spchat-bubble:hover{transform:scale(1.07);}' +
    '.spchat-bubble svg{width:28px;height:28px;fill:#0B0F17;}' +
    '.spchat-dot{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:9999px;background:#ef4444;border:2.5px solid #0B0F17;display:none;}' +
    '.spchat-teaser{position:absolute;bottom:72px;right:0;width:230px;background:#1E293B;color:#dfe2ee;border:1px solid rgba(245,158,11,.35);border-radius:14px 14px 2px 14px;padding:11px 14px;font-size:13px;line-height:1.45;box-shadow:0 12px 32px rgba(0,0,0,.5);cursor:pointer;display:none;animation:spchatIn .3s ease-out;}' +
    '.spchat-teaser strong{color:#f59e0b;}' +
    '.spchat-panel{position:absolute;bottom:76px;right:0;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:min(70vh,560px);background:#111827;border:1px solid #2a3040;border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.6);display:none;flex-direction:column;overflow:hidden;animation:spchatIn .25s ease-out;}' +
    '@keyframes spchatIn{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}' +
    '.spchat-head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:linear-gradient(135deg,#1a2233,#151b28);border-bottom:1px solid #2a3040;}' +
    '.spchat-avatar{width:38px;height:38px;border-radius:9999px;background:linear-gradient(135deg,#f59e0b,#f66018);display:flex;align-items:center;justify-content:center;font-weight:800;color:#0B0F17;font-size:15px;flex-shrink:0;}' +
    '.spchat-head-name{color:#dfe2ee;font-weight:700;font-size:14px;}' +
    '.spchat-head-status{color:#64748B;font-size:11.5px;display:flex;align-items:center;gap:5px;}' +
    '.spchat-head-status::before{content:"";width:7px;height:7px;border-radius:9999px;background:#22c55e;display:inline-block;}' +
    '.spchat-close{margin-left:auto;background:none;border:none;color:#64748B;cursor:pointer;font-size:20px;line-height:1;padding:4px;border-radius:8px;}' +
    '.spchat-close:hover{color:#dfe2ee;background:#1E293B;}' +
    '.spchat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;}' +
    '.spchat-msg{max-width:86%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.55;animation:spchatIn .25s ease-out;}' +
    '.spchat-msg.bot{background:#1E293B;color:#dfe2ee;border-bottom-left-radius:4px;align-self:flex-start;}' +
    '.spchat-msg.user{background:linear-gradient(135deg,#f59e0b,#e78a0b);color:#0B0F17;font-weight:600;border-bottom-right-radius:4px;align-self:flex-end;}' +
    '.spchat-msg a{color:#f59e0b;}' +
    '.spchat-ctas{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}' +
    '.spchat-cta{font-size:12px;font-weight:700;padding:7px 11px;border-radius:9px;cursor:pointer;border:1px solid rgba(245,158,11,.45);background:rgba(245,158,11,.12);color:#ffc174;text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:background .15s;}' +
    '.spchat-cta:hover{background:rgba(245,158,11,.25);}' +
    '.spchat-cta.green{border-color:rgba(34,197,94,.45);background:rgba(34,197,94,.12);color:#7ee2a8;}' +
    '.spchat-cta.green:hover{background:rgba(34,197,94,.25);}' +
    '.spchat-chips{display:flex;gap:6px;padding:0 16px 10px;flex-wrap:wrap;}' +
    '.spchat-chip{font-size:11.5px;font-weight:600;padding:6px 11px;border-radius:9999px;border:1px solid #2a3040;background:#151b28;color:#94A3B8;cursor:pointer;transition:all .15s;}' +
    '.spchat-chip:hover{border-color:#f59e0b;color:#ffc174;}' +
    '.spchat-inputrow{display:flex;gap:8px;padding:12px 14px;border-top:1px solid #2a3040;background:#151b28;}' +
    '.spchat-input{flex:1;background:#111827;border:1px solid #2a3040;border-radius:11px;padding:10px 13px;color:#dfe2ee;font-size:13px;outline:none;font-family:inherit;}' +
    '.spchat-input:focus{border-color:#f59e0b;}' +
    '.spchat-input::placeholder{color:#475569;}' +
    '.spchat-send{width:42px;border:none;border-radius:11px;background:linear-gradient(135deg,#f59e0b,#f66018);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}' +
    '.spchat-send svg{width:18px;height:18px;fill:#0B0F17;}' +
    '.spchat-kvkk{padding:7px 14px 11px;background:#151b28;color:#475569;font-size:10.5px;text-align:center;}' +
    '.spchat-kvkk a{color:#64748B;text-decoration:underline;}' +
    '.spchat-typing span{display:inline-block;width:6px;height:6px;margin-right:3px;border-radius:9999px;background:#64748B;animation:spchatBounce 1s infinite;}' +
    '.spchat-typing span:nth-child(2){animation-delay:.15s}' +
    '.spchat-typing span:nth-child(3){animation-delay:.3s}' +
    '@keyframes spchatBounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}';

  let opened = false, teaserShown = false, teaserTimer = null;

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function scrollBottom() {
    const m = root.querySelector('.spchat-msgs');
    m.scrollTop = m.scrollHeight;
  }

  function addMsg(html, who) {
    const m = el('div', 'spchat-msg ' + who, html);
    root.querySelector('.spchat-msgs').appendChild(m);
    scrollBottom();
    return m;
  }

  function addCtas(container, ctas) {
    if (!ctas || !ctas.length) return;
    const wrap = el('div', 'spchat-ctas');
    ctas.forEach(function (c) {
      let a;
      if (c.type === 'whatsapp') {
        a = el('a', 'spchat-cta green', '💬 ' + c.label);
        a.href = waLink(c.msg || 'Merhaba, ServisPilot hakkında bilgi almak istiyorum.');
        a.target = '_blank'; a.rel = 'noopener';
        a.addEventListener('click', function () { window.track('chat_to_whatsapp', { location: 'chatbot', label: c.label }); });
      } else if (c.type === 'calendar') {
        a = el('button', 'spchat-cta', '📅 ' + c.label);
        a.addEventListener('click', function () {
          window.track('calendar_open', { location: 'chatbot' });
          closePanel();
          if (typeof window.openCalendarModal === 'function') window.openCalendarModal('chatbot');
        });
      } else if (c.type === 'scroll') {
        a = el('button', 'spchat-cta', '→ ' + c.label);
        a.addEventListener('click', function () {
          closePanel();
          const t = document.getElementById(c.target);
          if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
      } else if (c.type === 'link') {
        a = el('a', 'spchat-cta', '→ ' + c.label);
        a.href = c.href;
      }
      wrap.appendChild(a);
    });
    container.appendChild(wrap);
  }

  function botReply(html, ctas) {
    const t = addMsg('<span class="spchat-typing"><span></span><span></span><span></span></span>', 'bot');
    setTimeout(function () {
      t.innerHTML = html;
      addCtas(t, ctas);
      scrollBottom();
      window.track('chat_bot_reply', { label: t.textContent.trim().slice(0, 60) });
    }, 500 + Math.random() * 500);
  }

  function handleUserText(text) {
    addMsg(text.replace(/</g, '&lt;'), 'user');
    const entry = findAnswer(text);
    if (entry) botReply(entry.a, entry.cta);
    else botReply(FALLBACK, [
      { label: 'WhatsApp\'tan sor', type: 'whatsapp', msg: 'Merhaba, şunu sormak istiyorum: ' + text },
      { label: 'Görüşme planla', type: 'calendar' }
    ]);
  }

  function openPanel() {
    root.querySelector('.spchat-panel').style.display = 'flex';
    root.querySelector('.spchat-bubble').style.display = 'none';
    root.querySelector('.spchat-teaser').style.display = 'none';
    if (!opened) {
      opened = true;
      window.track('chat_open', { location: 'bubble' });
      botReply('Merhaba 👋 Ben <b>' + NAME + '</b>. ServisPilot hakkında merak ettiğinizi yazın ya da aşağıdaki konulardan birini seçin.');
      setTimeout(scrollBottom, 600);
    }
    root.querySelector('.spchat-input').focus();
  }

  function closePanel() {
    root.querySelector('.spchat-panel').style.display = 'none';
    root.querySelector('.spchat-bubble').style.display = 'flex';
  }

  /* ---------------- Kurulum ---------------- */
  const root = el('div', 'spchat-root' + (DESKTOP_ONLY ? ' spchat-desktop-only' : ''));
  root.innerHTML =
    '<button class="spchat-bubble" aria-label="Pilot Asistan\'ı aç">' +
      '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>' +
      '<span class="spchat-dot"></span>' +
    '</button>' +
    '<div class="spchat-teaser"><strong>' + NAME + ':</strong> Fiyatları mı merak ediyorsunuz? 👋 Sorun, hemen cevap veriyorum.</div>' +
    '<div class="spchat-panel" role="dialog" aria-label="Pilot Asistan sohbet">' +
      '<div class="spchat-head">' +
        '<div class="spchat-avatar">' + NAME.charAt(0) + '</div>' +
        '<div><div class="spchat-head-name">' + NAME + '</div><div class="spchat-head-status">Çevrimiçi — genelde anında yanıtlar</div></div>' +
        '<button class="spchat-close" aria-label="Kapat">×</button>' +
      '</div>' +
      '<div class="spchat-msgs"></div>' +
      '<div class="spchat-chips">' + CHIPS.map(function (c) { return '<button class="spchat-chip">' + c + '</button>'; }).join('') + '</div>' +
      '<div class="spchat-inputrow">' +
        '<input class="spchat-input" type="text" placeholder="Sorunuzu yazın…" maxlength="200">' +
        '<button class="spchat-send" aria-label="Gönder"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>' +
      '</div>' +
      '<div class="spchat-kvkk">Sohbet verileriniz KVKK kapsamında işlenir. <a href="gizlilik.html">Gizlilik Politikası</a></div>' +
    '</div>';
  document.body.appendChild(root);

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  root.querySelector('.spchat-bubble').addEventListener('click', openPanel);
  root.querySelector('.spchat-close').addEventListener('click', closePanel);
  root.querySelector('.spchat-teaser').addEventListener('click', openPanel);

  const input = root.querySelector('.spchat-input');
  function submit() {
    const v = input.value.trim();
    if (!v) return;
    input.value = '';
    handleUserText(v);
  }
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
  root.querySelector('.spchat-send').addEventListener('click', submit);

  Array.prototype.forEach.call(root.querySelectorAll('.spchat-chip'), function (chip) {
    chip.addEventListener('click', function () { handleUserText(chip.textContent); });
  });

  // Teaser: kullanıcı 9 sn içinde açmazsa nazik bir davet göster (tek seferlik)
  teaserTimer = setTimeout(function () {
    if (opened || teaserShown) return;
    teaserShown = true;
    root.querySelector('.spchat-teaser').style.display = 'block';
    root.querySelector('.spchat-dot').style.display = 'block';
    window.track('chat_teaser_show', {});
  }, 9000);
})();

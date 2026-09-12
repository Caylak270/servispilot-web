/* ============================================================
   ServisPilot — Olay Ölçüm Altyapısı
   - GA4 ve Microsoft Clarity, config.js'e ID girilince otomatik yüklenir.
   - window.track(event, params) dataLayer'a yazar; GA4 varsa gtag'e gider.
   - data-track / data-location öznitelikli tüm öğelerde tıklama olayı
     otomatik yakalanır (ör: whatsapp_click, calendar_open).
   ============================================================ */

(function () {
  const cfg = (window.SERVISPILOT_CONFIG || {}).analytics || {};

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (cfg.ga4Id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4Id;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', cfg.ga4Id);
  }

  if (cfg.clarityId) {
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.clarity.ms/tag/' + cfg.clarityId;
    document.head.appendChild(s);
  }

  window.track = function (event, params) {
    window.dataLayer.push(Object.assign({ event: event }, params || {}));
    if (window.location.protocol === 'file:') {
      console.log('[track]', event, params || {});
    }
  };

  // data-track işaretli tüm öğelerde otomatik tıklama ölçümü
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    track(el.getAttribute('data-track'), {
      location: el.getAttribute('data-location') || null,
      label: (el.innerText || '').trim().slice(0, 60)
    });
  });
})();

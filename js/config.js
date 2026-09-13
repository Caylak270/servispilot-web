/* ============================================================
   ServisPilot — Site Yapılandırması
   Boş bırakılan alanlar ilgili özelliği devre dışı bırakır;
   doldurulunca ek kod değişikliği gerekmez.
   ============================================================ */

window.SERVISPILOT_CONFIG = {
  // Satış WhatsApp hattı (boşluksuz uluslararası format)
  whatsappNumber: '905309929505',

  // Randevu takvimi: Cal.com etkinlik bağlantınız (API anahtarı gerektirmez).
  // Değiştirmek için: cal.com panosunda yeni etkinlik açın → linkini buraya yapıştırın.
  calendar: {
    url: 'https://cal.com/servispilot.com.tr/30min'
  },

  // Uygulama / giriş
  // dashboardUrl: gerçek girişten sonraki yönlendirme adresi.
  // loginEndpoint: kimlik doğrulama uç noktası (ör: '/api/login'). BOŞSA giriş
  //   sayfası "sistem yakında aktif" ekranı + WhatsApp fallback gösterir — sahte giriş yapmaz.
  app: {
    dashboardUrl: 'https://servispilot.com.tr/dashboard',
    loginEndpoint: '',
    loginWhatsAppFallback: 'Merhaba, ServisPilot giriş bilgilerim için yazıyorum.'
  },

  // Ölçüm: ID'leri girince ilgili script otomatik yüklenir.
  analytics: {
    ga4Id: '',      // ör: 'G-XXXXXXXXXX'
    clarityId: ''   // ör: 'xxxxxxxxxx' (Microsoft Clarity proje ID)
  },

  // Pilot Asistan — site içi chatbot (js/chatbot.js). Ücretsizdir, üçüncü
  // taraf hesap gerektirmez. enabled: false → balon tamamen kalkar.
  // showOnMobile: true → mobilde sticky bar üzerinde de gösterilir.
  // ai: gerçek AI sohbeti — Vercel'de /api/chat fonksiyonu üzerinden çalışır
  // (anahtarlar Vercel env'inde: ZAI_API_KEY, GROQ_API_KEY).
  // endpoint boş veya ai.enabled=false → eski anahtar kelime motoruna döner.
  chat: {
    enabled: true,
    assistantName: 'Pilot Asistan',
    showOnMobile: false,
    ai: {
      enabled: true,
      endpoint: '/api/chat'
    }
  }
};

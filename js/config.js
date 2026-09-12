/* ============================================================
   ServisPilot — Site Yapılandırması
   Boş bırakılan alanlar ilgili özelliği devre dışı bırakır;
   doldurulunca ek kod değişikliği gerekmez.
   ============================================================ */

window.SERVISPILOT_CONFIG = {
  // Satış WhatsApp hattı (boşluksuz uluslararası format)
  whatsappNumber: '905309929505',

  // Randevu takvimi: Calendly / Cal.com etkinlik bağlantınızı buraya yapıştırın.
  // Örnek: 'https://calendly.com/servispilot/15dk'
  // Boşsa takvim penceresi WhatsApp'a yönlendiren bir yedek ekran gösterir.
  calendar: {
    url: ''
  },

  // Ölçüm: ID'leri girince ilgili script otomatik yüklenir.
  analytics: {
    ga4Id: '',      // ör: 'G-XXXXXXXXXX'
    clarityId: ''   // ör: 'xxxxxxxxxx' (Microsoft Clarity proje ID)
  },

  // Pilot Asistan — site içi chatbot (js/chatbot.js). Ücretsizdir, üçüncü
  // taraf hesap gerektirmez. enabled: false → balon tamamen kalkar.
  // showOnMobile: true → mobilde sticky bar üzerinde de gösterilir.
  chat: {
    enabled: true,
    assistantName: 'Pilot Asistan',
    showOnMobile: false
  }
};

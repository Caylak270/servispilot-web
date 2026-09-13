/* ============================================================
   ServisPilot — İstemci Etkileşim Mantığı
   ============================================================ */

// Cockpit ekran geçişi (Kokpit 2.0'da butonlar kaldırıldı — güvenli sürüm)
function switchCockpitTab(tabKey) {
  const tabs = ['ocr', 'usta', 'stok', 'fatura'];
  tabs.forEach(key => {
    const panel = document.getElementById('view-' + key);
    if (panel) panel.classList.toggle('hidden', key !== tabKey);
  });
}

// Simülatör: plaka / OCR verileri
const plates = [
  { plate: '34 SP 911', model: '2024 BMW 3.20i M Sport', chassis: 'WBA33AY08FS****', client: 'Burak Karadağ' },
  { plate: '06 PILOT 77', model: '2023 Mercedes-Benz C200 AMG', chassis: 'WDD2050771F****', client: 'Ahmet Yılmaz' },
  { plate: '35 AUT 404', model: '2022 Audi A6 40 TDI Quattro', chassis: 'WAUZZZF28N1****', client: 'Selin Deniz' }
];
let plateIndex = 0;

function triggerSimAction(type) {
  const fb = document.getElementById('sim-feedback-msg');
  if (type === 'ocr') {
    const badge = document.getElementById('ocr-status-badge');
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span> Taranıyor...';
    setTimeout(() => {
      badge.innerHTML = '<span class="material-symbols-outlined text-xs text-green-400">check</span> Ruhsat Başarıyla Okundu';
      fb.innerText = 'Ruhsat kamerası 0.4 sn içinde aktarıldı ✓';
      fb.classList.remove('opacity-0');
      setTimeout(() => fb.classList.add('opacity-0'), 3000);
    }, 600);
  } else if (type === 'changePlate') {
    plateIndex = (plateIndex + 1) % plates.length;
    const data = plates[plateIndex];
    document.getElementById('plate-display').innerText = data.plate;
    document.getElementById('sim-model').innerText = data.model;
    document.getElementById('sim-chassis').innerText = data.chassis;
    document.getElementById('sim-customer').innerText = data.client;
    fb.innerText = 'Yeni plaka verisi simüle edildi ✓';
    fb.classList.remove('opacity-0');
    setTimeout(() => fb.classList.add('opacity-0'), 2500);
  }
}

// Usta kokpiti eylem kaydı
function logMechanicAction(name) {
  const log = document.getElementById('usta-log-text');
  log.innerText = 'Usta komutu kaydedildi: ' + name + ' (Kayıt Saati: ' + new Date().toLocaleTimeString('tr-TR') + ')';
}

// QR stok düşümü (elle / devralma modu)
function simulateStockDeduction() {
  const list = document.getElementById('parca-listesi');
  if (!list) return;
  list.insertAdjacentHTML('beforeend',
    '<div class="wa-row flex justify-between p-2 rounded bg-surface-container-high"><span class="text-text-primary">Ön Fren Balatası</span><span class="text-primary font-bold">2.450 ₺</span></div>');
  const toplam = document.getElementById('parca-toplam');
  if (toplam) toplam.innerText = '7.690 ₺';
  const sayi = document.getElementById('parca-sayi');
  if (sayi) sayi.innerText = list.children.length + ' Kalem';
  const adet = document.getElementById('stok-adet');
  if (adet) {
    const m = adet.innerText.match(/\d+/);
    if (m) adet.innerText = 'Kalan Stok: ' + Math.max(0, parseInt(m[0], 10) - 1) + ' Adet';
  }
  const fb = document.getElementById('sim-feedback-msg');
  if (fb) {
    fb.innerText = 'Stok düşümü uygulandı ✓';
    fb.classList.remove('opacity-0');
    setTimeout(() => fb.classList.add('opacity-0'), 2500);
  }
}

// WhatsApp gönderim simülasyonu
function sendSimWhatsApp() {
  const btn = document.getElementById('wa-btn');
  btn.innerText = 'WhatsApp İletildi ✓ (Müşteri Onayı Bekleniyor)';
  btn.classList.remove('bg-green-600');
  btn.classList.add('bg-green-700');
}

// GİB e-fatura kesme simülasyonu
function issueSimInvoice() {
  const status = document.getElementById('gib-durum');
  const btn = document.getElementById('gib-btn');
  status.innerText = 'GİB Onayladı (E-Arşiv Kesildi)';
  status.className = 'text-green-400 font-bold';
  btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> GİB E-Fatura Kesildi';
}

// Fiyatlandırma: 3 statik paket kartı (Aylık / 6 Aylık / Yıllık) —
// dönem seçici ve JS mantığı kaldırıldı, CTA'lar HTML içinde sabit WhatsApp linkleri (bkz. rapor 12).

// SSS akordiyonu
function toggleFaq(id) {
  const body = document.getElementById(id);
  const icon = document.getElementById(id + '-icon');
  if (!body) return;
  const open = body.classList.toggle('open');
  if (icon) icon.innerText = open ? 'expand_less' : 'expand_more';
}

// ============================================================
// Randevu takvimi modalı
// ============================================================

function calendarUrl() {
  const cfg = window.SERVISPILOT_CONFIG || {};
  return (cfg.calendar && cfg.calendar.url) || '';
}

function openCalendarModal(location) {
  if (window.track) track('calendar_open', { location: location || 'bilinmiyor' });
  const modal = document.getElementById('calendar-modal');
  const body = document.getElementById('calendar-modal-body');
  if (!modal || !body) return;
  if (!body.dataset.loaded) {
    const url = calendarUrl();
    if (url) {
      body.innerHTML = '<iframe src="' + url + '" style="width:100%;height:600px;border:0" loading="lazy" title="Randevu Takvimi"></iframe>';
    } else {
      // Takvim bağlantısı henüz girilmediyse WhatsApp yedeği
      body.innerHTML = '<div class="h-[420px] flex flex-col items-center justify-center text-center gap-4 p-8">' +
        '<span class="material-symbols-outlined text-5xl text-primary">event_available</span>' +
        '<p class="font-label-md text-label-md text-text-primary font-semibold">Randevu takvimimiz çok yakında burada!</p>' +
        '<p class="font-body-sm text-body-sm text-text-secondary max-w-sm">Şimdiden WhatsApp\u0027tan yazın; size en uygun görüşme saatini önerelim.</p>' +
        '<a class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-label-md text-label-md font-bold transition-all" href="https://wa.me/905309929505?text=Merhaba%2C%20g%C3%B6r%C3%BC%C5%9Fme%20randevusu%20almak%20istiyorum." target="_blank" rel="noopener" data-track="whatsapp_click" data-location="modal-fallback">' +
        '<span class="material-symbols-outlined text-base">chat</span><span>WhatsApp\u0027tan Yazın</span></a></div>';
    }
    body.dataset.loaded = '1';
  }
  modal.classList.remove('hidden', 'closing');
  modal.classList.add('flex');
  void modal.offsetWidth; // gecisi garantiye al (reflow)
  modal.classList.add('open');
}

function closeCalendarModal() {
  const modal = document.getElementById('calendar-modal');
  if (!modal || modal.classList.contains('closing')) return;
  modal.classList.remove('open');
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex', 'closing');
  }, 260);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCalendarModal();
});

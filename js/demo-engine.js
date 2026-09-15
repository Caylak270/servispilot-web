/* ============================================================
   ServisPilot — Kokpit 2.0 Senaryo Motoru
   Modern tasarım (stoaix/chatflow dili): minimal hap çipler,
   mini ilerleme noktaları, toast bildirimleri.
   Senaryolar: kabul → usta → stok → fatura
   Beklemeler duvar saatine göre; sekme arka planda donmaz.
   ============================================================ */

const DemoEngine = (function () {
  const SCENARIOS = ['kabul', 'usta', 'stok', 'fatura'];

  const CHIP_ON = 'scenario-chip px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all bg-primary-container text-[#472A00] shadow';
  const CHIP_OFF = 'scenario-chip px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all bg-white text-[#5B6B7C] border border-[#E7E2D6] hover:text-[#16202E] hover:border-[#E8930C]/50';

  let gen = 0;               // iptal/jenerasyon sayacı
  let mode = 'auto';         // 'auto' | 'single'
  let paused = false;        // "Kendin Dene"
  let idx = 0;               // oynayan senaryo indeksi

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Duvar-saati tabanlı, duraklatılabilir bekleme
  async function wait(g, ms) {
    let end = Date.now() + ms;
    while (Date.now() < end) {
      if (g !== gen) throw 'cancelled';
      if (paused) {
        end = Date.now() + ms;
        await sleep(150);
      } else {
        await sleep(120);
      }
    }
    if (g !== gen) throw 'cancelled';
  }

  // ---------- DOM yardımcıları ----------
  const $ = (id) => document.getElementById(id);

  function showScreen(key) {
    ['ocr', 'usta', 'stok', 'fatura'].forEach((k) => {
      const p = $('view-' + k);
      if (p) p.classList.toggle('hidden', k !== key);
    });
  }

  function setStep(n, state) {
    const el = document.querySelector('#demo-timeline [data-step="' + n + '"]');
    if (!el) return;
    const dot = el.querySelector('.tl-dot');
    if (dot) dot.className = 'tl-dot w-1.5 h-1.5 rounded-full transition-colors ' + (
      state === 'done' ? 'bg-green-400' :
      state === 'active' ? 'bg-primary animate-pulse' :
      'bg-surface-container-highest');
    el.querySelectorAll('.tl-text').forEach((t) => {
      t.classList.toggle('text-text-muted', state === 'idle');
      t.classList.toggle('text-primary', state === 'active');
      t.classList.toggle('text-text-primary', state === 'done');
    });
  }

  function timelineFor(i) {
    SCENARIOS.forEach((_, n) => setStep(n + 1, n < i ? 'done' : n === i ? 'active' : 'idle'));
  }

  function currentChip() {
    return mode === 'auto' ? 'auto' : SCENARIOS[idx];
  }

  function markChip() {
    document.querySelectorAll('#scenario-chips .scenario-chip').forEach((c) => {
      c.className = (c.dataset.scenario === currentChip()) ? CHIP_ON : CHIP_OFF;
    });
  }

  function log(text) {
    const el = $('usta-log-text');
    if (el) el.innerText = text;
  }

  // Toast bildirimi (sağ üstte belirip kaybolur)
  let toastTimer = null;
  function showToast(text, ms) {
    const t = $('demo-toast');
    if (!t) return;
    t.innerText = text;
    t.classList.remove('opacity-0', 'translate-y-1');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.add('opacity-0', 'translate-y-1'), ms || 3200);
  }

  async function typeInto(g, id, text, speed) {
    const el = $(id);
    if (!el) return;
    el.textContent = '';
    for (const ch of text) {
      if (g !== gen) throw 'cancelled';
      el.textContent += ch;
      await wait(g, speed || 34);
    }
  }

  function flashBtn(n, ms) {
    const b = document.querySelector('[data-usta-btn="' + n + '"]');
    if (!b) return;
    b.classList.add('ring-2', 'ring-primary/60', 'scale-[.98]');
    setTimeout(() => b.classList.remove('ring-2', 'ring-primary/60', 'scale-[.98]'), ms || 900);
  }

  function partRowHTML(name, price) {
    return '<div class="wa-row flex justify-between p-2 rounded bg-surface-container-high/70"><span class="text-text-primary">' + name + '</span><span class="text-primary font-bold">' + price + '</span></div>';
  }

  function chatHTML(side, html, time) {
    const out = side === 'out';
    return '<div class="wa-row flex ' + (out ? 'justify-end' : 'justify-start') + '"><div class="max-w-[85%] ' +
      (out ? 'bg-[#005C4B] rounded-br-sm' : 'bg-[#202C33] rounded-bl-sm') +
      ' rounded-2xl px-3 py-2 text-[11px] text-white leading-relaxed shadow">' + html +
      '<div class="text-right text-[9px] text-white/50 mt-1">' + time + '</div></div></div>';
  }

  function addChat(g, html) {
    if (g !== gen) throw 'cancelled';
    const box = $('wa-chat');
    if (!box) return;
    box.insertAdjacentHTML('beforeend', html);
    box.scrollTop = box.scrollHeight;
  }

  // ---------- Sahneler ----------
  async function sahneKabul(g) {
    showScreen('ocr'); setStep(1, 'active');
    ['plate-display', 'sim-chassis', 'sim-model', 'sim-customer'].forEach((id) => { const e = $(id); if (e) e.innerHTML = '&nbsp;'; });
    const ok = $('sim-chassis-ok'); if (ok) ok.classList.add('opacity-0');
    const yakit = $('sim-yakit'); if (yakit) yakit.textContent = '';
    document.querySelectorAll('#hasar-grid [data-tile]').forEach((t) => t.classList.add('opacity-40'));
    const badge = $('ocr-status-badge');
    badge.className = 'px-2.5 py-1 rounded-full bg-surface-container/70 border border-surface-container-high/60 text-text-muted font-label-sm text-xs flex items-center gap-1.5';
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>Ruhsat taranıyor…';

    await wait(g, 700);
    await typeInto(g, 'plate-display', '34 SP 911', 70);
    badge.className = 'px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 font-label-sm text-xs flex items-center gap-1.5';
    badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>Ruhsat okundu ✓ %99.8 güven';
    showToast('Ruhsat OCR tamamlandı — 4 saniye');
    await wait(g, 350);
    await typeInto(g, 'sim-chassis', 'WBA33AY08FS****', 26);
    if (ok) ok.classList.remove('opacity-0');
    await typeInto(g, 'sim-model', '2024 BMW 3.20i M Sport', 22);
    if (yakit) yakit.textContent = 'Benzin · Otomatik';
    await typeInto(g, 'sim-customer', 'Burak Karadağ', 26);
    for (const t of document.querySelectorAll('#hasar-grid [data-tile]')) {
      if (g !== gen) throw 'cancelled';
      t.classList.remove('opacity-40');
      await wait(g, 320);
    }
    setStep(1, 'done');
  }

  async function sahneUsta(g) {
    showScreen('usta'); setStep(2, 'active');
    const timer = $('usta-timer');
    log('İş emri ustaya atandı: Mehmet Şahin (Lift-2)');
    await wait(g, 900);
    flashBtn(1);
    log('İş başlatıldı — süre sayacı çalışıyor ▶');
    if (timer) {
      for (let s = 0; s <= 42; s++) {
        if (g !== gen) throw 'cancelled';
        timer.textContent = '00:00:' + String(s).padStart(2, '0');
        await wait(g, 40);
      }
    }
    flashBtn(2); log('QR ile parça talebi: Ön Fren Balata Takımı (Raf A-12)');
    await wait(g, 1200);
    flashBtn(3); log('Öncesi/sonrası fotoğraf buluta kilitlendi 📸');
    await wait(g, 1200);
    flashBtn(4); log('İşi teste gönderildi — şefe otomatik bildirim ✓');
    await wait(g, 700);
    setStep(2, 'done');
  }

  async function sahneStok(g) {
    showScreen('stok'); setStep(3, 'active');
    const list = $('parca-listesi'), toplam = $('parca-toplam'), sayi = $('parca-sayi'), adet = $('stok-adet');
    list.innerHTML = ''; toplam.textContent = '0 ₺'; sayi.textContent = '0 Kalem';
    log('QR okutuluyor: Raf A-12…');
    const scan = $('qr-scanline');
    if (scan) scan.classList.remove('hidden');
    await wait(g, 1500);
    if (scan) scan.classList.add('hidden');

    const items = [['5W-30 Motor Yağı (5L)', '1.850 ₺'], ['Yağ & Hava Filtre Seti', '940 ₺'], ['Ön Fren Balatası', '2.450 ₺']];
    let total = 0;
    for (const [name, price] of items) {
      total += parseInt(price.replace(/\./g, ''), 10);
      list.insertAdjacentHTML('beforeend', partRowHTML(name, price));
      toplam.textContent = total.toLocaleString('tr-TR') + ' ₺';
      sayi.textContent = list.children.length + ' Kalem';
      await wait(g, 750);
    }
    if (adet) adet.textContent = 'Kalan Stok: 17 Adet';
    showToast('3 parça işlendi — stok otomatik düşüldü ✓');
    log('3 parça iş emrine işlendi — ambar açığı yok ✓');
    await wait(g, 600);
    setStep(3, 'done');
  }

  async function sahneFatura(g) {
    showScreen('fatura'); setStep(4, 'active');
    const chat = $('wa-chat'), status = $('wa-status');
    chat.innerHTML = '<div class="text-center text-[9px] text-white/40 font-code-metric">Bugün</div>';
    status.className = 'px-2 py-0.5 rounded-full bg-surface-container text-text-muted font-label-sm text-[10px] font-bold';
    status.textContent = 'Bekliyor…';
    const waBtn = $('wa-btn');
    waBtn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> WhatsApp ile Gönder ✓';
    waBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
    waBtn.classList.add('bg-green-700');

    addChat(g, chatHTML('out', 'Sayın Burak Karadağ, 34 SP 911 plakalı aracınızın periyodik bakımı tamamlandı. Değişen parçaların fotoğrafları ektedir 📸', '14:20'));
    await wait(g, 1100);
    addChat(g, '<div class="wa-row flex justify-start"><div class="bg-[#202C33] rounded-2xl rounded-bl-sm px-3 py-2 typing-dots"><span></span><span></span><span></span></div></div>');
    await wait(g, 1100);
    const msgs = chat.querySelectorAll('.wa-row');
    if (msgs.length) msgs[msgs.length - 1].remove();
    addChat(g, chatHTML('in', 'Elinize sağlık, onaylıyorum 👍', '14:21'));
    await wait(g, 900);
    addChat(g, chatHTML('out', 'Fatura özetiniz onayınıza sunulmuştur: <span class="underline text-emerald-300">onay.servispilot.com.tr/b81f</span>', '14:22'));
    status.className = 'px-2 py-0.5 rounded-full bg-green-500/10 text-green-700 font-label-sm text-[10px] font-bold';
    status.textContent = 'Onaylandı ✓ 14:22';
    await wait(g, 900);

    const gibBtn = $('gib-btn'), gibDurum = $('gib-durum'), stamp = $('gib-stamp');
    gibBtn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span> GİB\u0027e gönderiliyor…';
    await wait(g, 1200);
    gibDurum.textContent = 'GİB Onayladı (E-Arşiv Kesildi)';
    gibDurum.className = 'text-green-700 font-bold';
    gibBtn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> GİB E-Faturası Kesildi ✓';
    if (stamp) stamp.classList.add('show');
    showToast('Tahsilat cariye işlendi — günlük ciro ₺56.138 ✓', 4200);
    log('Tahsilat cariye işlendi, ciro güncellendi ✓');
    await wait(g, 800);
    setStep(4, 'done');
  }

  const RUNNERS = { kabul: sahneKabul, usta: sahneUsta, stok: sahneStok, fatura: sahneFatura };

  // ---------- Kontroller ----------
  function showCta() {
    const c = $('demo-cta');
    if (c) { c.classList.remove('hidden'); c.classList.add('flex'); }
    const r = $('demo-replay');
    if (r) r.classList.remove('hidden');
  }
  function hideCta() {
    const c = $('demo-cta');
    if (c) { c.classList.add('hidden'); c.classList.remove('flex'); }
    const r = $('demo-replay');
    if (r) r.classList.add('hidden');
  }
  function syncTakeoverBtn() {
    const b = $('demo-takeover');
    if (!b) return;
    if (paused) {
      b.innerHTML = '<span class="material-symbols-outlined text-sm align-middle mr-1">play_arrow</span>Otomatiğe Dön';
      b.className = 'px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 font-bold';
    } else {
      b.innerHTML = '<span class="material-symbols-outlined text-sm align-middle mr-1">pan_tool</span>Kendin Dene';
      b.className = 'px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all bg-green-500/10 text-green-700 border border-green-500/30 hover:bg-green-500/20 font-bold';
    }
  }

  async function run(startIdx) {
    const g = ++gen;
    paused = false; syncTakeoverBtn();
    hideCta();
    let i = startIdx;
    try {
      while (true) {
        idx = i;
        markChip();
        timelineFor(i);
        await RUNNERS[SCENARIOS[i]](g);
        if (g !== gen) return;
        showCta();
        if (mode !== 'auto') { markChip(); return; }
        await wait(g, 7000);
        if (g !== gen) return;
        hideCta();
        i = (i + 1) % SCENARIOS.length;
      }
    } catch (e) {
      window.__demoErr = (e && e.stack) ? String(e.stack).slice(0, 400) : String(e);
      /* iptal — yeni tur zaten başladı */
    }
  }

  return {
    selectScenario(key) {
      if (window.track) track('demo_scenario', { location: key });
      if (key === 'auto') { mode = 'auto'; run(0); }
      else { mode = 'single'; idx = SCENARIOS.indexOf(key); run(idx); }
    },
    replay() {
      if (window.track) track('demo_replay', {});
      run(mode === 'auto' ? 0 : idx);
    },
    toggleTakeover() {
      paused = !paused;
      if (window.track) track('demo_takeover', { location: paused ? 'on' : 'off' });
      syncTakeoverBtn();
      const logEl = $('usta-log-text');
      if (paused && logEl) logEl.innerText = 'Otomatik tur duraklatıldı — butonlara kendin basabilirsin. ✋';
    },
    showScreen
  };
})();

// Sayfa hazır olunca Otomatik Tur'u başlat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DemoEngine.selectScenario('auto'));
} else {
  DemoEngine.selectScenario('auto');
}

/* ============================================================
   ServisPilot — Motion sistemi
   - data-motion: görünüme girince yumuşak reveal (bir kez)
   - data-motion-group: çocuklara otomatik kademeli gecikme
   - data-count-to: sayı sayaçları (reveal anında sayar)
   - prefers-reduced-motion: tüm hareket anında tamamlanır
   JS kapalıysa içerik gizlenmez (stiller .js kapsamında).
   ============================================================ */

document.documentElement.classList.add('js');

(function () {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Kapsayıcı çocuklarına kademeli gecikme ata
  document.querySelectorAll('[data-motion-group]').forEach((group) => {
    const stagger = parseInt(group.dataset.stagger || '70', 10);
    Array.from(group.children).forEach((child, i) => {
      if (!child.hasAttribute('data-motion')) child.setAttribute('data-motion', '');
      child.style.setProperty('--md', (i * stagger) + 'ms');
    });
  });

  function runCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const to = parseFloat(el.dataset.countTo || '0');
    const dec = parseInt(el.dataset.countDecimals || '0', 10);
    const pre = el.dataset.countPrefix || '';
    const suf = el.dataset.countSuffix || '';
    const fmt = (v) => pre + v.toLocaleString('tr-TR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    if (REDUCED) { el.textContent = fmt(to); return; }
    // rAF yerine interval + duvar saati: arka plan sekmelerinde de tamamlanir
    const t0 = performance.now(), dur = 1400;
    const iv = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * eased);
      if (p >= 1) { clearInterval(iv); el.textContent = fmt(to); }
    }, 40);
  }

  function reveal(el) {
    el.classList.add('in-view');
    el.querySelectorAll('[data-count-to]').forEach(runCounter);
    if (el.hasAttribute('data-count-to')) runCounter(el);
  }

  if (REDUCED || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-motion]').forEach(reveal);
    return;
  }

  // Görüş alanındaki öğeler başlangıçta senkron reveal edilir;
  // IntersectionObserver yalnızca ekran altındakileri izler.
  function inViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      reveal(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-motion]').forEach((el) => {
    if (inViewport(el)) reveal(el);
    else io.observe(el);
  });

  // Geç uygulanan stiller (Tailwind CDN) sonrası ve load'da yeniden değerlendir:
  // layout oturmadan ölçüm yapılırsa öğeler "ekran altında" sanılabilir.
  function initReveals() {
    document.querySelectorAll('[data-motion]:not(.in-view)').forEach((el) => {
      if (inViewport(el)) { reveal(el); io.unobserve(el); }
      else io.observe(el);
    });
  }
  window.addEventListener('load', initReveals);
  setTimeout(initReveals, 800);
})();

// Döner kelime (hero) — stoaix "Built for …" deseni
(function () {
  const rw = document.getElementById('rotating-word');
  if (!rw) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const words = ['iş emri defteri.', 'stok defterin.', 'cari defterin.', 'randevu defterin.'];
  let i = 0;
  setInterval(() => {
    rw.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % words.length;
      rw.textContent = words[i];
      rw.classList.remove('swap');
    }, 270);
  }, 2600);
})();

// ROI hesaplayıcı — canlı hesap
(function () {
  const cars = document.getElementById('roi-cars');
  if (!cars) return;
  const avg = document.getElementById('roi-avg');
  const pct = document.getElementById('roi-pct');
  const fmt = (v) => '₺' + Math.round(v).toLocaleString('tr-TR');
  function calc() {
    const lost = (+cars.value) * (+avg.value) * ((+pct.value) / 100);
    document.getElementById('roi-month').textContent = fmt(lost);
    document.getElementById('roi-year').textContent = fmt(lost * 12);
    document.getElementById('roi-cars-v').textContent = cars.value + ' araç';
    document.getElementById('roi-avg-v').textContent = '₺' + (+avg.value).toLocaleString('tr-TR');
    document.getElementById('roi-pct-v').textContent = '%' + pct.value;
  }
  [cars, avg, pct].forEach((el) => el.addEventListener('input', calc));
  calc();
})();

# -*- coding: utf-8 -*-
# CX polish: SSS akordiyon, ikon-box, shine, CSS ekleri
import io

with io.open('index.html', encoding='utf-8') as f:
    c = f.read()

def rep(old, new, cnt):
    global c
    n = c.count(old)
    assert n == cnt, f'{n} != {cnt}: {old[:70]}'
    c = c.replace(old, new)

# --- 1) CSS ekleri (.pop keyframes sonrasina) ---
css_anchor = """    @keyframes numberPop { 0% { opacity: .35; transform: translateY(4px); filter: blur(1px); } 100% { opacity: 1; transform: none; filter: blur(0); } }"""
css_add = css_anchor + """
    /* Yumusak scroll (anchor) */
    @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
    /* Focus gorunurlugu (erisilebilirlik) */
    :focus-visible { outline: 2px solid #E8930C; outline-offset: 2px; border-radius: 6px; }
    /* Marquee/ticker kenar fade */
    .marquee-wrap, .ticker-wrap { -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
    /* SSS yumusak akordiyon */
    .faq-body { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 340ms cubic-bezier(0.22, 1, 0.36, 1); }
    .faq-body:not(.open) { grid-template-rows: 0fr; }
    .faq-body > div { overflow: hidden; min-height: 0; }
    /* Kart ikon mikro-animasyonu + baslik rengi */
    .icon-box { transition: background-color 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1); }
    .spot-card:hover .icon-box { background-color: #E8930C; color: #fff; }
    .spot-card h3 { transition: color 320ms cubic-bezier(0.22, 1, 0.36, 1); }
    .spot-card:hover h3 { color: #B45309; }
    /* CTA shine sweep (yalnizca hero ana CTA) */
    .cta-shine { position: relative; overflow: hidden; }
    .cta-shine::after { content: ""; position: absolute; top: 0; left: -80%; width: 45%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent); transform: skewX(-20deg); transition: left 600ms cubic-bezier(0.22, 1, 0.36, 1); pointer-events: none; }
    .cta-shine:hover::after { left: 135%; }
    /* Header scroll golgesi */
    header.scrolled { box-shadow: 0 10px 30px -14px rgba(14, 27, 44, 0.22); }"""
rep(css_anchor, css_add, 1)

# --- 2) SSS yapisi (4 adet) ---
faqs = [
    (1, 'Ustalarım bilgisayara alışkın değil, kullanabilir mi?',
     'Kesinlikle evet. ServisPilot, bilgisayar kullanmayı bilmeyen ustalar düşünülerek tasarlandı. "Usta Kokpiti" modunda sadece 4 adet büyük, renkli ve net buton bulunur. Okuma-yazma ve temel telefon kullanımı yeterlidir.'),
    (2, 'Mevcut müşteri ve parça kayıtlarımızı aktarabilir miyiz?',
     'Evet. Excel veya CSV formatındaki tüm eski müşteri listenizi, cari bakiyelerinizi ve parça stoklarınızı teknik ekibimiz 15 dakika içinde ServisPilot\u0027a eksiksiz aktarır. Hiçbir veri kaybı yaşamazsınız.'),
    (3, 'GİB E-Fatura için ek entegratör ücreti öder miyim?',
     'Hayır. ServisPilot yerleşik Gelir İdaresi Başkanlığı (GİB) E-Arşiv / E-Fatura altyapısıyla entegredir. Dışarıdaki pahalı üçüncü taraf entegratör yazılımlarına ayrıca lisans veya aracı ücreti ödemezsiniz.'),
    (4, 'Verilerimiz güvende mi ve yedekleniyor mu?',
     'Tüm verileriniz ISO 27001 ve KVKK uyumlu Türkiye merkezli sunucularda 256-bit SSL şifreleme ile barındırılır. Günlük otomatik çift yedekleme sayesinde cihazınız çalınsa veya bozulsa dahi hiçbir bilginiz silinmez.'),
]
for n, q, a in faqs:
    old = (f'<div class="hidden px-5 pb-5 text-text-secondary font-body-md text-body-md border-t border-surface-container-high/40 pt-3" id="faq-{n}">\n'
           f'                {a}\n'
           f'              </div>')
    new = (f'<div class="faq-body" id="faq-{n}">\n'
           f'                <div class="px-5 pb-5 pt-1 text-text-secondary font-body-md text-body-md border-t border-surface-container-high/40">{a}</div>\n'
           f'              </div>')
    rep(old, new, 1)
print('FAQ yapi OK')

# --- 3) Modul kartlarina icon-box ---
icon_variants = [
    ('rounded-xl bg-primary-container/10 flex items-center justify-center text-primary mb-6', 'text-primary'),
    ('rounded-xl bg-secondary-container/10 flex items-center justify-center text-secondary-container mb-6', 'text-secondary-container'),
    ('rounded-xl bg-green-500/10 flex items-center justify-center text-green-700 mb-6', 'text-green-700'),
]
total = 0
for v, _tc in icon_variants:
    old = 'class="w-12 h-12 ' + v
    n = c.count(old)
    if n:
        c = c.replace(old, 'class="icon-box w-12 h-12 ' + v)
        total += n
print(f'icon-box: {total}')

# --- 4) Hero ana CTA shine ---
old_cta = '<a class="cta-pulse inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-md text-label-md font-bold transition-all" data-track="whatsapp_click" data-location="hero" data-press'
new_cta = '<a class="cta-shine cta-pulse inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-md text-label-md font-bold transition-all" data-track="whatsapp_click" data-location="hero" data-press'
rep(old_cta, new_cta, 1)

with io.open('index.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write(c)
print('INDEX PASS TAMAM')

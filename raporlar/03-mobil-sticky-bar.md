# 03 — Mobil Sticky CTA Bar
> Tarih: 2026-09-12 · Durum: ✅ Tamamlandı ve doğrulandı

## Yapılanlar
- Ekranın altına sabit çubuk eklendi (`#sticky-cta`), **yalnızca <1024px (mobil/tablet)** görünür; masaüstünde gizli.
- İki buton:
  - **[WhatsApp'tan Başla]** — amber gradyan, öndoldurulmuş mesajla wa.me hattına (`data-location="sticky"`).
  - **[Görüşme Planla]** — outline, takvim modalını açar (`data-location="sticky"`).
- Koyu yarı saydam + blur zemin, üst kenarlık; içeriğin altına sapmaması için `<body>`'ye `pb-[76px] lg:pb-0` eklendi.

## Doğrulama
390×844 mobil görünümde ekran görüntüsü alındı: çubuk altta sabit, butonlar çalışıyor, footer kapanmıyor.

## Not
Masaüstünde görünmez (premium görünüm korunur). İleride masaüstünde de istenirse `lg:hidden` sınıfının kaldırılması yeterli.

# 19 — 21st.dev ile Hero Animasyonları
> Tarih: 2026-09-13 · Durum: ✅ Tamamlandı · Kaynak: 21st.dev bileşen #2733 (Dynamic Animated Hero Section)

## 21st.dev MCP bağlandı
- `.zcode/config.json` çalışıyor; sunucu "21st" v0.1.1 doğrulandı
- Plan: ücretsiz (günde 2 bileşen kodu çekme — bugün 1'i kullanıldı, 1 kaldı)
- İlk kullanım: bileşen #2733 kodu çekildi ve markaya uyarlandı

## Uyarlanan teknikler (marka renkleriyle: amber/turuncu)
| Teknik (21st #2733) | Uygulama |
|---|---|
| Gradyan metin döngüsü (background-position animasyonu) | Hero başlığındaki "Kusursuz Düzen" — amber/turuncu tonlarında 9 sn'lik canlı gradyan |
| SVG çizgi çizim (stroke-dashoffset) | Hero üst köşelerde kendini çizen 2 ince devre çizgisi (amber, %40 opaklık, yüklemede 0.9/1.2 sn gecikmeyle çizer) |
| Desen kaydırma (repeating-linear-gradient + translate) | Hero arka planında %5 opaklıkta yavaş kayan çapraz desen |
| Nabız atan CTA (box-shadow pulse) | Ana "14 Gün Ücretsiz Başla" butonunda 3 sn'lik yumuşak amber parlama |

- Tümü `prefers-reduced-motion: no-preference` kapsamında — azaltılmış hareket tercihinde statik görünür
- Özgünlük: bileşenin pembe/mavi gradyanı değil, marka paleti (ffc174 → f59e0b → f66018 → e0a800) kullanıldı

## Doğrulama
1440×900 tarayıcı görüntüsü: çizgiler çizilmiş, desen görünür, gradyan canlı, CTA parlama aktif ✅

## Test notu
`?v=hero21` + Ctrl+F5 (önbellek).

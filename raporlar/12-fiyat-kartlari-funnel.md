# 12 — Fiyatlandırma: 3 Kartlı Satış Funnel'i (Yıllık Odaklı)
> Tarih: 2026-09-13 · İstek: 3 dikey paket kartı tek ekranda, Yıllık ortada ve "en avantajlı" olarak vurgulanmış. Amaç: Yıllık paketi satmak.
> Güncelleme (aynı gün): Kullanıcı kararıyla fiyatlar **2.399 / 1.599 / 1.899 ₺**'ye çekildi; indirimler gerçek orana göre **%33 / %21** olarak yeniden hesaplandı. `font-code-metric` (tüm sayı/metrik yazıları) **JetBrains Mono → Space Grotesk** olarak değiştirildi.

## Funnel mantığı
- **Yıllık (ORTA, hedef paket):** her şey dahil + 200 QR hediye. Görsel olarak yükseltilmiş: kalın amber çerçeve + glow, üstte "EN AVANTAJLI · %30 İNDİRİM" rozeti, gradient CTA, daha büyük fiyat.
- **Aylık (sol, giriş kapısı / çapa):** temel özellikler, taahhüt yok. Fiyatı (2.399 ₺) Yıllık'ın değerini görünür kılar.
- **6 Aylık (sağ, ara basamak):** bir tık üstü özellikler + 100 QR hediye. Yıllık'a göre her yönden "bir adım geride" konumlandırılır.
- Mobil sıralama (stack): **Yıllık → 6 Aylık → Aylık** (hedef paket ilk ekranda).
- 3 Aylık seçeneği bu yapıda kaldırıldı (kullanıcı kararı: paketler aylık / 6 aylık / yıllık).

## Paket içerikleri (güncel fiyatlarla)
| | Aylık | 6 Aylık | Yıllık |
|---|---|---|---|
| Fiyat | 2.399 ₺/ay | 1.899 ₺/ay (−%21) | 1.599 ₺/ay (−%33) |
| Tahsilat | aylık | 11.394 ₺ peşin | 19.188 ₺ peşin |
| Tasarruf | — | 3.000 ₺ | 9.600 ₺ |
| QR hediye | — | 100 | **200** |
| OCR | 150/ay | sınırsız | sınırsız |
| WhatsApp | durum bildirimi | onay portalı + PDF ekstre | + VIP |
| GİB E-Fatura | — | — | ✔ (0 ₺ aracı) |
| Destek | mesai saatleri | öncelikli | 7/24 VIP |
| Ekstra | — | 4 açılı hasar kaydı | OEM şase doğrulama, öncesi/sonrası arşiv, sabit fiyat garantisi |

## Değişiklikler
1. **index.html:** 4 butonlu dönem seçici + tek kart yapısı → 3 statik kart (Aylık / Yıllık-orta / 6 Aylık). Başlık: "Süresi Uzadıkça Avantajı Büyüyen Paketler"; alt metinde "%30 indirim + 200 QR hediye" vurgusu.
2. **js/main.js:** `PRICING_PERIODS`, `selectPricingPeriod()` ve DOMContentLoaded tetikleyicisi kaldırıldı — kartlar tamamen statik, JS bağımlılığı yok.
3. **WhatsApp linkleri** (paket bazlı öndoldurulmuş, güncel fiyatlarla):
   - `pricing-aylik`: "Aylık paketi (2.399 ₺/ay) için kurulum talep ediyorum."
   - `pricing-yillik`: "Yıllık paketini (%33 indirim — 1.599 ₺/ay + 200 QR hediye) için kurulum talep ediyorum."
   - `pricing-6aylik`: "6 Aylık paketini (%21 indirim — 1.899 ₺/ay + 100 QR hediye) için kurulum talep ediyorum."
4. **Ölçüm:** `whatsapp_click` location etiketleri paket bazlı (pricing-aylik / pricing-yillik / pricing-6aylik) → hangi kartın dönüşürdüğü raporlanır. `pricing_toggle` olayı devre dışı (seçici yok).
5. **Font (2026-09-13):** `index.html` head'deki Google Fonts bağlantısında JetBrains Mono kaldırılıp **Space Grotesk (500/600/700)** eklendi; `font-code-metric` eşlemesi `["Space Grotesk", "Plus Jakarta Sans", "sans-serif"]` yapıldı. Hero istatistikleri, plaka, fiyatlar ve tüm metrik yazıları bu fontu kullanır.

## CRO notları
- Orta kart deseni 21st.dev "Growth Plans" / "Pricing Section with Frequency Toggle" bileşenlerinden referans alındı (merkez kart: badge + glow + gradient CTA).
- Aylık kartın 2.399 ₺'si, Yıllık'ın üstü çizili fiyatı ile aynı çapa değeri taşıyor.
- "Yıllık sabit fiyat garantisi" Yıllık'a özel satış argümanı olarak eklendi.

## Doğrulama
- Masaüstü: 3 kart tek ekranda yan yana, Yıllık ortada badge + glow ile; mobil: Yıllık ilk sırada, yatay taşma yok.

# 10 — Fiyatlandırma Yenilemesi (Tek Paket + Dönem İndirimleri)
> Tarih: 2026-09-12 · İstek: tek paket gösterimi, 4 dönem seçeneği, peşin ödeme indirimleri

## Karar (kullanıcı talebi)
- Starter/Professional **iki kartlı yapı kaldırıldı** → **tek paket** ("ServisPilot Tam Paket") gösteriliyor.
- Varsayılan görünüm **Yıllık**; Aylık seçilince aylık fiyat gösteriliyor.
- Seçicide **4 dönem**: Aylık · 3 Aylık (−%10) · 6 Aylık (−%20) · Yıllık (−%30, "En Avantajlı" rozeti).

## Fiyat tablosu (taban: 2.399 ₺/ay)
| Dönem | Aylık eşdeğeri | Peşin tahsilat | İndirim | Tasarruf |
|---|---|---|---|---|
| Aylık | 2.399 ₺ | 2.399 ₺ (aylık) | — | — |
| 3 Aylık | 2.159 ₺ | 6.477 ₺ | %10 | 720 ₺ |
| 6 Aylık | 1.919 ₺ | 11.514 ₺ | %20 | 2.880 ₺ |
| Yıllık | 1.679 ₺ | 20.148 ₺ | %30 | 8.640 ₺ |

## Yapılan değişiklikler
1. **index.html — fiyat bölümü:**
   - 2 butonlu Aylık/Yıllık toggle → 4 butonlu dönem seçicisi (indirim rozetli, Yıllık'ta "En Avantajlı" mini rozeti).
   - İki kart (Starter + Professional) → tek geniş kart: sol sütun paket + fiyat + CTA, sağ sütun 10 maddelik kapsam listesi (2 sütun grid) + deneme/kurulum notu.
   - Alt başlığa "%30'a kadar indirim" vurgusu eklendi.
   - Fiyat alanına **tasarruf çipi** eklendi (`#savings-chip`), indirimli dönemlerde üstü çizili 2.399 ₺ gösterilir.
2. **js/main.js:**
   - `togglePricing()` kaldırıldı → `selectPricingPeriod(key, silent)` + `PRICING_PERIODS` veri haritası.
   - Dönem değişince: fiyat, üstü çizili eski fiyat, faturalandırma notu, tasarruf çipi ve **WhatsApp öndoldurulmuş mesajı** seçilen döneme göre güncellenir (`encodeURIComponent` ile).
   - `pricing_toggle` ölçüm olayı gönderilir (ilk açılışta `silent=true` ile gönderilmez).
   - DOMContentLoaded'da varsayılan dönem Yıllık olarak sessizce kurulur.
3. **Ölçüm:** CTA'daki `data-location` değeri `pricing` olarak birleşti (eski: starter/pro).

## Etki notları
- Starter (1.150/1.490 ₺) fiyatları siteden kalktı; tek paket kararına göre tüm özellikler tek listede birleştirildi.
- Eski "%25 indirim & 2 ay hediye" anlatısı yerine net dönem indirimleri (%10/%20/%30) kullanılıyor.
- WhatsApp mesajları artık dönemi ve fiyatı içeriyor → gelen talepten hangi paketle geldiği anlaşılıyor.

## Doğrulama
- Tarayıcıda varsayılan Yıllık görünümü ve Aylık geçişi görsel olarak test edildi (ekran görüntüleriyle).

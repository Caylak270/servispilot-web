# 10 — Geri Alma: Frame Modu → Kodlu Simülasyon (v1)
> Tarih: 2026-09-13 · Karar: Kullanıcı — "böyle güzel durmuyor", canlı demo linki verilecek

## Karar
Ekran görüntüsü tabanlı (frame) mod geri alındı; **kodlu canlı animasyonlu Kokpit 2.0 (v1)** geri getirildi. Kullanıcı ileride **canlı demo linki** verecek — o geldiğinde kokpit bölümüne doğrudan o link/gömülü deneyim eklenecek.

## Geri alınan / korunan
| Öğe | Durum |
|---|---|
| `index.html` kokpit bölümü | ✅ v1'e döndü: 4 panel (OCR / Usta / Stok / Fatura) + senaryo çipleri + zaman çizelgesi + sidebar |
| `js/demo-engine.js` | ✅ v1 motor + **duvar-saati bekleme düzeltmesi korundu** (arka plan donması bir daha yaşanmaz) |
| `js/main.js` | Değişiklik gerekmedi (v1 ile uyumlu) |
| `assets/shots/` (16 WebP kare) | 📦 Arşivde tutuluyor — canlı demo linki gelmezse yeniden kullanılabilir |
| `Ekran ssleri/` (36 orijinal) | Korundu |

## Doğrulama (tarayıcıda)
- Fatura senaryosu uçtan uca: 3 sohbet baloncuğu → "Onaylandı ✓ 14:22" → GİB damgası → Ciro ₺56.138 → CTA ✅
- JS hatası yok ✅
- Otomatik tur + Kendin Dene + Yeniden Oynat çalışır durumda ✅

## Canlı demo linki geldiğinde plan
1. Link türüne göre iki seçenek: **(a)** gömülü iframe/modal (Arcade, Navattic, YouTube, doğrudan app URL'i), **(b)** "Canlı Demoyu Aç" butonu ile yeni sekme
2. Kokpit bölümündeki sahne, link içeriğine göre değiştirilir; senaryo çipleri ve funnel CTA'sı (WhatsApp + Randevu) yerinde kalır
3. `demo_open` olayı ölçüme eklenir

## Test notu
Tarayıcı önbelleği eski sürümü tutabilir → `?v=v1restore` parametresiyle veya Ctrl+F5 ile açın.

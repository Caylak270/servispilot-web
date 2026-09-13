# 24 — Cal.com Randevu Sistemi Canlıda
> Tarih: 2026-09-14 · Durum: ✅ Tamamlandı ve doğrulandı

## Sonuç
Kullanıcının sağladığı API anahtarı ile Cal.com hesabına bağlanıldı; **"15 min meeting"** etkinliği bulundu ve siteye gömüldü. Artık takvim modalında **gerçek randevu takvimi** açılıyor — ziyaretçi gün/saat seçip randevu alıyor.

## Teknik
- Etkinlik: `https://cal.com/servispilot.com.tr/15min` (Ücretsiz Kurulum Görüşmesi, Europe/Istanbul)
- `js/config.js → calendar.url` dolduruldu — modal artık WhatsApp yedeği yerine gerçek takvimi iframe içinde gösteriyor (lazy: ilk açılışta yüklenir)
- Hesaptaki diğer etkinlikler: 30min, secret (gerekirse config'den seçilir)

## API anahtarı hakkında (ÖNEMLİ)
Kullanıcının verdiği `cal_live_…` değeri bir **Cal.com API anahtarı** — embed için gerekli DEĞİLDİ; yalnızca etkinlik listesini otomatik bulmak için bir kez kullanıldı ve hiçbir dosyaya kaydedilmedi. Embed, herkese açık randevu linkiyle çalışır.

⚠️ Bu anahtar sohbette paylaşıldığı için güvenlik için **Cal.com panosundan yenilenmesi (rotate)** önerilir.

## Doğrulama
- Modal açık: iframe `cal.com/servispilot.com.tr/15min` yüklü, takvim görünür ✅
- Açılış animasyonu (scale+fade) çalışıyor ✅
- Kapatma: 260ms yumuşak geçiş ✅

## Notlar
- Dağıtımda (GitHub Pages / hosting) js/config.js tarayıcı önbelleğine takılmaması için `?v=` sürümlerini güncellemeyi unutmayın (şu an v=22).
- Cal.com panosundan etkinlik adını "Ücretsiz Kurulum Görüşmesi (15 dk)" olarak Türkçeleştirmek önerilir.

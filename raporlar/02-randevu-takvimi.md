# 02 — Randevu Takvimi (Bölüm + Modal)
> Tarih: 2026-09-12 · Durum: ✅ Tamamlandı · **Bekleyen: Calendly/Cal.com linki**

## Yapılanlar

### 1. "Görüşme" bölümü (`index.html`, `#gorusme`, fiyat ile SSS arasında)
- Sol: "15 Dakikada Sistemi Canlı Görün" başlığı + görüşme içeriği maddeleri (canlı kokpit turu, kurulum planı, ücretsiz veri aktarım planı) + "Görüşme Planla" butonu + WhatsApp alternatifi.
- Sağ: premium takvim kartı (15 dk / ₺0 / Çevrimiçi rozetleri) + "Takvimden Randevu Al" butonu.

### 2. Takvim modalı (`js/main.js` + modal HTML)
- "Görüşme Planla" / "Randevu Al" / sticky bar'daki buton → karartılmış pencere açılır (ESC veya dışına tıklayınca kapanır).
- **`js/config.js` → `calendar.url`** doluysa: takvim iframe olarak pencere içinde yüklenir (lazy — ilk açılışta yüklenir, sayfa hızını etkilemez).
- Boşsa: şık bir yedek ekran gösterir ("Randevu takvimimiz çok yakında" + WhatsApp'tan Yazın butonu). **Şu an bu yedek aktif.**

## Etkileşim
- Modal açık/kapama, ESC tuşu ve dış tıklama test edildi: çalışıyor.
- Her açılış `calendar_open` olayı + konum etiketiyle ölçülüyor.

## Gerekli girdi
Calendly (öneri) veya Cal.com'da "Ücretsiz Kurulum Görüşmesi — 15 dk" etkinliği oluşturup linki `js/config.js` içindeki `calendar.url` alanına yapıştırmak yeterli — başka kod değişikliği gerekmez.

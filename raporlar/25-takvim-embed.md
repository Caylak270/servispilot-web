# 25 — Takvim Doğrudan Sitede (Cal.com Embed)
> Tarih: 2026-09-14 · Durum: ✅ Tamamlandı ve doğrulandı

## Yapılanlar
- **Randevu bölümü (#gorusme) sağ kolon** artık statik kart değil: **Cal.com randevu takviminin canlı gömülüsü** — ziyaretçi sayfadan çıkmadan gün (Eylül 2026 ızgarası) ve saat dilimini (9:00, 9:15…) seçip randevu alıyor.
- Iframe: `cal.com/servispilot.com.tr/15min` — `loading="lazy"` (bölüm görünüme gelmeden yüklenmez), beyaz kart çerçevesi + gölge ile site stiline oturtuldu.
- Takvim koyu tema ile geliyor — lacivert hero ve site aksanlarıyla uyumlu; açık tema istenirse Cal.com panosundan Appearance → Theme değiştirilebilir veya URL'e `&theme=light` eklenir.
- Sol kolon ve tüm CTA'lar aynen: WhatsApp'tan Başla + Görüşme Planla.

## Doğrulama
1440×900 ekran görüntüsü: takvim Eylül 2026 ızgarası, seçilebilir günler (14 vurgulu), saat dilimleri görünür ✅

## 21st.dev kullanımı
Bento/hover desen araması metadata düzeyinde yapıldı (ücretsiz); kod çekme hakkı (1 kaldı) daha gerekli bir bileşen için saklandı.

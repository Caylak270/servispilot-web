# 05 — Logo, Favicon ve Paylaşım (OG) Etiketleri
> Tarih: 2026-09-12 · Durum: ✅ Tamamlandı

## Yapılanlar
- **Logo yerelleştirildi:** Google-hosted URL'den (`lh3.googleusercontent.com` — kontrolümüz dışında, her an kırılabilirdi) indirildi → `assets/logo.jpg` (512×512). Header artık yerel dosyayı kullanıyor.
- **Favicon eklendi:** sekmede/başlangıç ekranında ServisPilot logosu görünür (`assets/logo.jpg`).
- **Sosyal paylaşım kartı (OG):** WhatsApp'ta/Twitter'da site linki paylaşıldığında başlık + açıklama + logo çıkıyor:
  - Başlık: "ServisPilot — Bulut Tabanlı Oto Servis Yönetim Sistemi"
  - Açıklama: "Kurulumu ekibimiz yapar — 14 gün ücretsiz deneyin…"

## Not — OG görseli
Şu an paylaşım kartında kare logo kullanılıyor. Sitenin domain'i yayına alındığında (Faz 3.8) koyu zeminli, 1200×630 özel OG görseli tasarlanacak; o zaman `og:image` mutlak URL'ye (https://servispilot.com.tr/...) çevrilmeli.

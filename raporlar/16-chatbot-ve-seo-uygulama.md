# 16 — Chatbot + SEO + Yasal Sayfalar Uygulama Raporu
> Güncelleme: 2026-09-13 · 14. rapordaki plandan uygulanan 4 adımın kaydı

## 1. Pilot Asistan — Site İçi Chatbot (ÜÇÜNCÜ TARAF YOK)

**Karar:** tawk.to/Tidio yerine **kendi kodumuzla** ücretsiz chatbot (bkz. 14. rapor tartışması). Üçüncü taraf ücretsiz kademesi ya kotalı (Tidio ~50 AI sohbet/ay, Chatbase ~100 mesaj/ay) ya da bot'suz canlı sohbet (tawk.to — personel gerektirir). Kendi botumuz 7/24 anında cevap verir, kota/marka/script maliyeti yoktur ve tek satış kanalı olan WhatsApp'a köprü kurar. Trafik büyüyünce Tidio'ya geçiş yolu açık.

### Dosyalar
- **`js/chatbot.js` (yeni):** Bot motoru + UI, tamamen bağımsız (Tailwind'e bağımlı değil, kendi scoped CSS'i enjekte eder)
- **`js/config.js`:** `chat: { enabled, assistantName, showOnMobile }` bölümü eklendi
- **`index.html`:** `js/chatbot.js` defer olarak eklendi

### Özellikler
- **13 konu başlığı** bilgi tabanı: fiyat, deneme, kurulum, GİB, güvenlik, veri aktarımı, usta kullanımı, WhatsApp onay, QR, OCR, iptal, görüşme, iletişim, ödeme
- **Anahtar kelime skorlama:** Türkçe karakter normalizasyonu (İ/ı, I/ı…), uzunluk ağırlıklı eşleşme, eşiği 4 puan
- **Hızlı çipler:** Fiyatlar · 14 gün ücretsiz · Kurulum nasıl oluyor? · GİB E-Fatura · Verilerim güvende mi? · İnsanla görüş
- **Funnel köprüsü:** Her cevapta bağlama özel CTA — WhatsApp (öndoldurulmuş mesaj, `chat_to_whatsapp` ölçümlü), takvim modalı (`calendar_open`/location=chatbot), sayfa içi scroll (fiyat/kokpit), gizlilik sayfası
- **Fallback:** Eşleşmezse "WhatsApp'tan sor" + kullanıcı sorusu mesaj gövdesine eklenir
- **Teaser:** 9 sn'de açılmazsa tek seferlik davet balonu + kırmızı nokta
- **Yazıyor animasyonu**, masaüstü varsayılan (mobil kapalı — sticky bar ile çakışmasın; `showOnMobile: true` ile açılabilir)
- **Ölçüm:** `chat_open`, `chat_bot_reply`, `chat_to_whatsapp`, `chat_teaser_show` (analytics.js altyapısına bağlı)
- **KVKK notu:** Panel altında Gizlilik Politikası bağlantısı

### Test sonucu (tarayıcıda, localhost:8471)
| Senaryo | Sonuç |
|---|---|
| Balon → panel açılışı + karşılama | ✅ |
| "paket fiyatları ne kadar?" → 3 paket + fiyat/kokpit CTA | ✅ |
| "İnsanla görüş" çipi → takvim modalı açılıyor | ✅ |
| Bilinmeyen soru → fallback + WhatsApp | ✅ (anahtar kelime düzeltmesi sonrası) |
| "verilerim güvende mi" → güvenlik cevabı | ✅ |
| "görüşme planlamak istiyorum" → takvim CTA (fiyat çakışması yok) | ✅ |
| "ustalarım bilgisayar kullanamıyor" → usta kokpiti cevabı | ✅ |
| Görsel: panel + balon tasarımı site temasıyla uyumlu | ✅ (ekran görüntüsüyle doğrulandı) |

**Testte yakalanan ve düzeltilen hata:** "yedek akü" sorusu "yedek" kelimesiyle veri güvenliği cevabını tetikliyordu (otomotivde "yedek parça" anlamı) → `yedek` kaldırılıp `yedekleme/yedeklenir/...` ile değiştirildi; ayrıca `numara` (plaka numarası çakışması) kaldırıldı, aktarım konusuna `parçalar/stoklar/parça aktar` eklendi.

## 2. JSON-LD Yapısal Veri
`index.html` head'e 3 blok eklendi (JSON geçerliliği programatik doğrulandı):
1. **Organization** (logo, e-posta, iletişim noktası)
2. **SoftwareApplication** — 3 Offer (2.399 / 1.899 / 1.599 TRY) — *sahte puan/yorum eklenmedi*
3. **FAQPage** — sayfadaki 4 SSS'nin birebir kopyası (Google kuralı: şema = görünür içerik)

Ayrıca `og:url` + `canonical` eklendi.

## 3. sitemap.xml + robots.txt
- `sitemap.xml`: / (1.0), gizlilik.html (0.3), kullanim-sartlari.html (0.3)
- `robots.txt`: tüm botlara açık + sitemap işaretli

## 4. Yasal Sayfa Şablonları
- **`gizlilik.html`**: Gizlilik Politikası + KVKK Aydınlatma Metni (m.11 hakları dahil)
- **`kullanim-sartlari.html`**: SaaS kullanım şartları (deneme, ücretlendirme, SLA, fikri mülkiyet, sorumluluk)
- İkisi de koyu tema, marka uyumlu; **`[...]` vurgulu yer tutucular** şirket bilgisiyle doldurulacak; footer'daki boş `#` bağlantıları bu sayfalara bağlandı
- Yayın öncesi avukat kontrolü önerilir (şablona işlendi)

## Varsayım (kontrol edilmeli)
- Alan adı **https://www.servispilot.com.tr/** varsayıldı (e-posta alan adından). Farklıysa güncellenecek: canonical, og:url, 3 JSON-LD bloğundaki URL'ler, sitemap.xml, robots.txt, kullanim-sartlari.html içindeki link.

## Kullanıcıdan Beklenen Girdiler (güncel)
| Girdi | Nereye | Durum |
|---|---|---|
| Alan adı teyidi (servispilot.com.tr mi?) | canonical/og:url/JSON-LD/sitemap/robots | ⏳ Yeni |
| Cal.com/Calendly linki | `js/config.js` → calendar.url | ⏳ |
| GA4 ID (G-XXXXXXX) | `js/config.js` → analytics.ga4Id | ⏳ |
| Microsoft Clarity ID | `js/config.js` → analytics.clarityId | ⏳ |
| Şirket unvan/adres/vergi no | gizlilik.html + kullanim-sartlari.html | ⏳ |

## Test notu
Yerel test için: proje klasöründe `python -m http.server 8471` → http://localhost:8471 — chatbot `file://` üzerinde de çalışır.

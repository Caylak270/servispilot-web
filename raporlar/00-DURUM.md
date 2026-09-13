# 00 — Genel Durum Panosu
> Güncelleme: 2026-09-13 (Oturum 5) · Detaylı raporlar aynı klasörde numaralı dosyalardadır.

## Tamamlanan
- [x] Site kurulumu: index.html + js/main.js (tasarım birebir aktarıldı, tarayıcıda doğrulandı)
- [x] Geliştirme planı: ../GELISTIRME-PLANI.md (funnel + simülasyon kararları işlendi)
- [x] **Adım 1 — WhatsApp funnel:** 12 CTA `wa.me/905309929505`'e öndoldurulmuş mesajla bağlı → 01
- [x] **Adım 2 — Randevu bölümü + takvim modalı** → 02
- [x] **Adım 3 — Mobil sticky CTA bar** → 03
- [x] **Adım 4 — Ölçüm altyapısı** (whatsapp_click, calendar_open, demo_*) → 04
- [x] **Adım 5 — Logo + favicon + OG** → 05
- [x] Doğrulama → 06
- [x] **Kokpit 2.0 — ChatFlow tarzı senaryo simülasyonu** → 07
- [x] Kokpit 2.0 v2 — ekran görüntüsü modu denendi → **kullanıcı kararıyla geri alındı** → 08, 09, 11
- [x] **Kokpit v1 geri geldi** (duvar-saati düzeltmesi korundu) → 11
- [x] Fiyatlandırma — tek paket + 4 dönem seçicisi → 10
- [x] **Fiyatlandırma — 3 kartlı satış funnel'i** (Aylık 2.399 / **Yıllık 1.599 −%33** / 6 Aylık 1.899 −%21 + 100 QR; sayı fontu Space Grotesk) → 12
- [x] **Kokpit modern yeniden tasarım** (stoaix/chatflow dili: sidebar kaldırıldı, hap çipler, telefon mockup'ı, toast bildirimleri) → **13**
- [x] **GitHub push:** github.com/Caylak270/servispilot-web (private, main) + gh CLI kurulumu → **15**
- [x] **Pilot Asistan — site içi chatbot** (kendi kodumuz, ücretsiz; üçüncü taraf kararı 14. raporda) → **16**
- [x] **JSON-LD şema** (Organization + SoftwareApplication + FAQPage) + canonical/og:url → **16**
- [x] **sitemap.xml + robots.txt** → **16**
- [x] **Yeni S°P monogram logosu** (şeffaf header PNG + favicon + OG kartı; eski logo.jpg kaldırıldı) → **17**
- [x] **21st.dev MCP bağlandı** + hero animasyonları (gradyan döngüsü, SVG çizim, desen kaydırma, CTA pulse — bileşen #2733 uyarlaması) → **19**
- [x] Hero animasyonları **kullanıcı kararıyla geri alındı** — motion sistemi (reveal + sayaçlar) yerinde kaldı → 19
- [x] **Yasal sayfa şablonları** (gizlilik.html + kullanim-sartlari.html; `[...]` yer tutuculu) + footer bağlantıları → **16**
- [x] Chatbot tarayıcıda test edildi (8 senaryo + görsel doğrulama; "yedek" anahtar kelime çakışması düzeltildi) → **16**

## Sıradaki
1. **Alan adı teyidi** (servispilot.com.tr varsayıldı) → canonical/og:url/JSON-LD/sitemap/robots güncellenir
2. **Canlı demo linki** (kullanıcı verecek) → kokpit bölümüne gömme; plan 11. raporda
3. **Karşılaştırma tablosu + ROI hesaplayıcı** (Faz 1.5 — stoaix deseni)
4. Tailwind CDN → derlenmiş CSS (Faz 0.3)
5. Yasal sayfaların yer tutucularının doldurulması + avukat kontrolü (şirket bilgisi gerekli)
6. 21st.dev ile premium görsel yükseltme (Faz 3 — ZCode restart sonrası MCP aktif)
7. Görsellerdeki gerçek müşteri verilerinin test verisiyle yenilenmesi (yayın öncesi)

## Kullanıcıdan beklenen girdiler
| Girdi | Nereye | Etkisi |
|---|---|---|
| **Alan adı teyidi** (https://www.servispilot.com.tr varsayıldı) | canonical/og:url/JSON-LD/sitemap/robots | SEO adresleri kesinleşir |
| **Cal.com randevu linki** (sözlendi, sonraki adımda gelecek) | `js/config.js` → `calendar.url` | Modal gerçek takvimi gösterir |
| GA4 ölçüm ID (G-XXXXXXX) | `js/config.js` → `analytics.ga4Id` | GA4 otomatik yüklenir |
| Microsoft Clarity ID | `js/config.js` → `analytics.clarityId` | Heatmap + session kaydı |
| Şirket unvan/adres/vergi no | gizlilik.html + kullanim-sartlari.html | Yasal sayfalar tamamlanır |

## Teknik notlar
- Geliştirme testlerinde tarayıcı önbelleği eski HTML'i sunabilir → `?v=...` veya Ctrl+F5. Yayınlarken HTML için `Cache-Control: no-cache` ayarlanmalı.
- Senaryo motoru, ziyaretçi sekmeye bakmıyorken otomatik duraklar (bilinçli davranış).

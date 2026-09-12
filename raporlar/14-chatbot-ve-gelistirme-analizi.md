# 14 — Chatbot & Site Geliştirme Analizi
> Güncelleme: 2026-09-13 · Ana plan: `../GELISTIRME-PLANI.md` · Bu rapor: chatbot dahil güncel eksik analizi + öncelikli uygulama planı

## 1. Mevcut Durum (Neler Hazır)

Funnel iskeleti büyük ölçüde kurulmuş durumda:

| Bileşen | Durum |
|---|---|
| WhatsApp funnel (12 CTA, konum etiketli, öndoldurulmuş mesaj) | ✅ Çalışıyor |
| Randevu bölümü + takvim modalı | ✅ Var — **takvim URL'i boş** (`js/config.js`), modal yedek ekranda |
| Mobil sticky CTA bar | ✅ Var |
| Ölçüm olayları (whatsapp_click, calendar_open, demo_*) | ✅ Tanımlı — **GA4 + Clarity ID boş**, ölçüm fiilen başlamadı |
| Logo + favicon + OG görseli | ✅ Var |
| Kokpit 2.0 senaryo simülasyonu (modern tasarım) | ✅ Var |
| Fiyatlandırma — 3 kart (Aylık 2.399 / Yıllık 1.599 / 6 Aylık 1.899) | ✅ Var |
| SSS bölümü | ✅ Var (içerik chatbot eğitimine doğrudan aktarılabilir) |

## 2. Tespit Edilen Eksikler (Bu Analizde Bulunanlar)

| # | Eksik | Etki |
|---|---|---|
| 1 | **JSON-LD yapısal veri yok** (0 schema.org bloğu) — FAQPage, Product, Organization schema planlıydı ama eklenmedi | 🟡 Zengin sonuç + SEO kaybı; SSS bölümü hazır olduğu için FAQPage schema düşük eforla eklenir |
| 2 | **sitemap.xml ve robots.txt yok** | 🟡 Google dizinleme eksik |
| 3 | Tailwind hâlâ CDN'den yükleniyor | 🟡 İlk yükleme gecikmesi (Faz 0.3, hâlâ açık) |
| 4 | Yasal sayfalar (KVKK/Gizlilik) yok — şirket bilgisi bekleniyor | 🔴 Kurumsal müşteri güveni + chatbot KVKK açısından ön koşul |
| 5 | Karşılaştırma tablosu + ROI hesaplayıcı yok (Faz 1.5) | 🟡 Karar süresi uzuyor |
| 6 | config.js'te takvim/GA4/Clarity ID'leri boş — kullanıcı girdisi bekleniyor | 🔴 Ölçüm ve randevu akışı fiilen pasif |
| 7 | Canlı demo linki bekleniyor (kokpit bölümüne gömülecek) | 🟡 |

## 3. Chatbot Analizi (Kullanıcı Talebi: Ücretsiz Çözüm)

### Neden mantıklı?
- Satış kanalı WhatsApp; ancak ziyaretçinin **ilk 30 saniyedeki** soruları (fiyat, kurulum, KVKK, entegrasyon) için 7/24 anında cevap katmanı kurar.
- Mesai dışı ziyaretçi kaybını azaltır → cevaplayamadığı yerde WhatsApp'a köprü kurar.
- SSS bölümündeki içerik zaten var → chatbot eğitimi neredeyse bedava.

### Kritik tasarım ilkesi
> Chatbot, WhatsApp funnel'ının **rakibi değil, ön filtresi** olmalı. Bot cevaplayamadığında veya satış niyeti algıladığında tek yönü `wa.me/905309929505` olmalı. İki farklı satış kanalı yaratılmamalı.

### Ücretsiz seçenek karşılaştırması (2026 güncel)

| Araç | Ücretsiz plan | Artı | Eksi |
|---|---|---|---|
| **tawk.to** | Sınırsız sohbet, kalıcı ücretsiz, TR destek, mobil uygulama | "Gerçekten ücretsiz" tek canlı sohbet; hazır cevaplar + tetikleyiciler | Ücretsiz kademede AI bilgi tabanı yok — canlı sohbet aracı |
| **Tidio** | ~50 AI sohbet/ay (Lyro AI) | Tek widget'ta canlı sohbet + AI bot; kurulumu en kolayı; TR dil desteği | AI kotası dar; trafik artınca ücretliye geçer (~$29+) |
| **Chatbase** | ~50-100 AI mesaj/ay | Site içeriğinden kendi kendine öğrenen AI; gömme tek script | Kota çok dar, asıl kullanım paid |
| **Botpress / Chatling** | Ücretsiz kademe (bot başına kotalı) | AI botlar için en cömert ücretsiz katman | Kurulum daha teknik |
| **WhatsApp baloncuğu** | Bedava (wa.me linki) | Zaten sticky bar + footer ile kısmen karşılanmış durumda | Yeni değer katmıyor |

### Öneri — İki aşamalı:

**Aşama 1 (hemen, ~1 saat): tawk.to**
- Sınırsız ve kalıcı ücretsiz → riski sıfır. Hazır cevap kütüphanesine SSS'den 8-10 hızlı cevap girilir.
- Tek embed script'i `</body>` öncesine; `defer` + etkileşim sonrası yüklenme (ör. 3 sn gecikme veya ilk scroll) ile LCP etkilenmez.

**Aşama 2 (trafik geldikçe): Tidio'ya geçiş veya ekleme**
- 50 AI sohbet/ay mevcut trafik için yeterli; AI bot SSS içeriğiyle eğitilir.
- Kota dolunca otomatik olarak canlı sohbet/WhatsApp'a düşer.

### Uygulama notları (chatbot gömerken dikkat)
1. **Mobil çakışma:** Sticky bar alt tam genişlikte; chatbot balonu sağ altta → mobilde balonu sticky bar'ın üstüne konumlandır veya mobilde balonu gizle (mobilde dönüşüm zaten WhatsApp üzerinden).
2. **KVKK:** Chatbot ziyaretçi verisi toplar → yasal sayfalar (madde 2.4) chatbot'tan önce bitirilmeli; widget açıklamasına kısa KVKK notu.
3. **Ölçüm:** `chat_open`, `chat_bot_reply`, `chat_to_whatsapp` olayları mevcut analytics katmanına eklenir (rapor 04 desenine uygun).
4. **Bot kişiliği:** "Pilot Asistan" — kibar, kısa cevaplar, satışta WhatsApp'a yönlendirir; fiyat sorularına net cevap verir (fiyatlar zaten sitede açık).

## 4. Öncelikli Uygulama Sırası (Güncel Plan)

| Sıra | Aksiyon | Efor | Not |
|---|---|---|---|
| 1 | config.js doldurma: takvim URL + GA4 + Clarity ID | 10 dk | Kullanıcı girdisi bekliyor — ölçüm olmadan hiçbir optimizasyon yapılamaz |
| 2 | Chatbot Aşama 1: tawk.to embed + SSS hazır cevapları | ~1 saat | Bu raporun 3. bölümü |
| 3 | FAQPage + Organization JSON-LD schema | 1-2 saat | SSS içeriği hazır, düşük efor yüksek SEO kazanç |
| 4 | sitemap.xml + robots.txt | 30 dk | |
| 5 | Yasal sayfalar (KVKK/Gizlilik) | 2-3 saat | Şirket bilgisi gerekli; chatbot için ön koşul |
| 6 | Karşılaştırma tablosu + ROI hesaplayıcı (Faz 1.5) | 1 gün | Ana planda detaylı |
| 7 | Tailwind derlenmiş CSS'e geçiş | 1 gün | LCP iyileşmesi |
| 8 | Chatbot Aşama 2: Tidio AI (trafik başlayınca) | 1 saat | |

## 5. Karar / Girdi Gerekli

- [ ] Chatbot tercihi: tawk.to ile başla? (öneri) yoksa doğrudan Tidio mu?
- [ ] Chatbot balonu mobilde görünsün mü, yoksa sticky bar yeterli mi? (öneri: mobilde gizle)
- [ ] Cal.com/Calendly linki + GA4 + Clarity ID (mevcut bekleyen girdiler)

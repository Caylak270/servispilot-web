# ServisPilot — Detaylı Pazarlama Stratejisi Planı
*Hazırlanma: 13 Eylül 2026 · Veri kaynakları: Meta Reklam Kütüphanesi taramaları, Google Ads Şeffaflık Merkezi, SerpApi 12 kelimelik SERP testi, Instagram hashtag/profil analizi, rakip site incelemeleri · Ham veri: `research/` klasörü, rakip raporu: `research/ad_lifespan_report.md`*

---

## 1. Yönetici Özeti

**Hedef (90 gün):** 10-20 ödeme yapan müşteri, doğrulanmış CAC, 3+ kullanılabilir müşteri referansı.

**Parametreler:** Aylık bütçe 10-20 bin ₺ · Aşama: 0-5 müşteri · Operasyon: Sen (WhatsApp + yükleme) + Ben (içerik/reklam metni üretimi) · Kitle: Türkiye geneli özel/bağımsız oto servisler.

**Pazarın üç kanıtlanmış boşluğu (bu plana temel):**

| # | Boşluk | Kanıt |
|---|---|---|
| 1 | **Google Arama reklamı fiilen boş** | 12 para kelimesinin 11'inde canlı reklam sıfır (SerpApi, Eyl 2026). Kursoft 1.050 gün, Canbus 872 gün aynı reklamı kârlı şekilde döndürmüş — talep var, arz yok. |
| 2 | **"Oto servis + muhasebe tek paket" konumu sahipsiz** | ServisTakipPro ve ServisiniTakipEt'in (499-1.000 ₺) muhasebe modülü yok; Automasyon'da var ama fiyatı/demosu gizli. "Oto servis muhasebe programı" gerçek bir arama kelimesi. |
| 3 | **Instagram organik içerik çölü** | #otoservis hashtag'inde ortalama 4 beğeni; yazılım firması içerik üreticisi sıfır. Reels + retargeting ile bedava erişim mümkün. |

**Başarı kriteri:** CAC < 3.000 ₺ (yıllık paket müşteri değeri 19.188 ₺'ye karşı LTV/CAC > 6). İlk 90 gününde 10-20K ₺ bütçeyle bu hedefe ulaşmak gerçekçi çünkü arama rekabeti yok.

---

## 2. Konumlandırma & Mesaj Mimarisi

### 2.1 Konum cümlesi
> **ServisPilot, oto servisin hem iş takibini hem muhasebesini tek pakette yapan Türkiye'nin bulut programıdır.** Ruhsat OCR, QR parça takibi, WhatsApp müşteri onayı ve yerleşik GİB E-Fatura ile kurulumsuz, aracı ücretisiz çalışır.

### 2.2 Fiyat konumlandırması (kritik karar)
Piyasa benchmark'ı (Eylül 2026):

| Rakip | Fiyat | Muhasebe modülü |
|---|---|---|
| ServisTakipPro | 499 ₺/ay | ❌ (kasa/cari var) |
| ServisiniTakipEt | 1.000 ₺/ay (liste 2.400 ₺) | ❌ (cari/e-Arşiv var) |
| Ebakimdefteri (QR defter) | ? | ❌ |
| Automasyon/Karnaval | Gizli (WhatsApp'tan) | ✅ |
| **ServisPilot** | **1.599-2.399 ₺/ay** | ✅ **(GİB E-Fatura yerleşik, aracı ücreti 0 ₺)** |

Fiyatın üst segmentte kalması sorun değil — **amaç kârlılığı ile satmaktır**:
- **Günde 53 ₺'lik yıllık paket** (1.599/30) ≈ bir çay-poğaça bedeli. Bu çerçeve her satış görüşmesinde ve reklamda kullanılacak.
- E-faturayı ayrı programdan alan servisin **aylık 400-700 ₺ aracı/yazılım ücreti** var → ServisPilot'ta 0 ₺. Fark kısmen kapanıyor; mesaj: "E-fatura programına ödediğini düş, gerisi servis takibi hediye."
- "İlk 50 Özel Servise Özel Sabit Fiyat" kampanyası (sitede mevcut) aciliyet ve kapsayıcılık (fiyat artışı koruması) vaadi olarak her temas noktasına eklenecek.

### 2.3 Üç kanca mesaj (tüm kanallarda tekrarlanacak)
1. **"Usta, bu araca ne yapmıştık?"** — QR bakım geçmişi kancası. (Bu mesajı şu an 3 mikro-rakip reklamda test ediyor: Ebakimdefteri 31 gün, OtoHafıza 5 gün, bakimqr 1 gün — talep doğrulanmış. Biz daha geniş paketle cevap veriyoruz.)
2. **"Excel'i ve defteri bırak."** — "teknik servis programı excel" diye arayan kitle hazır; Excel'den geçiş acısı gerçek.
3. **"E-Fatura için ayrı program ödemeyin."** — muhasebe entegrasyonu farklılaştırıcımız; hiçbir 499-1.000 ₺ rakipte yok.

### 2.4 Persona (tek ve net)
**"Özel servis sahibi Mehmet Usta"** — 30-55 yaş, 1-8 teknisyen, aylık 40-300 araç, Excel/defter/yağ kartıyla yönetiyor, WhatsApp'ı hayatının merkezi, muhasebeciye ay sonunda kağıt yığınını veriyor. Karar verirken: kurulum kolaylığı > fiyat > özellik. Telefonundan bakar — tüm reklamlar ve landing mobil öncelikli test edilecek.

---

## 3. Hafta 0 — Ön Koşullar (reklama başlamadan tamamlanacak)

| # | İşlem | Not |
|---|---|---|
| 1 | **Domain teyidi** | `servispilot.com.tr` sahipliği kesinleşsin (sitemap'te "varsayım" notu var). Reklam bütçesi sahipsiz domain'e akıtılmaz. |
| 2 | **GA4 + Microsoft Clarity aktivasyonu** | `js/analytics.js` destekliyor ama ID'ler boş. GA4 property + Clarity projesi açıp ID'leri gir. `whatsapp_click` olayı zaten var — reklam dönüşümünün kalbi bu. |
| 3 | **Google Ads hesabı + dönüşüm takibi** | GA4'ü Ads'e bağla; `whatsapp_click` = "lead" dönüşümü olarak import et. Reklam optimizasyonu bu sinyalle yapılacak. |
| 4 | **WhatsApp Business** | Katalog (6 özellik ekran görüntüsü), hızlı yanıtlar (aşağıdaki script'ler), işletme profili, etiketler: `yeni-lead / demo / deneme / kapandı / pas`. |
| 5 | **Randevu takvim linki** | `js/config.js`'te `calendar.url` boş → Google Calendar/Calendly rezervasyon sayfası bağla (landing'deki "15 Dakikada Sistemi Canlı Görün" bölümü çalışsın). |
| 6 | **3 referans toplama** | Mevcut pilot müşterilerden yazılı referans + mümkünse 30-60 sn telefon videosu. "Müşteri Yorumları" bölümü şu an anonim — isimli + şehirli 3 yorum reklamların ve landing'in itici gücü olur. |
| 7 | **Landing'e SEO alt yapısı** | H1'e ve meta'ya "oto servis muhasebe programı" kelime ailesi eklensin (şu an "yönetim" odaklı). Blog alt sayfaları bölüm 6'da. |

---

## 4. Kanal 1 — Google Arama Reklamları (Ana Motor · %60-70 bütçe)

**Neden ana kanal:** Rakip yok (12/12 kelimede 2 reklam) + kârlılık kanıtlı (Canbus aynı metni 872 gündür döndürüyor) + alım niyeti zirvede (kullanıcı ararken yakalanıyor).

### 4.1 Kampanya yapısı ve kelime grupları

**Kampanya: SP-Core** (bütçenin %55'i — 6-7K ₺/ay)

| Reklam Grubu | Kelimeler (eşleşme) |
|---|---|
| A-Core | `[oto servis programı]`, `[oto servis takip programı]`, `[servis takip programı]`, `[tamirhane programı]`, `"oto servis programı"`, `"servis takip programı"` |
| B-Teknik Servis | `[teknik servis programı]`, `[teknik servis takip programı]`, `"araç servis takip programı"` |
| C-Tamirhane | `[tamirhane takip programı]`, `"oto tamirhane programı"`, `"arac servis takip"` |

**Kampanya: SP-Muhasebe** (%20 — 2,5K ₺/ay) — *farklılaştırıcımız, rakipsiz alan*

| Reklam Grubu | Kelimeler |
|---|---|
| D-Muhasebe | `[oto servis muhasebe programı]`, `"servis muhasebe programı"`, `"oto servis e fatura"`, `"araç muhasebe programı"` |

**Kampanya: SP-Kenar** (%10 — 1,5K ₺/ay, 2. haftadan sonra)

| Reklam Grubu | Kelimeler |
|---|---|
| E-Excel'den Kaçanlar | `"teknik servis programı excel"`, `"oto servis programı excel"`, `"servis takip excel"` |
| F-Yan Sektör | `[oto ekspertiz programı]`, `[lastik servis programı]`, `[yedek parça takip programı]` |

**Bütçenin kalan %15'i (~2,5K ₺):** 3. haftada kazanan gruba ek aktarım + marka koruması (`servispilot`, `servispilot programı` — çok ucuz).

### 4.2 Negative keyword listesi (kampanya geneli)
```
ücretsiz indir, bedava indir, crack, torrent, keygen, full indir, açık kaynak,
okul servis, okul servisi, servis iş başvurusu, servis şoförü, maaş, kariyer,
iş ilanı, servis elemanı arıyorum, kargo servis, beyaz eşya tamir kursu,
eğitim, kurs, sertifika, excel şablonu indir
```

### 4.3 Reklam metinleri — RSA (kopyala-yapıştır)

**Başlıklar (≤30 karakter):**
```
Servis + Muhasebe Tek Paket
14 Gün Ücretsiz Deneyin
Kredi Kartı Gerekmez
Ruhsatı Okut, İş Emri Aç
GİB E-Fatura Yerleşik
Kurulum Ücretsiz — Biz Yaparız
Excel'i Bırak, Pilota Geç
QR ile Parça Takibi
WhatsApp'tan Onay Al
Türkiye'nin Servis Pilotu
Aylık 1.599 ₺'den Başlar
Özel Servisler İçin
Tahsilatınızı Hızlandırın
İlk 50 Servise Sabit Fiyat
60 Saniyede Canlı Deneyin
```

**Açıklamalar (≤90 karakter):**
```
İş emri, parça, cari ve E-Fatura tek ekranda. Kurulum ücretsiz, 14 gün bedava.
Ruhsat OCR ile saniyeler içinde iş emri açın. Kredi kartı istemiyoruz.
Servis takibi ve muhasebesi tek pakette. E-Fatura yerleşik, aracı ücreti yok.
Excel tablolarına ve defterlere son. Oto servisinizi 60 saniyede canlı test edin.
```

**Kanca çerçevesi:** Grup A/B/C'de başlık 1, 7, 15 öne çıkar; Grup D'de (muhasebe) başlık 1, 5, 11 + açıklama 3 öne çıkar. Her RSA'da "14 Gün Ücretsiz" + sabit fiyat başlığı mutlaka dönmeli.

**Uzantılar (assets):** Sitelink: Canlı Kokpit Demo / Fiyatlar / Özellikler / WhatsApp'tan Yaz · Callout: Kredi Kartı Yok · Kurulum Bizden · TR Sunucu · KVKK/SSL · Structured snippet: Özellikler: OCR, QR, E-Fatura, WhatsApp Portal.

### 4.4 Teklif ve optimizasyon
- Başlangıç: Maks. Tıklama + CPC tavanı 15 ₺ (rekabet yokken CPC'ler 2-6 ₺ bandında kalır).
- 15-20 dönüşüm birikince: "Dönüşümleri Encause Et"e geç, teklif hedefi = CPL 150-250 ₺.
- Haftalık rutin: arama terimleri raporunu temizle (alakasızları negative'e), en kötü 2 reklamı durdur, en iyi 2'nin varyasyonunu ekle.
- **Kural: hiçbir kampanya 90 günden erken kapanmaz** (İndemSoft'un 102 günlük başarısız denemesi dersi).

---

## 5. Kanal 2 — Meta (Instagram+Facebook) Video + WhatsApp (%25-30 bütçe)

**Model (rakip kanıtlı):** Video kreatif + "WhatsApp mesajı gönder" CTA. Kanıt: Automasyon 461 gün, Seripos 343 gün (4 dikeyde aynı model), Bilsoft 151 gün/19 reklam. Bu nişte Meta'da 100+ gün yaşayan tek format bu.

### 5.1 Üç kreatif brief'i (videoları sen çeker, metinlerini ben yazarım)

| # | Format | Süre | Senaryo iskeleti |
|---|---|---|---|
| K1 | **Müşteri hikayesi** (Bilsoft "Mutlu Firmalar" kopyası) | 30-45 sn | Gerçek pilot müşteri: eski sistemi (Excel/defter) göster → geçiş günü → bugünkü rapor ekranı → "ay sonunda muhasebeciye çanta taşımıyorum" cümlesi. CTA: WhatsApp |
| K2 | **"Usta kancası"** (3 rakibin test ettiği kanca + bizim derinlik) | 20-30 sn | Açılış: "Usta, bu Passat'a en son ne yapmıştık?" → kağıt yağ kartı karışıklığı → QR okutma ekranı → araç geçmişi anında karşında. "Ama biz sadece bunu değil, faturasına kadar hallediyoruz" geniş paket vurgusu. CTA: WhatsApp |
| K3 | **Fiyat şeffaflığı + tasarruf** | 20-30 sn | Ekran kaydı + ses: "E-Fatura programına aylık 600 ₺ veren servis, ServisPilot'ta o ücreti ödemiyor. Kurulum bizden, 14 gün ücretsiz. İlk 50 servise sabit fiyat." CTA: WhatsApp |

### 5.2 Kurulum
- Kampanya hedefi: **Etkileşim → WhatsApp mesajları** (Click-to-WhatsApp Ads).
- Hedefleme: İlgi alanları — oto tamir, oto bakım, otomotiv sektörü, tamirci; yaş 28-60; Türkiye geneli (şehir filtresi yok). Benzer kitle başta YOK — veri birikene kadar davranışsal/ilgi alanı.
- Yerleşimler: Instagram Reels + Feed, Facebook Feed. Stories başta kapalı (kreatif formatı ayrı iş).
- Bütçe: **4-5K ₺/ay** → her kreatif 50-60 ₺/gün, hafta başına karar: kötü olanı kapat (CTR < %1 veya mesaj maliyeti > 80 ₺), kazananı ölçekle.
- **60 gün karar kriteri:** WhatsApp mesaj maliyeti < 150 ₺ ve demo dönüşümü > %20 ise ölçekle; değilse kreatifleri yenile (kancaları değiştir), 3. ayda hâlâ olmadıysa bütçeyi Google'a aktar.

---

## 6. Kanal 3 — SEO + İçerik Makinesi (üretim: ben · yükleme: sen)

**Neden:** Organikte zayıf rakip — Google'da DonanımHaber/r10 forumları ve app store sayfaları ilk 3'te dönüyor. Düzenli içerikle 3-6 ayda ilk 3 gerçekçi. Ayrıca "servis takip programı ücretsiz" ve "teknik servis programı excel" arayanlar gerçek alıcı adayları.

### 6.1 Site alt yapısı
- `servispilot.com.tr/blog/` altında statik sayfalar (mevcut HTML+Tailwind yapısına uygun, build gerektirmez). Her yazı: tek H1, TOC, FAQ bloğu (FAQPage schema), iç link → fiyatlandırma/WhatsApp CTA.
- `sitemap.xml` güncelle. Her yazıda `og` görseli (Canva şablonundan 1 dk).

### 6.2 12 haftalık içerik takvimi (haftada 1-2 yazı; sıra = yayın sırası)

| Hafta | Başlık | Hedef kelime |
|---|---|---|
| 1 | **Oto Servis Muhasebe Programı: Eksiksiz Rehber (2026)** — pillar sayfa | oto servis muhasebe programı |
| 1 | Oto Servis Programı Seçerken 7 Kriter | oto servis programı |
| 2 | Excel ile Servis Takibi Neden Zorlar? (Ücretsiz Excel Şablonu + geçiş rehberi) — **lead magnet** | teknik servis programı excel |
| 2 | ServisPilot vs Excel: Gerçek Maliyet Karşılaştırması | servis takip programı excel |
| 3 | 2026 Oto Servis Programları Karşılaştırması (OTO Mix, MYNDOS, Servisbir, Bilsoft, ServisTakipPro…) | oto servis programı karşılaştırma |
| 3 | "Usta, bu araca ne yapmıştık?" — QR Bakım Geçmişi Kurma Rehberi | qr bakım takip |
| 4 | E-Fatura'ya Geçen Oto Servisin Tasarruf Hesabı | oto servis e fatura |
| 4 | Oto Serviste İş Emri Yönetimi: Araç Kabullerinden Faturaya | iş emri takip |
| 5 | Servis Takip Programı Fiyatları 2026: Piyasa Karşılaştırması | servis takip programı fiyatları |
| 5 | Tamirhane Programı Seçenin Bilmesi Gereken 5 Hata | tamirhane programı |
| 6 | Ruhsat OCR Nedir, Servise Saniye Kazandırır | ruhsat okuma programı |
| 6 | WhatsApp Müşteri Onay Portalı: Atölye Hızını Artıran 5 Adım | whatsapp onay |
| 7 | Özel Servisler İçin Bakım Hatırlatma Sistemi (Müşteri Geri Getirme) | bakım hatırlatma sistemi |
| 7 | Oto Serviste Stok/Parça Kaybını Önlemenin 6 Yolu | yedek parça takip programı |
| 8 | Servisbir Ücretsiz Program Yeterli mi? Gizli Maliyet Analizi | servisbir ücretsiz |
| 8 | Oto Servis Açanlar İçin Dijital Kurulum Kontrol Listesi | oto servis açma |
| 9 | Ekspertiz Raporu Nasıl Hazırlanır? (Örnekli) | oto ekspertiz programı |
| 10 | Muhasebeci + Program Uyumu: Cari, KDV ve E-Defter Aktarımı | servis muhasebe entegrasyonu |
| 11 | Oto Serviste Fiyatlandırma: İşçilik ve Parça Marjı Rehberi | oto servis işçilik fiyatları |
| 12 | Servis CRM'i: Eskiden Gelen Müşteriyi Geri Getirme | oto servis müşteri takip |

Her yazının sonunda: "14 gün ücretsiz deneyin (kredi kartı yok)" + WhatsApp butonu + ilgili ekran görüntüsü.

### 6.3 GEO — AI arama görünürlüğü
ChatGPT/Perplexity/Gemini "oto servis programı öner" sorularında görünmek için: içerikler net soru-cevap yapılarında, marka + özellik + fiyat bilgisi açıkça yazılı, FAQPage/SoftwareApplication schema'ları zaten sitede var → blog sayfalarına da eklenecek. Karşılaştırma içeriklerinde rakip isimleri açıkça geçirmek (tablo halinde) AI'ların öneri listelerine girmenin en hızlı yolu.

### 6.4 Google Business Profile
Merkez ofis için GBP aç (kategori: "Yazılım şirketi" + "Bilgisayar destek hizmetleri"). "oto servis programı" yerel aramalarında harita paketine girme şansı. Fotoğraf: ekran görüntüleri + logo. Haftalık 1 gönderi (yeni blog içeriği duyurusu).

---

## 7. Satış Funnel'ı — WhatsApp Süreci

**SLA: Gelen her WhatsApp mesajına < 15 dakikada yanıt.** (Sektör: usta WhatsApp'ta yaşıyor; hız = güven.)

### 7.1 İlk yanıt şablonu
> Merhaba 👋 ServisPilot'a ilgilendiğiniz için teşekkürler! Size en doğru demo için 2 kısa soru: (1) Serviste ayda yaklaşık kaç araç işleniyor? (2) Şu an takibi nasıl yapıyorsunuz — Excel, defter mi, başka program mı?

### 7.2 Akış: Lead → Demo → Deneme → Satış
1. **Niteli** (2 soru) → uygunsuzsa nazikçe yollandır; uygunsa **15 dk demo randevusu** (takvim linki) veya hemen telefon üzerinden 5 dk ekran paylaşımı.
2. Demo sonrası hemen: **"14 gün ücretsiz başlatıyorum, kurulumu biz yapıyoruz — siz bize 5 dakikada müşteri/araç listenizi WhatsApp'tan gönderin, gerisini biz hallederiz."** (Kurulum bizden vaadi burada kapatıyor — sürtünme sıfır.)
3. **Deneme takip akışı:** Gün 1: "Kurulumunuzu yaptık, ilk iş emrini birlikte açalım mı?" · Gün 3: "İlk hafta raporunuz hazır — X araç, Y teklif. Sorunuz var mı?" (kurulmadıysa nedenini sor) · Gün 7: Kullanım videosu (30 sn, özellik bazlı) · Gün 13: "Denemenizin 1 günü kaldı — İlk 50 servis sabit fiyat kampanyası hâlâ geçerli, bağlayalım mı?" · Gün 14: kapanış + ödeme linki.

### 7.3 İtiraz cevapları
| İtiraz | Cevap çerçevesi |
|---|---|
| "Pahalı, rakip 500 ₺" | "Günde 53 ₺. İçinde muhasebe + E-Fatura da var — E-Fatura programına ayrı 400-700 ₺ ödemeyi düşününce farkı kapanıyor. Kurulum ve eğitim bizden." |
| "Muhasebecim var" | "Muhasebecinize iş kolaylaştırıyoruz: cari çıktı, KDV listesi, E-Fatura hazır gider. Ay sonunda çanta taşımazsınız." |
| "Excel'de tutuyorum" | "Excel'e ne yazıldığını kimse kontrol etmiyor; araç geçmişi kayboluyor. QR ile araca bakım geçmişi işliyor, müşteriye WhatsApp'tan onay gidiyor." |
| "Sonra düşünürüm" | "14 gün ücretsiz deneyin — kart bilgisi istemiyoruz, süre bitince otomatik ücret de çekilmez. Kaybetcek hiçbir şey yok." |

---

## 8. 90 Günlük Yol Haritası

| Hafta | İşler |
|---|---|
| **0** | Ön koşullar (bölüm 3): domain, GA4/Clarity, Ads dönüşümü, WhatsApp Business, takvim, 3 referans |
| **1** | Google Ads SP-Core + SP-Muhasebe yayına gir. İlk 2 blog yazısı (pillar + 7 Kriter) yayında. |
| **2** | SP-Kenar açılır. K1 müşteri videosu çekilir (pilot müşteri ziyareti). Referanslar landing'e işlenir. |
| **3** | **Meta testi başlar** (K1+K2). Blog #3-4. İlk arama terimi temizliği + reklam A/B. |
| **4** | K3 fırlatılır. İlk 30 günlük sayım: kanal bazlı lead/CPL raporu → bütçe kaydırma kararı. Blog #5-6. |
| **5-6** | Kazanan Google grubuna bütçe ekle (muhtemelen Core veya Muhasebe). Meta'da kazanan kreatif ölçeklenir. Blog #7-10. |
| **7-8** | **10 müşteri hedefi kontrolü.** İlk vaka çalışması yazılır ("X Servisi 30 günde geçti"). Blog #11-14. |
| **9-10** | Meta'nın 60 günlük kararı (ölçekle/kreatif değiştir/durdur). Ekspertiz/lastik yan kelimeler testi. Blog #15-17. |
| **11-12** | 90 gün raporu: toplam harcama, müşteri, CAC, kanal kârı. 2. çeyrek planı (bütçe 2x ise: Bayi/ortaklık kanalı — Akınsoft bayi ağı modeli — ve YouTube demo serisi). Blog #18-20. |

## 8b. Bütçe Dağılımı (15K ₺/ay orta senaryo)

| Kalem | Aylık | Not |
|---|---|---|
| Google Arama (SP-Core + Muhasebe) | 9.500 ₺ | CPC 2-6 ₺ bandında beklenir |
| Meta video + WhatsApp testi | 4.000 ₺ | 3 kreatif döner |
| Marka koruması + rezerv | 1.500 ₺ | Kazanan kanala haftalık aktarım |
| **İçerik üretimi** | **0 ₺** | Ben üretirim; senin maliyetin = onay/yükleme zamanı |
| Toplam | **15.000 ₺** | Dar senaryo 10K (Google ağırlıklı), geniş 20K (Meta ölçekleme +2K, Google +3K) |

**Hedef birim ekonomi:** CPL (WhatsApp lead) ≤ 200 ₺ → Demo oranı %50 → Deneme oranı %60 → Satış oranı %20 → CAC ≈ 2.500-3.000 ₺ → Yıllık paketle LTV/CAC ≈ 6-7×.

---

## 9. Ölçümleme — Haftalık Dashboard (pazar sabahı, 30 dk)

| Metrik | Kaynak | Hedef |
|---|---|---|
| Tıklama / Gösterim / CTR | Google Ads | CTR > %5 (rekabetsiz nişte) |
| WhatsApp lead (kanal bazında) | GA4 `whatsapp_click` + Ads dönüşümleri | CPL ≤ 200 ₺ |
| Demo yapıldı | WhatsApp etiketleri | Lead → Demo > %50 |
| Deneme başladı | Uygulama kayıtları | Demo → Deneme > %60 |
| Ödeme | Banka | Deneme → Ödeme > %20 |
| Clarity kayıtları | Microsoft Clarity | Haftada 5 oturum izle — landing sürtünme bul |

Her Pazar: sayıları bu tabloya işle + bir karar (bütçe kaydır / reklam durdur / içerik konusu seç).

---

## 10. Rakip İzleme Rutini (aylık, 1 saat)

1. **Apify ile Meta Ad Library kontrolü:** Automasyon, Bilsoft, Seripos, Hermias, Ebakimdefteri, OtoHafıza, bakimqr, ServisTakipPro, ServisiniTakipEt sorgusu → kim yeni reklam açtı, kim kapattı. *(İstenirse bu aylık kontrolü otomatik zamanlanmış görev olarak kurarım.)*
2. **SerpApi ile 12 kelimeyi yeniden tara:** arama reklamlarına yeni giren var mı (özellikle Kursoft/Canbus aramaya dönerse CPC izle).
3. **Organik pozisyon kontrolü:** 20 blog hedef kelimede sitemizin sırası.
4. Rakibin reklamı kapandıysa (EkibimSahada örneği): o kelimelere aynı hafta ek bütçe.

---

## Ek A — Acil Yapılacaklar Listesi (bu hafta)
- [ ] servispilot.com.tr sahipliğini teyit et
- [ ] GA4 + Clarity ID'lerini gir, `whatsapp_click` dönüşümünü Ads'e bağla
- [ ] WhatsApp Business kur (katalog + hızlı yanıtlar + etiketler)
- [ ] Takvim linkini doldur (`js/config.js` → calendar.url)
- [ ] 3 pilot müşteriden referans al (yazılı + video)
- [ ] Google Ads hesabını aç, RSA'ları (bölüm 4.3) kur, yayına al
- [ ] K1 müşteri videosunu planla (pilot müşteri ziyareti)

## Ek B — Kaynak dosyalar
- Rakip reklam ömür analizi: `research/ad_lifespan_report.md`
- Ham veri: `research/raw_auto_*.json`, `research/gads_results.jsonl`, `research/serpapi_results.json`, `research/ig_hashtag.json`
- Landing/analytics altyapısı: `js/analytics.js`, `js/config.js`, `api/chat.js` (chatbot satış bilgi tabanı — WhatsApp script'leriyle senkron tutulmalı)

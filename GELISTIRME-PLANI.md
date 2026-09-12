# ServisPilot Web Sitesi — Geliştirme Planı
> Odak: **Müşteri dönüşümü (CRO)** + **Premium görünüm** · Referans: chatflow.muratify.com · Güncelleme: 2026-09-12
> **Funnel kararı:** Satış WhatsApp hattı (+90 530 992 95 05) + randevu takvimi üzerine kurulacak — kurulumu ekibimiz yapıyor.
> **Simülasyon kararı:** Gerçek sistem sayfaya **bağlanmayacak** — ChatFlow tarzı, kendiliğinden dönen senaryo simülasyonu. Gerçek ekran, müşteri bize ulaştığında **görüşmede bizim tarafımızdan** gösterilir.

---

## 0. Mevcut Durum Tespiti (Kritik Bulgular)

| # | Bulgu | Etki |
|---|---|---|
| 1 | **Funnel hedefi yok:** "14 Gün Ücretsiz Başla" dahil tüm CTA'lar `#fiyatlandirma`'ya (kendi sayfasına) bağlı. | 🔴 Dönüşüm sıfır — en acil sorun |
| 2 | Fiyat kartlarındaki "Başla" butonları da `#fiyatlandirma`'ya kendi kendine bağlı. | 🔴 Kullanıcı tıklıyor ama hiçbir yere gitmiyor |
| 3 | Logo Google-hosted URL'de (`lh3.googleusercontent.com`) — kontrolümüz dışında, her an kırılabilir. | 🟡 Marka riski |
| 4 | Tailwind CDN sürümü kullanılıyor (production için önerilmez, ilk yüklemede FOUC/stil gecikmesi). | 🟡 Hız + premium algı |
| 5 | Canlı Kokpit statik: butonlar tek tıkla tek değişiklik yapıyor, akış anlatmıyor. | 🟡 Demo gücü düşük |
| 6 | Ölçüm yok: analytics, heatmap, dönüşüm takibi yok. | 🔴 Optimize edilemez |

**Not — Yıllık paket:** Fiyat bölümü **hâlihazırda yıllık ödemeyi varsayılan** gösteriyor (1.500 ₺ + üstü çizili 2.000 ₺). Plan boyunca bu varsayılan **korunacak ve güçlendirilecek** (bkz. Faz 1.5).

---

## ★ Satış Funnel'ı — WhatsApp Öncelikli + Randevu Takvimi (KARAR)

**Model:** Paketler sitede sergilenir → satın alım talebi **WhatsApp hattından** gelir → **kurulumu ekibimiz yapar**. İstersen ziyaretçi takvimden **15-20 dk görüşme** planlar.

```
Ziyaretçi
  ├─► Hero / Canlı Kokpit 2.0   (değer + kanıt)
  ├─► Fiyatlandırma             (paketler sergilenir, yıllık varsayılan)
  │       ├─► [WhatsApp'tan Başla]  → wa.me/905309929505 (konuma özel öndoldurulmuş mesaj)
  │       └─► [Görüşme Planla]      → randevu takvimi (gömülü bölüm / popup)
  └─► Ekip: WhatsApp'tan dönüş → kurulumu tamamen kendisi yapar
```

**Uygulama kararları:**

1. **Tek satış kanalı:** `https://wa.me/905309929505` — tüm satış WhatsApp bağlantıları bu numaraya, boşluksuz formatta. (Footer'daki mevcut link zaten doğru; diğeri düzeltilecek.)
2. **Konuma göre öndoldurulmuş mesaj** (ekip talebin nereden geldiğini anlar):

   | Konum | Mesaj |
   |---|---|
   | Header + Hero CTA | "Merhaba, ServisPilot 14 günlük ücretsiz denemeyi başlatmak istiyorum." |
   | Kokpit 2.0 sonundaki CTA | "Merhaba, kokpiti denedim; kendi atölyem için kurulum görüşmek istiyorum." |
   | Starter kartı | "Merhaba, Starter paketi (₺1.150/ay) için kurulum talep ediyorum." |
   | Professional kartı | "Merhaba, Professional paketi (₺1.500/ay) için kurulum talep ediyorum." |
   | Sticky bar | "Merhaba, ücretsiz deneme hakkında bilgi almak istiyorum." |

3. **Buton metinleri premium kalsın, mikro kopya eklensin:** Kart butonu "14 Gün Ücretsiz Başla" olarak kalır; altına *"Kurulumu ekibimiz yapar — WhatsApp'tan yazmanız yeterli"* satırı gelir. Manuel kurulum engel değil, **satış argümanı** olarak konumlanır ("Sizin için biz kurarız, 15 dakikada hazır").
4. **Randevu takvimi:** Cal.com veya Calendly üzerinde 15 dk'lık **"Ücretsiz Kurulum Görüşmesi"** (TR çalışma saatleri). Sayfada fiyat bölümünün altında **"Bizimle Görüşün"** bölümü olarak gömülür; sticky bar ve hero'dan popup olarak da açılır. Widget lazy-load edilir (sayfa hızını bozmaz). Öneri: Calendly (en hızlı kurulum, TR'de yaygın) — Cal.com ücretsiz alternatif.
5. **Ölçüm:** `whatsapp_click` (konum etiketi: header / hero / starter / pro / kokpit / sticky / footer) ve `calendar_open` / `booking_completed` olayları funnel raporuna bağlanır.

---

## 1. Faz 0 — Ölçüm ve Temel Altyapı (1. hafta)

Dönüşüm çalışması ölçümsüz yapılamaz. Önce ölçüm, sonra iyileştirme.

1. **Analytics kurulumu:** GA4 veya Plausible (gizlilik dostu, hızlı) + **Microsoft Clarity** (ücretsiz heatmap + session recording).
2. **Dönüşüm olayları tanımla:** `whatsapp_click` (konum etiketiyle), `calendar_open`, `booking_completed`, `pricing_toggle`, `plan_cta_click`, `cockpit_interaction`, scroll derinliği (%25/50/75/100).
3. **Production build'e geçiş:** Tailwind CDN → `tailwindcss` CLI ile derlenmiş tek CSS dosyası (hedef: LCP < 2 sn). Görseller WebP + `loading="lazy"`.
4. **Marka varlıkları lokalize:** Logo kendi sunucumuzda (`assets/logo.svg` + `.png`), favicon, OG paylaşım görseli (WhatsApp'ta link paylaşıldığında premium kart çıkar).
5. **Yasal sayfalar:** KVKK Aydınlatma Metni, Gizlilik, Kullanım Şartları (footer linkleri boş — doldurulmalı). Kurumsal müşteriler bunu kontrol eder.

## 2. Faz 1 — Dönüşüm (CRO) Hız Kazanımları (1-2. hafta)

Sıralama etkisine göre: en yüksek etkiden düşüğe.

1. **WhatsApp funnel'ını bağla (EN KRİTİK):** Funnel kararlarına göre tüm CTA'ları `wa.me/905309929505`'e, konuma göre öndoldurulmuş mesajla bağla. Hiçbir buton boşa dönmesin.
2. **Randevu takvimini ekle:** Fiyat bölümü altına gömülü "Bizimle Görüşün" bölümü (15 dk Ücretsiz Kurulum Görüşmesi) + hero/sticky'den popup.
3. **Mobil sticky CTA bar:** Alt sabit şerit — `[WhatsApp'tan Başla]` `[Görüşme Planla]`. Mobil trafiğin çoğu buradan dönüşür.
4. **Risk azaltma bloğu hero altına:** "Kredi kartı gerekmez · **Kurulumu ücretsiz biz yapıyoruz** · İstediğiniz an iptal".
5. **Fiyatlandırma güçlendirme (yıllık varsayılan korunur):**
   - Yıllık sekmesine "ÖNERİLEN" mini rozeti.
   - Her iki kartın CTA'sı WhatsApp'a bağlanır; buton altına "Kurulumu ekibimiz yapar" mikro kopyası.
   - **3. sütun alternatifi:** "Kurumsal / Yetkili Servis" kartı → "Özel teklif için WhatsApp'tan yazın".
   - ChatFlow'daki gibi **tam karşılaştırma tablosu** (iki planın özellikleri yan yana) — karar süresini kısaltır.
   - **ROI hesaplayıcı:** "Ayda kaç iş emri? Kaç parça kaybınız oluyor?" → yıllık tasarruf tahmini; sonuç ekranında "Bu tasarrufu WhatsApp'tan konuşalım" CTA'sı.
6. **Sosyal kanıt artırımı:** Gerçek servis logoları şeridi (marquee), Google Puanı bileşeni, 1 video referans (30-60 sn, telefonla çekilmiş yeterli).
7. **CTA metni A/B testi:** mevcut "14 Gün Ücretsiz Başla" ↔ "WhatsApp'tan Hemen Başla" ↔ "Ücretsiz Görüşme Planla". Clarity + olay verisiyle karar.
8. **Güven sinyalleri:** Fiziksel adres + vergi numarası footer'a.

## 3. Faz 2 — Canlı Kokpit 2.0: ChatFlow Tarzı Senaryo Simülasyonu (2-5. hafta)

### ChatFlow nasıl yapıyor? (İnceleme sonucu)
chatflow.muratify.com'daki demo **gerçek uygulama ekranı değil** — ürünün arayüzünü birebir taklit eden, **kodla yazılmış otomatik oynayan bir simülasyon**:
- Konuşmalar kendiliğinden oynar (mesajlar tek tek belirir, "yazıyor…" animasyonu, saatler, çift tikler)
- Kullanıcı senaryo seçebilir ("Canlı demo: konuşma seçin, akış kendi devam eder")
- Kullanıcı istediği an dokunup devralır, sağa kaydırıp geri sarar
- Telefon mockup'ı içinde WhatsApp sohbeti — ürünün değeri hissedilir

### ServisPilot için uygulama: "Kokpit 2.0 — Canlı Senaryo Simülasyonu"
**KESİNLEŞTİ: Gerçek sistem bağlanmayacak.** Özel kodlanmış, uygulama arayüzünü birebir yansıtan, senaryoları **kendiliğinden dönen** simülasyon. Ziyaretçi hiçbir şey çözmek zorunda değil — izler, isterse dokunup devralır. Gerçek sistemi biz, bize ulaştıklarında görüşmede canlı gösteririz.

1. **Senaryo seçici (chatflow'daki "konuşma seçin" karşılığı):**
   - `🚗 Araç Kabul + Ruhsat OCR` · `👨‍🔧 Usta Kokpiti` · `📦 QR Parça Takibi` · `💬 WhatsApp Onay + GİB Fatura`
   - Veya tek "Bir Günün Özeti" senaryosu: kabulden faturaya 60 sn'lik otomatik akış.
   - **Otomatik döngü:** Ziyaretçi seçim yapmazsa varsayılan senaryo kendiliğinden oynar, bitince sıradakine geçer — chatflow'daki "konuşmalar kendiliğinden oynar" davranışının aynısı.
2. **Otomatik oynatma (auto-play):**
   - Plaka yazılır → ruhsat "taranıyor" progress animasyonu → alanlar tek tek kendiliğinden dolar (typing efekti)
   - Parçalar QR okutulmuş gibi satır satır eklenir, toplam güncellenir
   - **Telefon mockup'ında WhatsApp onay sohbeti canlanır:** müşteri bubbles'ı, öncesi/sonrası fotoğraf kartı, "Onaylandı ✓" durumu — chatflow'un en güçlü anı, birebir uygulanır
   - Fatura kesilir → "GİB Onayladı" damgası animasyonla basılır
3. **Devralma (chatflow'daki "dokunup devralın"):** Kullanıcı istediği an otomatik akışı durdurup butonlara kendisi basar; "Yeniden Oynat" ve "Kendin Dene" kontrolü.
4. **İlerleme çubuğu:** Üstte 4 adımlı timeline, otomatik akışta adımlar yanar.
5. **Funnel köprüsü:** Simülasyon sonunda "Bu ekranı kendi atölyenizde deneyin →" → **WhatsApp (kokpit mesajı)** + yanında "Ya da 15 dk görüşme planlayın" (takvim).

### Yol kararı (kesinleşti)

| Yol | Karar | Gerekçe |
|---|---|---|
| **A. Özel kodlu senaryo simülasyonu** (yukarıdaki) | ✅ **Yapıyoruz** | ChatFlow ile aynı yaklaşım: senaryolar kendiliğinden döner, ziyaretçi hiç uğraşmaz. Tam kontrol, hızlı, SEO uyumlu. |
| B. Gerçek app sandbox embed | ❌ **Vazgeçildi** | Ziyaretçi sistemi kendi çözmeye kalkarsa takılır ve **almaktan vazgeçer**. Gerçek sistemi biz, bize ulaştıklarında (WhatsApp/randevu görüşmesinde) canlı gösteriyoruz. |
| C. Arcade/Navattic gibi kayıt platformları | ❌ Tercih edilmez | Aylık ücret, jenerik görünüm, premium hissi düşük. |

**Funnel uyumu:** Kokpit 2.0'ın görevi eğitmek değil, **ikna etmek**. Otomatik senaryo meraklandırır → "bunu ben de istiyorum" hissi yaratır → CTA'dan WhatsApp'a (kokpit mesajıyla) veya randevu takvimine taşır → gerçek sistem ekranını **biz görüşmede canlı gösteririz**.

**v2 yükseltmesi (kararlaştırıldı):** Simülasyonun görsel tabanı **gerçek sistem ekran görüntülerine** taşınıyor — kodlu animasyonlar (imleç, spot ışığı, açıklama çipleri, canlı sohbet) görüntülerin ÜSTÜNE biner. Böylece arayüz birebir gerçek olur, bakım maliyeti düşer, "kendiliğinden oynar" deneyim korunur. Çekim listesi: `raporlar/08-gercek-ekran-simulasyonu.md`.

**Teknik not:** Mevcut kokpit bölümü ayrı bir `demo/` modülüne taşınır; senaryo motoru (`js/demo-engine.js`) adım adım JSON senaryo tanımıyla çalışır (kolay genişletilebilir).

## 4. Faz 3 — Premium Görünüm Yükseltmesi (3-6. hafta)

21st.dev MCP workspace'e eklendi — premium bileşen desenleri buradan referans alınacak.

**stoaix.com referansı (kullanıcı beğendi) — sitede benimsenecek desenler:**
1. **Logo/uyum şeridi:** Hero altına kayan marquee — "Uyumlu: GİB E-Fatura · WhatsApp Business · Google Haritalar…" (varsa işletme ortakları logoları)
2. **"ServisPilot Nedir?" tanım bölümü:** 2-3 cümle + mini görsel, hero'nun hemen altı
3. **Döner hedef kitle metni:** "Özel servisler için. Yetkili servisler için. Oto elektrik için. Kaporta-boya için." (stoaix'in rotating text deseni)
4. **ROI hesaplayıcı** (Faz 1.5'te zaten var — stoaix'teki gibi sonuçta yıllık kayıp/tasarruf göster, hemen altına CTA)
5. Numaralı "Nasıl çalışır" adımları — mevcut "60 Saniyede" bölümüyle birleştirilir

1. **Hero yükseltmesi:**
   - Kelime kelime fade-in başlık, gradient shimmer
   - Arkaplanda ince grid/glow animasyonu (mevcut blur'lar rafine edilir)
   - Sağda/altta canlı mini istatistik şeridi (sayaç animasyonu: 500+ servis, ₺180M+ hacim)
2. **Scroll deneyimi:** Bölümler içeri girerken yumuşak reveal (IntersectionObserver), kartlarda hafif tilt/glow hover.
3. **Bento grid:** 6 özellik kartı → asymetrik bento düzeni (1 büyük + 5 küçük), her kartta mini görsel/animasyon. Premium sitelerin imza deseni.
4. **Gerçek fotoğraf içerik:** Atölye/lift/usta fotoğrafları (stok değil). En az 6-8 kare: kabul, OCR çekimi, usta kokpiti, WhatsApp onay anı.
5. **Testimonial slider:** 2 statik kart → otomatik dönen, yıldız + fotoğraflı sosyal kanıt bileşeni.
6. **Tipografi & mikro detay:** Sayısal değerlerde `font-variant-numeric: tabular-nums`, tutarlı 8px spacing sistemi, ince 1px border + soft glow dengesi.
7. **Video (opsiyonel ama güçlü):** Hero'da 30 sn sessiz oynatılan ürün turu videosu (Kokpit 2.0 simülasyonundan kayıt bile olabilir).
8. **Paylaşım kartı:** OG image — koyu zemin + amber "ServisPilot" + "60 saniyede kabulden faturaya" sloganı.

## 5. Faz 4 — İçerik & SEO (4-8. hafta)

1. **Teknik SEO:** `sitemap.xml`, `robots.txt`, FAQPage + Product + Organization schema (zengin sonuç), Core Web Vitals bütçesi.
2. **Yerel/niş anahtar kelimeler:** "oto servis yönetim programı", "servis takip programı", "oto tamirci programı" sayfa başlıkları ve içerik.
3. **Blog başlangıcı (ayda 2 içerik):** "Defterle servis yönetmenin 7 gizli maliyeti", "GİB e-fatura geçişi rehberi", "QR parça takibi nasıl kurulur".
4. **Karşılaştırma sayfası:** Excel/Defter vs ServisPilot; geleneksel entegratör vs yerleşik GİB.
5. **Hizmet bölgesi sayfaları (opsiyonel):** İstanbul Atölyeleri için ServisPilot vb.

## 6. Faz 5 — Sürekli Optimizasyon Döngüsü (devamlı)

- Haftalık: Clarity heatmap + session recording incelemesi → 1 iyileştirme
- Aylık: funnel raporu (görüntüleme → kokpit etkileşimi → fiyat → **WhatsApp/randevu** → kurulum)
- A/B test kuyruğu: hero başlık, CTA metni, fiyat düzeni, takvim konumu

---

## Öncelik Matrisi (Efor × Etki)

| Aksiyon | Efor | Dönüşüm Etkisi | Sıra |
|---|---|---|---|
| WhatsApp funnel + randevu takvimi bağlantısı | Düşük-Orta | 🔥🔥🔥🔥🔥 | **1** |
| Analytics + Clarity | Düşük | 🔥🔥🔥🔥 (ölçüm altyapısı) | **2** |
| Mobil sticky CTA | Düşük | 🔥🔥🔥🔥 | **3** |
| Yıllık varsayılan korunumu + karşılaştırma tablosu | Düşük | 🔥🔥🔥 | **4** |
| Kokpit 2.0 (chatflow tarzı simülasyon) | Yüksek | 🔥🔥🔥🔥🔥 (uzun vade) | **5** |
| ROI hesaplayıcı | Orta | 🔥🔥🔥🔥 | **6** |
| Bento grid + animasyonlar + gerçek fotoğraf | Orta | 🔥🔥 (premium algı) | **7** |
| SEO + içerik | Sürekli | 🔥🔥🔥 (uzun vade) | **8** |

## Araçlar
- **21st.dev MCP** (workspace'e eklendi — ZCode yeniden başlatıldığında oturuma bağlanır): premium bileşen desenleri; sticky bar, randevu bölümü ve Faz 3 premium bileşenlerinde aktif kullanılacak
- Randevu takvimi: **Calendly** (öneri) veya Cal.com — 15 dk "Ücretsiz Kurulum Görüşmesi"
- Microsoft Clarity (ücretsiz), GA4/Plausible
- Tailwind CLI (production CSS)

## Sonraki adım önerisi
Faz 0 + Faz 1'in 1-3. maddeleri tek seferde uygulanabilir: **WhatsApp funnel bağlantıları, randevu takvimi bölümü, mobil sticky bar, analytics, logo lokalizasyonu.** Onay verilirse başlanır.

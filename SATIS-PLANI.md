# ServisPilot — Satış Planı (0 → 10 Müşteri)
*Oluşturma: 13 Eylül 2026 · Bağlantılı dokümanlar: `PAZARLAMA-PLANI.md` (genel strateji), `research/ad_lifespan_report.md` (rakip verisi), `AGENTS.md` (proje indeksi)*

## Güncel durum (13 Eyl 2026 itibarıyla)
- **Ödeme yapan müşteri: 0**
- **Denemede: 1** — Gençler Oto (demo sürümü)
- Mevcut yöntem: Google Maps'ten işletme bulup arama
- Operasyon kısıtı: Hafta içi 11:00-19:00 okulda (bkz. bölüm 6)

## 1. Bir numaralı görev: Gençler Oto'yu kapat

Yeni lead aramaktan değerli tek şey eldeki demoyu ödemeye çevirmek. Kapanan ilk müşteri şunları verir: para + kanıt + isimli referans + K1 video kreatifi + landing yorumu.

Haftalık adımlar:
- [ ] Kurulumu biz yap: cari/stok verilerini yükle, 1-2 iş emrini birlikte gir
- [ ] Gün 3 ve 7: kullanım kontrolü + mikro eğitim
- [ ] Gün 10-13 kapanış: "İlk 50 özel servise sabit fiyat hâlâ geçerli" + **günde 53 ₺ çerçevesi** (1.599₺/30)
- [ ] Ödeme sonrası aynı gün: 3 cümlelik referans + isim/şehir kullanım izni + 30 sn video

## 2. Outbound sistemi (Maps kaynaklı temaslar)

### Kanal merdiveni (sırayla)
1. **WhatsApp mesajı** — sabah okuldan önce toplu gönder (mesaj kalıcı, usta akşam okur)
2. 2 gün cevap yok → **akşam 19:30-21:00 arası ara**
3. Aynı şehirdeyse → **cumartesi sabahı sanayi ziyareti** (tablet + canlı demo, 10 dk). 20 yüz yüze > 200 soğuk arama (Akınsoft bayi modeli).

### Mesaj şablonları

**İlk mesaj:**
> Merhaba, [İşletme Adı]'nı Google'da gördüm, [şehir]'de özel servis olarak yolunuzu takip ediyoruz 👋 Biz servislere özel bir program geliştirdik: ruhsatı okutunca iş emri açılıyor, parçalar QR ile takip ediliyor, fatura programdan çıkıyor. 14 gün ücretsiz deniyorsunuz, kredi kartı istemiyoruz, kurulumu biz yapıp geliyoruz. 2 dakikalık kısa videoyu attım bakmak ister misiniz?

**Takip (2 gün sonra):**
> [İsim] Bey merhaba, dünkü mesajım hakkında kısa sorayım: şu an iş takibini nasıl yapıyorsunuz — defter mi, Excel mi? [Şehir]'deki bir servis geçen ay sadece fatura işlemleriyle ayda ~600 ₺ tasarruf etti. 15 dakikada canlı göstereyim, uygun olduğunuz bir akşam var mı?

### Kota ve huni matematiği
- Kota: **haftada 30-40 yeni işletme teması** (günde 5-6, akşam bloğunda)
- Huni: 100 temas → 25-30 sohbet → 8-10 demo → 3-4 deneme → 1-2 ödeme
- **10 müşteri ≈ 8-10 hafta sistematik çalışma**

### Takip tablosu (zorunlu sütunlar)
`İşletme | Şehir | Telefon | Kanal | Durum(Yeni/Sohbet/Demo/Deneme/Kapandı/Pas) | Sonraki adım | Tarih`

Kaçırılan takip = en büyük kayıp. Her tema bu tabloya girer.

## 3. Asenkron demo (okul saatine çözüm)

Ürünün **2 dakikalık ekran kaydını** bir kez çek; her lead'e WhatsApp'tan gönder. Usta akşam kendisi izler, demo senin mesain olmadan döner. İçerik sırası: ruhsat OCR → iş emri → QR parça → WhatsApp onay → E-Fatura.

## 4. Reklamın yeri

**Reklam, Gençler Oto ödeme yaptıktan ve referans alındıktan sonra başlar.** Darboğaz lead hacmi değil, akşam yanıt kapasitesi — cevaplanamayan reklam lead'i para yakmaktır. İlk müşteri kapanınca `PAZARLAMA-PLANI.md` bölüm 4'teki Google Ads planı devreye girer.

## 5. SLA düzeltmesi (PAZARLAMA-PLANI.md 7. bölümü geçer)

- Eski hedef "<15 dk" → **gerçekçi standart: gündüz gelen mesaja aynı akşam 19:00-22:00 arası dönüş**
- WhatsApp Business away mesajı: "Dönüşlerimiz hafta içi 19:00-23:00 ve hafta sonu."
- Site chatbot'u (Pilot Asistan, `api/chat.js`) gündüz ilk hat: 2 nitelik sorusu sorup numara+not toplar

## 6. Çalışma saat modeli (okul 11:00-19:00)

| Blok | İş |
|---|---|
| Sabah 07:30-10:45 | Gece WhatsApp'ları, taslak onayları, günlük reklam kontrolü |
| Okul 11:00-19:00 | Otomatik: reklamlar + chatbot lead toplama + (kurulursa) zamanlanmış içerik üretimi |
| Akşam 19:30-22:30 | Ana satış bloğu: yanıtlar, demolar, aramalar (usta da o saatte müsait) |
| Hafta sonu | Video çekimleri (K1-K3), Pazar 30 dk KPI, gelecek hafta onayı |

Vaktin dağılımı: %70 WhatsApp satışı, %20 içerik/video onayı, %10 reklam bakışı. Reklam hesabında günlük oynama yok — haftada bir karar.

## 7. Bekleyen otomasyon teklifleri (onay bekliyor — kurulmadı)

1. Hafta içi 09:00 günlük içerik draft görevi
2. Cuma 18:00 haftalık rapor (reklam + rakip + öneriler)
3. Ayın ilk haftası rakip reklam ömür kontrolü (Apify)

Kullanıcı "kur" derse `CronCreate` ile kurulur.

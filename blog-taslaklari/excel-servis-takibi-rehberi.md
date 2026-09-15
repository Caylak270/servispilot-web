<!--
TASLAK NOTU (yayında silinir)
- Tür: Destek yazısı (sp-article: 1.200-1.600 kelime bandı)
- Hedef kelime: teknik servis programı excel
- Kanca: "Excel'i ve defteri bırak." (PAZARLAMA-PLANI.md 2.3, kanca #2)
- Yayın öncesi yapılacaklar:
  1. "doğrulanmalı" notlarını çöz (özellik iddiaları + ekran görüntüsü)
  2. Ortadaki ekran görüntüsünü assets/shots/ altından seç
  3. FAQ bloğu FAQPage JSON-LD'ye birebir taşınacak (sp-article iskeleti)
  4. HTML dönüşümü + canonical: https://www.servispilot.com.tr/blog/excel-servis-takibi-rehberi/
-->

# Meta description önerisi (149 krk)

> Teknik servis programı excel arayanlar için: Excel'in gizli maliyetleri, ücretsiz servis takip şablonu ve bulut programa geçişin 5 adımı bu rehberde.

---

# Excel ile Servis Takibi Neden Zorlar? Ücretsiz Şablon + Programa Geçiş Rehberi

Google'a "teknik servis programı excel" yazan biri genelde iki kampedir: Ya Excel'le idare eden bir servis sahibidir ve "Bir düzen kuralım artık" diyordur, ya da Excel'i denemiş ve zorlandığını görmüştür. İkisinde de sorun aynı: Excel hesap tablosu olarak mükemmeldir ama servis işi hesap tablosu değildir. Telefonda güncellenmesi, arıza geçmişini hatırlaması, faturayla konuşması gerekir — Excel bunların hiçbirini doğal yapmaz.

Bu rehberde önce Excel'in sessiz ama gerçek maliyetlerini sayacağız, sonra bugün kullanabileceğin ücretsiz bir servis takip şablonu vereceğiz. Son olarak da "Excel'e devam mı, programa geçiş mi?" sorusunu cevaplayıp geçişi 5 adımda anlatacağız. Özet cümlemiz bellidir: Excel'i ve defteri bırak — ama doğru zamanda, doğru sırayla.

> **İlgili içerik:** Excel'i bırakmaya hazırsan ServisPilot'u **14 gün ücretsiz** deneyebilirsin — kredi kartı yok, kurulum bizden. **[WhatsApp'tan yaz →](https://wa.me/905309929505?text=Merhaba,%20ServisPilot'u%2014%20g%C3%BCnl%C3%BCk%20%C3%BCcretsiz%20denemek%20istiyorum.)**

## İçindekiler

1. [Excel ile Servis Takibinin 5 Gizli Maliyeti](#excel-ile-servis-takibinin-5-gizli-maliyeti)
2. [Ücretsiz Excel Servis Takip Şablonu](#ücretsiz-excel-servis-takip-şablonu)
3. [Ne Zaman Excel'den Programa Geçmeli?](#ne-zaman-excelden-programa-geçmeli)
4. [Excel vs Bulut Servis Programı: Karşılaştırma](#excel-vs-bulut-servis-programı-karşılaştırma)
5. [Excel'den Programa Geçişin 5 Adımı](#excelden-programa-geçişin-5-adımı)
6. [Sık Sorulan Sorular](#sık-sorulan-sorular)

## Excel ile Servis Takibinin 5 Gizli Maliyeti

Excel'in lisansı belki bedava ya da "şimdiden ödenmiş" geliyor. Asıl masraf başka yerde. Beş yıl üst üste servis defteri tutmuş bir ustanın gözünden bakalım:

### 1. Hata maliyeti: Tek yanlış formül, telafisi zor bir güven

Excel'de tek bir hücreye yanlış tutulan toplama formülü, ay sonunda müşteriye kesilen tutarı değiştirir. Ustanın dilinde bu, anahtar takımıyla çalışıp çekiçle vurmaya benzer: iş yapılır ama doğru aletle yapılmamıştır. Fatura tutarı, KDV hesabı ya da parça kalemi kaydırdığında müşteri bunu fark eder ve fark ettiğinde konuşulan artık işçilik değil, dikkat olur.

### 2. Zaman maliyeti: Her akşam yarımdan fazla saat

İş emri kağıdı yağ kartına yazılır, akşam Excel'e taşınır, ay sonu muhasebeciye gönderilmek için düzeltilir. Aynı bilgi üç kez elle yazılır; her elle yazılış bir hata şansı ve bir zaman kaybıdır. Bu sürenin aylık toplamı servisin büyüklüğüne göre değişir — ama yönü hep aynıdır: senin vaktin, klavyeye giden araçtan çalınır.

### 3. Bilgi tek kişiye sıkışır

Dosya usta bilgisayarındaysa, usta serviste değilken kimse "bu araç için hangi yağ konmuştu" sorusunu cevaplayamaz. Müşteri telefonla arar, teknisyen cevap veremez, usta yolda araçtan uzaktan bağlanmaya çalışır. Bilgi sistemde değil, bir insanın başındaysa o servis tek çivilere asılı köprü gibidir: çivilin biri çıkarsa her şey yere düşer.

### 4. Telefonda çalışmaz — ve işin yarısı telefondan döner

Müşteri WhatsApp'tan fotoğraf atar, usta araç başındadır, plakayı yazarak sorgulamak gerekir. Excel dosyası telefonlarda düzgün açılmaz; açılsa bile yazılabilir değildir. Oysa bakım geçmişi tam da o anda, kaldırıcının dibinde lazımdır.

### 5. Fatura ve muhasebe ayrı kapıya taşınır

Excel servis takibi yapar ama e-Fatura kesemez. Bu yüzden servisler ayrı bir e-Fatura programına ya da aracıya para öder — piyasadaki aracı/yazılım ücretleri aylık 400-700 ₺ bandında seyrediyor (PAZARLAMA-PLANI fiyat benchmark'ı, Eylül 2026). Yani "bedava" dediğin Excel, fatura tarafında ayda yüzlerce liraya mal oluyor. Üstüne ay sonunda muhasebeciye giden kağıt yığını da cabası.

## Ücretsiz Excel Servis Takip Şablonu

"Tamam ama bugün elimde ne var?" dersen, işte düzenli bir servis takip tablosunun olması gereken sütunları. Excel'e kopyala, başla:

| Sütun | Ne yazılır | Neden lazım |
|---|---|---|
| Tarih | Aracın girişi | İş sırası ve garantisi için |
| Plaka | Aracın plakası (aynı formatla) | Geçmiş sorgusunun anahtarı |
| Müşteri adı + telefon | Ad ve WhatsApp numarası | Onay ve bilgilendirme |
| Araç | Marka / model / yıl | Parça ve filtre eşleşmesi |
| Kilometre | Giriş kilometresi | Bakım aralığı takibi |
| Yapılan işlem | Yağ, balata, muayene vb. | "Bu araca ne yapmıştık?" cevabı |
| Parça kalemleri | Parça adı + adet | Ay sonu stok ve maliyet |
| İşçilik | Tutar | Fatura dayanağı |
| Toplam (KDV dâhil) | Formülle otomatik | Elle toplama hatasını önler |
| Durum | Bekliyor / Onay bekliyor / Tamam / Teslim edildi | Filtrelenebilir liste (Veri Doğrulama ile açılır liste yap) |
| Teslim tarihi | Müşteriye söz verilen gün | "Hazır mı?" telefonunu azaltır |
| Not | Müşterinin özel isteği | Gelecek ziyarette hatırlanır |

Şablonda üç pratik kural: plakayı hep aynı formatta yaz (büyük harf, boşluksuz), "Durum" sütununu açılır liste yap, ay sonunda dosyayı hem bilgisayara hem bulut depolamaya (Google Drive, Dropbox vb.) kaydet.

Bu şablon Excel'in yapabildiğinin sınırıdır — ve dürüst olalım, bu sınır çoğu servisi hemen rahatlatır. Sorun şablonda değil, Excel'in o tabloyu yaşayan bir sistem yapamamasında başlar.

## Ne Zaman Excel'den Programa Geçmeli?

Excel'i bugün bırak demek herkes için doğru değil; kepenk açan 2-3 araçlık bir servise yazılım gereksizdir. Aşağıdaki işaretlerden üçünü işaretliyorsan, geçiş zamanı gelmiş demektir:

- **Aynı bilgiyi iki kez yazıyorsun.** Kağıda yazıp akşam Excel'e taşıyorsan, zaten yarısı programın işini yapıyorsun demektir.
- **"Usta, bu araca ne yapmıştık?" sorusu cevapsız kalıyor.** Cevabı bulmak için dosyayı açıp arama yapman gerekiyorsa, geçmişin hafızası yok demektir.
- **Birden fazla kişi aynı dosyayı açıyor.** İki teknisyen + usta aynı Excel'e yazarken birinin kaydı ezilir; dosya kilitlenir, "kim kaydetti bunu" kavgası başlar.
- **Müşteri onayı WhatsApp'tan dönüyor ama kaydı tutmuyorsun.** "Fren balatası değişsin, 4.500 ₺" diye yazdığın onay, iki ay sonra anlaşmazlığa dönüşebiliyor.
- **Fatura ve muhasebe ayrı programlarda yürüyor.** Servis takibi Excel'de, e-Fatura başka yerde, ay sonu mutabakat ustada: üç ayrı yerde tutulan rakam, eninde sonunda tutarsızır.

Bu tabloda ServisPilot'un konumu net: iş emri, QR bakım geçmişi, WhatsApp onayı ve **GİB E-Fatura tek programda** — ayrıca yukarıda saydığımız aracı ücreti (aylık 400-700 ₺) ServisPilot'ta 0 ₺.

## Excel vs Bulut Servis Programı: Karşılaştırma

| Özellik | Excel | Bulut servis programı (ör. ServisPilot) |
|---|---|---|
| Başlangıç maliyeti | Yok gibi (Office lisansı hariç) | Aylık abonelik (1.599-2.399 ₺/ay bandı; yıllıkta günde ~53 ₺) |
| Telefonda kullanım | Zor, çoğunlukla salt okunur | Tarayıcıdan tam kullanım |
| Aynı anda çok kişi | Dosya kilitlenir, kayıt ezilir | Herkes eşzamanlı yazar |
| Bakım geçmişi | Elle arama (Ctrl+F) | Plaka/QR ile anında |
| WhatsApp onay kaydı | Dışarıda, telefon hafızasında | İş emrine bağlı, izlenebilir |
| e-Fatura | Yok, ayrı program/aracı gerekir | Yerleşik (GİB Entegratör üzerinden) |
| Yedekleme | Senin disiplinine bağlı | Otomatik (bulutta) |
| Kurulum | Yok | Yok — hesap açılır, veri aktarılır |
| Uygun olduğu aşama | Yeni açılan, çok küçük servis | Aylık düzenli araç trafiği olan her servis |

Tablodan çıkan özet şu: Excel sıfır maliyetle başlar, ama servis büyüdükçe maliyeti zaman, hata ve ayrı yazılımlar üzerinden geri ödetir. Bulut programın aboneliği görünür bir giderdir; karşılığında ise iş emrinden faturaya tek hat gider.

*(Not: karşılaştırmadaki özellik satırları ServisPilot'un mevcut özellik listesiyle birebir teyit edilmeli — özellikle "WhatsApp onay kaydı" ve "QR ile geçmiş" satırları. → doğrulanmalı)*

## Excel'den Programa Geçişin 5 Adımı

Geçişin acı olduğunu biliyoruz — o acı, geçişin yanlış yapıldığından geliyor. Doğru sıra şöyle:

### 1. Veriyi topla, temizle

Mevcut Excel'den üç şeyi ayır: müşteri listesi (ad + telefon), araç listesi (plaka + marka/model) ve son 12 aylık işlem geçmişi. Plaka formatlarını tekilleştir. Eski dosyanın tamamını taşımaya çalışma — "2019'daki yağ değişimi" geçmiş taşınamaz, arşivde kalsın.

### 2. Önce tek iş akışını taşı

Hepsi birden denenmez. İlk hedef: iş emri açma ve durum takibi. Bir hafta boyunca yeni gelen araçlar sadece programda iş emriyle açılsın; parça stoğu ve faturalama ikinci haftaya kalsın. Sıra bozulursa ekip ikisine de soğur.

### 3. Bir hafta paralel yürüt

Eski Excel + yeni program bir hafta birlikte çalışsın. Amaç yedekleme değil, güven: teknisyen programda plaka sorgulayıp geçmişi gördüğünde "işe yarıyor" inancı kendiliğinden kurulur. Hafta sonunda Excel'e "salt okunur arşiv" etiketi yapıştır.

### 4. Ekibi ve QR'ı devreye al

Her teknisyene tek cümlelik eğitim yeter: "Plakayı yaz, geçmişi gör, işlemi iş emrine işle." Araç camlarına/radyatör ızgarasına bakım geçmişi QR etiketi yapılacaksa, bu adımda yapıştırılır — böylece müşteri de "bu araca ne yapmıştık" sorusunun cevabını görebilir. *(QR etiket uygulaması kapsamı ürün tarafında teyit edilmeli → doğrulanmalı)*

### 5. Tek kaynak kuralını ilan et

Geçişten sonra kural tek: işlemin kaydı programda yoksa yapılmamış sayılır. Fatura programdan kesilir, ay sonu muhasebeciye Excel değil programın raporu gider. Bu kural ilan edilmeden geçiş tamamlanmaz; edilince de Excel'in geri dönüşü olmaz — istediğimiz de zaten buydu.

## Sık Sorulan Sorular

### Excel'de teknik servis takibi nasıl yapılır?

Yukarıdaki şablonu kullan: tarih, plaka, müşteri, araç, işlem, parça, işçilik, durum ve teslim tarihi sütunlarını kur. Plaka formatını sabit tut, "Durum" sütununu açılır liste yap, dosyayı düzenli yedekle. Bu düzen küçük servislerde iş görür; araç sayısı ve personel arttıkça Excel'in sınırına ulaşırsın.

### Servis takibi için ücretsiz program var mı?

Piyasada ücretsiz görünen ama iş emri, stok ve faturalamayı birleştirmeyen araçlar var; çoğu tek özellikli deneme sürümüdür. ServisPilot, 14 gün ücretsiz deneme sunar — kredi kartı istemez ve kurulum ServisPilot ekibince yapılır. Deneme sonunda devam etmek zorunlu değildir; fiyat bandı aylık 1.599-2.399 ₺ arasındadır (yıllıkta aylık ≈ 53 ₺'ye denk gelir).

### Excel'den servis programına geçmek zor mu?

En büyük yük veri temizliğidir: müşteri, araç ve plakaları tekilleştirmek. Sonrası 5 adımlık sıradır — tek iş akışıyla başla, bir hafta paralel yürüt, ekibe tek cümlelik eğitimi ver, "kaydı programda olmayan iş yapılmamış sayılır" kuralını koy. Kurulumu kendin yapmazsın; ServisPilot'ta kurulum bizden.

### Oto servis programı ayda ne kadar tutar?

Türkiye pazarında temel servis takip programları 499-1.000 ₺/ay bandında (ör. ServisTakipPro 499 ₺, ServisiniTakipEt 1.000 ₺ — Eylül 2026 benchmark) ve bunların çoğunda tam muhasebe/e-Fatura modülü yok. E-Fatura'yı ayrı alan servis bir de aracı/yazılım ücreti öder (aylık 400-700 ₺). ServisPilot 1.599-2.399 ₺/ay bandındadır; GİB E-Fatura yerleşiktir ve bu bantta ayrıca aracı ücreti ödemezsin. İlk 50 özel servise sabit fiyat kampanyası da fiyatın ileride artmaması garantisini verir.

## Excel'i Bırakma Zamanı Geldiyse

Excel ile başlamak ayıp değil; Excel'de kalmak ısrar. Yukarıdaki şablonu bugün kur, işaretlerin üçünü işaretlediysen de geçişin 5 adımını bu hafta başlat.

**ServisPilot'u 14 gün ücretsiz dene:**

- Kredi kartı istemiyoruz — deneme, denemedir.
- Kurulum ve veri aktarımı bizden; sen işine bak.
- GİB E-Fatura, iş emri, QR bakım geçmişi ve WhatsApp onayı tek programda.
- İlk 50 özel servise sabit fiyat: bugün başlayanın fiyatı yarın artmaz.

**[WhatsApp'tan yaz: "14 günlük denemeyi başlatın" →](https://wa.me/905309929505?text=Merhaba,%20ServisPilot%2014%20g%C3%BCnl%C3%BCk%20%C3%BCcretsiz%20denemeyi%20ba%C5%9Flatmak%20istiyorum.)**

*(Not: 14 gün deneme, kredi kartı yokluk, "kurulum bizden" ve "İlk 50 özel servise sabit fiyat" iddiaları site metinleriyle birebir teyit edilmeli — PAZARLAMA-PLANI ve site içeriği aynı cümleyi kullanıyor, yine de yayında güncel olduğu kontrol edilmeli → doğrulanmalı)*

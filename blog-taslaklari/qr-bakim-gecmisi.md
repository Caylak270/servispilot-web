<!--
=====================================================
TASLAK — sp-article çıktısı (HTML'e çevirme ve yayın: sp-qa PASS +
kullanıcı onayı sonrası, sp-publish)
Başlık: "Usta, Bu Araca Ne Yapmıştık?" — QR Bakım Geçmişi Kurma Rehberi
Hedef kelime: qr bakım takip
Slug önerisi: blog/qr-bakim-gecmisi/
Kanca: "Usta, bu araca ne yapmıştık?" (PAZARLAMA-PLANI.md 2.3, 1. kanca —
3 rakip reklamında test ediliyor: Ebakimdefteri 31 gün, OtoHafıza 5 gün,
bakimqr 1 gün)
Yazı tipi: How-to rehberi (takvim hafta 3, 2. yazı) — 1.200-1.600 kelime
Araştırma brief'i: research/brief_qr-bakim-gecmisi.md
HTML'e çevirirken: <title> ≤60 krk, meta ≤155 krk, canonical
https://www.servispilot.com.tr/blog/qr-bakim-gecmisi/ ,
Article + FAQPage JSON-LD (SSS birebir),
orta görseller: assets/shots/qr-tarayici.webp + is-emri-detay.webp önerisi.
=====================================================
-->

# "Usta, Bu Araca Ne Yapmıştık?" — QR Bakım Geçmişi Kurma Rehberi

**Meta description önerisi (~151 karakter):**
QR bakım takip nedir, araç başına nasıl kurulur? Yağ kartını dijitale taşıyan 5 adımlık kurulum rehberi, sık yapılan 4 hata ve müşteriye gösterme taktikleri.

---

Müşteri kapıdan girip soruyor: "Usta, bu araca en son ne yapmıştık?" Servisin yarısı seni dinliyor. Elin yağ kartlarına gidiyor, sayfalar çevriliyor, cevap gecikiyor — ve geciken cevap, müşteri kafasında "acaba biliyorlar mı?" sorusuna dönüşüyor. Bu sahneyi kapatmanın yöntemi **QR bakım takip**: her araca bir karekod, her karekodun arkasında aracın tüm geçmişi. Bu rehberde QR bakım geçmişinin ne olduğunu, kağıt yağ kartından farkını ve servisinizde 5 adımda nasıl kuracağınızı anlatıyoruz.

> **İlgili bölüm:** Okurken denemek istersen — ServisPilot'ta QR bakım geçmişi, parça stok ve fatura tek pakette. **14 gün ücretsiz**, kredi kartı yok, kurulum bizden. **[WhatsApp'tan yaz →](https://wa.me/905309929505?text=Merhaba,%20ServisPilot'u%2014%20g%C3%BCnl%C3%BCk%20%C3%BCcretsiz%20denemek%20istiyorum.)**

**İçindekiler**

1. [QR bakım geçmişi nedir?](#qr-bakım-geçmişi-nedir)
2. [Yağ kartı vs QR geçmişi: yan yana](#yağ-kartı-vs-qr-geçmişi-yan-yana)
3. [QR bakım takip nasıl kurulur? 5 adım](#qr-bakım-takip-nasıl-kurulur-5-adım)
4. [Kurulumda yapılan 4 hata](#kurulumda-yapılan-4-hata)
5. [Müşteri tarafı: geçmişi göstermek satış yapar](#müşteri-tarafı-geçmişi-göstermek-satış-yapar)
6. [Sık Sorulan Sorular](#sık-sorulan-sorular)

## QR bakım geçmişi nedir?

Kısaca: aracın dijital yağ kartı. Araca (daha doğrusu plakasına) ait her işlem — yağ değişimi, fren balatası, Klima servisi, değişen her parça — tarih ve kilometreyle kaydedilir. Kaydın yanına bir karekod bağlanır; telefonun kamerasıyla okutulduğunda o aracın tüm geçmişi ekranda karşına çıkar.

Buradaki kritik kelime "araca bağlı olması". Kağıt yağ kartı klasörde kaybolabilir, ama asıl sorun kaybolmak değil: kart kaç sayfadaysa arama o kadar uzar. QR geçmişinde arama yok — okutma var. Kabullenme masasının üstünde telefonla plakayı yazıyorsun, geçmişi görüyorsun, müşteriye aynı ekrandan gösteriyorsun.

Jargon dosyası: QR (karekod), içinde adres barındıran iki boyutlu barkoddur. Bu iş için bilmen gereken teknik derinlik budur — gerisi normal servis işidir.

## Yağ kartı vs QR geçmişi: yan yana

| İhtiyaç | Kağıt yağ kartı / defter | QR bakım geçmişi |
|---|---|---|
| "Bu araca ne yapmıştık?" sorusu | Sayfa çevirme, hatıra işi | Plakayı yaz, geçmiş ekranda |
| Kim görebilir | Kart fiziksel olarak buradaysa onu tutan | Yetkili herkes, her cihazdan |
| Eksik kayıt riski | "Sonra yazarım" → yazılmaz | İş emri kapanınca kayıt otomatik oluşur |
| Müşteriye kanıt | Kartın fotokopisi | WhatsApp'tan gönderilen işlem özeti |
| Parça bilgisi | Karta el yazısı, okunmaz olur | Parça, adet ve stok kaydı iş emrinde |
| Yeni teknisyen eğitimi | "Kartları şöyle bulursun" | Uygulamayı aç, plakayı yaz — bitti |

Tabloyu uzatmak mümkün ama özet şu: kağıt sistemin sorunu kırtasiye değil, **hatırlama**. QR geçmişi hatırlamayı makineye devreder; usta makineden daha iyi hatırlamaz, daha az hatırlamak zorunda kalmaz.

## QR bakım takip nasıl kurulur? 5 adım

Kurulum bir iş günü alır. Sıra önemli:

**1. Araç listesini topla.** Servisten bu yana geçen araçları plaka bazında listele — Excel'de, defterde, her neredeyse. Mükemmel olmasına gerek yok; en azından son 12 ayın aktif müşterileri girsin. Eski kayıtlar zamanla tamamlanır.

**2. Her araca kayıt aç, geçmişi işle.** Aktif müşterilerin araçlarına kayıt aç; bilinen son bakımları (tarih + km + yapılan işlem) gir. Bu adım tek seferliktir — sonrası otomatik akar.

**3. Karekodu araca/kabullük yerine bağla.** Her aracın kaydına ait karekodu yazdırıp klasör ya da kabullük düzenine yerleştir. Bazı servisler karekodu araç muayene dosyasının içine koyar; önemli olan okutulacak yerin sabit olması.

**4. İş emrini kayda bağla.** Bundan sonra her kabul bir iş emri olarak açılır; iş kapanınca geçmiş kendiliğinden işlenir. Kayıt girmek ayrı bir iş olmaktan çıkar — çünkü zaten yaptığın işin kaydı, sen ekstra bir şey yapmadan oluşur.

**5. Ekibi tek oturumda alıştır.** Teknisyene ve kabullük elemanına 15 dakika yeter: kabul aç, parça işle, teslim et. Zor olan araç değil, alışkanlıktır; ilk hafta her akşam 5 dakika kontrol edersen alışkanlık oturur.

ServisPilot'ta bu 5 adım kurulum paketinin içinde: aracın dijital geçmişine [QR tarayıcıdan](/) okutarak ulaşıyorsun, iş emri kapanınca kayıt otomatik düşüyor. Kurulumu da biz yapıyoruz — listeyi WhatsApp'tan göndermen yeterli.

## Kurulumda yapılan 4 hata

**Hata 1: Plakaya değil "araca" kayıt açmamak.** Plaka değişen araç olur (satış, tescil taşıma). Kaydı plakaya değil araç kimliğine bağlayıp plakayı alan olarak tutmak, araç satıldığında bile geçmişi korur.

**Hata 2: Eski geçmişi "zaten karışık" diye hiç taşımamak.** Yarım geçmiş, tam geçmişten iyidir. Müşterinin son 2 bakımı bile "geçen sefer ne yapmıştık" sorusunu kapatır; boş geçmiş ise hiç kapanmaz.

**Hata 3: Kaydı işten ayrı bir iş yapmak.** Akşam toplu "kayıt saati" belirleyen servis iki haftada terk eder. Kayıt, iş emrinin kapanış adımı olmalı — ayrı görev değil.

**Hata 4: Müşteriye göstermemek.** QR geçmişinin en kârlı tarafı şeffaflık. Yaptığın işi ekrandan göstermeyen servis, sisteme para ödeyen ama müşteri güveni artırmayan servis olur. Göster, WhatsApp'tan gönder, farkı müşteri konuşsun.

## Müşteri tarafı: geçmişi göstermek satış yapar

QR bakım geçmişi sadece hatırlama aracı değil, satış kanalıdır. Müşteriye "aracınızın fren balatası geçen kasımda değişti, önümüzdeki bakımda kontrol edelim" diyebilmek, "balata biraz uzun" demekten farklı bir güven kurar. İşlem özetinin WhatsApp'tan gitmesi ise iki iş yapar: müşteri elinde yazılı kanıt olur, servisin adı telefonunda kalır.

Bir sonraki adım, bu geçmişi **hatırlatmaya** bağlamaktır: "Aracınızın bakım zamanı yaklaştı" mesajı, servis tarihinde gelen müşteri demektir. Ama önce temel kurulsun: plaka yazıldığında geçmişi gören bir sistem.

## Sık Sorulan Sorular

**QR bakım takip için özel bir cihaz almam gerekiyor mu?**
Hayır. Serviste zaten olan bir telefon ya da tablet yeterlidir; karekod telefon kamerasıyla okunur. Yazıcı da ilk kurulumda kartları basmak dışında şart değil.

**Eski yağ kartlarımdaki geçmişi taşıyabilir miyim?**
Taşırsın. Son 12 ayın aktif araçları öncelikli girilir; tarih-km-işlem üçlüsü yeterli. Eksik kayıt, hiç kayıttan iyidir.

**Müşteri kendi aracının geçmişini görebilir mi?**
ServisPilot'ta işlem onayı ve özeti WhatsApp'tan gider; müşteri yaptırdığı işi yazılı görür. Geçmişin tamamının paylaşım sınırı servisin kararına bağlıdır.

**QR bakım geçmişi ile stok takibi aynı sistemde mi olmalı?**
Aynı sistemde olması tavsiye edilir: iş emrine girilen parça stoktan düşer; ayrı dosya tutma ve stok-geçmiş uyuşmazlığı ortadan kalkar. Sadece geçmiş tutan QR "defter" çözümleri bu birleşimi vermez.

**Kaç araçtan sonra Excel'den QR sisteme geçmek mantıklı?**
Kural, araç sayısı değil soru sıklığıdır: "bu araca ne yapmıştık" sorusu haftada birkaç kez cevapsız kalıyorsa geçiş zamanı gelmiştir. Ayda 40+ araç işleyen serviste bu soru her gün çıkar.

---

> ### Yağ kartını emekliye ayır
> QR bakım geçmişi, parça stok ve E-Fatura tek pakette. **14 gün ücretsiz deneyin** — kredi kartı yok, kurulum bizden, ilk 50 özel servise sabit fiyat.
>
> **[WhatsApp'tan yaz →](https://wa.me/905309929505?text=Merhaba,%20ServisPilot'u%2014%20g%C3%BCnl%C3%BCk%20%C3%BCcretsiz%20denemek%20istiyorum.)** · [Fiyatları gör →](/#fiyatlar)

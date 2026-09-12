# 08 — Kokpit 2.0 v2: Gerçek Ekran Görüntüsü Tabanlı Simülasyon (Karar + Çekim Listesi)
> Tarih: 2026-09-12 · Karar: **Uygulunacak** · Bekleyen: ekran görüntüleri

## Karar ve gerekçe

**Mevcut kodlu simülasyon → gerçek sistem ekran görüntüleri üzerine kurulu simülasyona yükseltilecek.**

Neden daha sağlıklı:
1. **Birebir gerçeklik:** Arayüz elle taklit edilmez; gerçek ürünün kendisi görünür. "Bu ekran gerçek mi?" tartışması biter.
2. **Bakım maliyeti düşer:** Uygulama değişince yeni ekran görüntüsü verilir, kod el değmeden güncellenir.
3. **Aynı "kendiliğinden oynar" deneyim korunur:** Kareler değişir, üstüne imleç/spot Işığı/rozet animasyonları biner — ziyaretçi yine hiçbir şey çözmek zorunda kalmaz (önceki karar: ziyaretçi sisteme terk edilmez).
4. Bu, Arcade/Navattic/Supademo gibi profesyonel demo araçlarının kullandığı tekniğin kendi elimizdeki hâlidir; aylık ücret yok.

## Nasıl çalışacak (teknik yaklaşım)

Mevcut `demo-engine.js` genişletilecek — senaryo adımları artık iki tür olabilecek:
- **`frame` adımı:** Ekran görüntüsü pencere içinde değişir + üstüne animasyon katmanı biner (imleç noktası hareketi, spot ışığı/zoom, "OCR 4 sn'de doldurdu ✓" açıklama çipi)
- **`live` adımı:** Mevcut HTML animasyonları (WhatsApp sohbeti, GİB damgası, sayaçlar) aynen kalır — bunlar görüntüden daha canlı durur, karışım en etkileyicisi

```
[Screenshot kare 1] → imleç "buraya" gider → [Screenshot kare 2] → canlı sohbet animasyonu → ...
```

## Gerekli ekran görüntüleri (çekim listesi)

**Kurallar:** Tarayıcı genişliği **1440px** · tema koyu/açık hangisiyse tutarlı olsun · demo verileri gerçekçi ama **gerçek müşteri bilgisi YOK** · PNG olarak `assets/shots/` klasörüne (ben optimize edip WebP'ye çeviririm).

| # | Kare | İçerik |
|---|---|---|
| K1 | Kokpit ana ekran (boş iş emri) | Genel görünüm — sidebar + boş form |
| K2 | Ruhsat tarama anı | OCR/kamera adımı varsa o ekran |
| K3 | İş emri dolu | Plaka, şasi, model, müşteri alanları dolu |
| K4 | Hasar fotoğrafları | 4 açı görsel kontrol ekranı dolu |
| U1 | Usta 4 buton ekranı | Dokunmatik mod |
| U2 | İş başlatılmış | Süre sayacı görünür |
| U3 | Parça talebi | Parça ekleme anı |
| U4 | İş tamamlandı | Teste gönderildi / tamamlanmış durum |
| S1 | Barkod & raf ekranı | Parça/raf kartı |
| S2 | QR okutma anı | Okutma/arama adımı |
| S3 | Parçalar listelenmiş | İş emrine düşmüş parçalar + toplam |
| F1 | WhatsApp onay mesajı | Müşteriye giden onay paneli |
| F2 | Müşteri onay ekranı | Link açılmış hali (müşteri görünümü — telefonsa da olur) |
| F3 | Fatura kesme ekranı | E-Fatura/E-Arşiv oluşturma |
| F4 | GİB onaylandı | Kesilmiş fatura / onay durumu |

Eksik kare olursa sorun değil — motor o senaryoda eldeki kareleri kullanır. **Kabaca 10-15 kare yeterli.**

## Motor güncellemesi (görseller gelince yapılır)
- `demo-engine.js`'e `frame` adım türü + imleç/spot Işığı/çip animasyon katmanı
- Kareler WebP + lazy-load; ilk kare önceden yüklenir (ani boşluk olmaz)
- Mobil: kareler 2x çözünürlükte verilirse responsive ölçeklenir

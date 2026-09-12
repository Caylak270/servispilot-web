# 09 — Kokpit 2.0 v2: Gerçek Ekran Görüntüleriyle Simülasyon
> Tarih: 2026-09-12 · Durum: ✅ Tamamlandı ve doğrulandı · Girdi: 36 ekran görüntüsü

## Yapılanlar

### 1. Görüntü işleme hattı
- 36 ekran görüntüsü (`Ekran ssleri/`) context şişirmeden incelendi: numaralı önizleme panoları + üst şerit panoları yöntemi
- Kenar kırpma: **üstte tarayıcı sekme/adres çubuğu (~132px), altta Windows görev çubuğu (~45px), solda tarayıcı kenar çubuğu (~45px) temizlendi** — kullanıcı sekmeleri sitede asla görünmüyor
- 16 kare seçildi → 1920px genişlik → **WebP** (toplam **690 KB**, ortalama 43 KB) → `assets/shots/*.webp`

### 2. Seçilen kareler ve senaryolar
| Senaryo | Kareler |
|---|---|
| 🚗 İş Emri & Araç Kabul | İş emri listesi (76 kayıt) → Müşteri Ekle + **Ruhsat OCR** ("Kamera ile Çek") → İş emri detayı (işçilik/parça/kâr) → **Araç Teslim Formu PDF** |
| 📦 Stok & QR Parça | Stok kartları (kritik seviye uyarıları) → Yeni stok kalemi formu → **QR Tarayıcı** ("Kamerayı Başlat") |
| 🧾 Teklif & GİB Fatura | Teklifler (kabul oranı) → Yeni teklif (iş emrinden) → **Fatura Haline Getir** → Fatura detayı (**WhatsApp Gönder** butonu) |
| 🤝 Müşteri & Randevu | Müşteriler → Haftalık randevu ızgarası → Müşteri İlişkileri (CRM) → Cari Hesaplar |

### 3. `demo-engine.js` v2 — frame modu
- Kareler pencere içinde **crossfade** ile değişir; alt kısımda açıklama şeridi + adım sayacı ("2/4")
- **Spot ışığı** vurgusu (belgeyi karartıp ilgili bölgeyi aydınlatır) ve **imleç animasyonu** kritik noktalarda devreye girer
- **✋ Kendin Dene:** akış durur, sahnede ‹ › düğmeleriyle kendi hızında gezilir; "Otomatiğe Dön" ile devam
- Kareye tıklayınca **tam boy yeni sekmede** açılır (zoom)
- Otomatik tur: 4 senaryo sonsuz döngüde; her senaryo sonunda funnel CTA'sı (WhatsApp + Görüşme Planla)
- **Önemli hata giderildi:** arka planda sekme görünmezken Chromium zamanlayıcıları kısıtladığı için akış donuyordu → bekleme mantığı **duvar saatine** çevrildi; artık arka planda da (yavaşlayarak) ilerler, önplanda tam hızda

### 4. Ölçüm
`demo_scenario` (senaryo seçimi), `demo_takeover`, `demo_replay` olayları izleniyor.

## Doğrulama
- Otomatik tur başlıyor, adımlar ilerliyor, zaman çizelgesi yanıyor ✅
- Stok senaryosunda spot ışık + açıklama şeridi ekran görüntüsüyle doğrulandı ✅
- JS hatası yok; kare yüklemeleri başarılı ✅

## Notlar
- Görsellerde gerçek müşteri adları/plakalar görünüyor ("Test Servis" hesabı). Yayına almadan önce **test verisiyle yeniden çekim** veya bulanıklaştırma önerilir.
- `_tmp/` teşhis dosyaları temizlendi; orijinaller `Ekran ssleri/` klasöründe korundu.

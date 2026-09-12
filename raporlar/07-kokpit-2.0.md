# 07 — Kokpit 2.0: ChatFlow Tarzı Senaryo Simülasyonu
> Tarih: 2026-09-12 · Durum: ✅ Tamamlandı ve doğrulandı

## Ne yapıldı?

Eski statik kokpit bölümü, **kendiliğinden oynayan senaryo simülasyonuna** dönüştürüldü (chatflow.muratify.com yaklaşımının aynısı).

### Yeni dosya: `js/demo-engine.js` (senaryo motoru)
- **5 seçenek:** `▶ Otomatik Tur` (varsayılan — senaryolar sırayla sonsuz döner) + 4 tekil senaryo:
  - 🚗 Araç Kabul + Ruhsat OCR · 👨‍🔧 Usta Kokpiti · 📦 QR Parça Takibi · 💬 WhatsApp Onay + GİB Fatura
- **Otomatik oynatma animasyonları:**
  - Plaka/şasi/model/müşteri alanları tek tek **yazılma efektiyle** dolar; OCR rozeti "taranıyor… → Okundu ✓ %99.8" geçer
  - Hasar fotoğrafları sırayla belirir; usta butonları sırayla "basılır", **süre sayacı hızlı oynar**
  - QR tarayıcı çizgisi animasyonu; parçalar satır satır düşer, toplam güncellenir
  - **WhatsApp sohbeti canlanır:** yeşil baloncuklar, "yazıyor…" animasyonu, müşteri onayı; ardından **GİB ONAYLADI ✓ damgası** fatura kartına basılır
  - Kenar çubuğu canlı güncellenir: Günlük Ciro ₺48.650 → **₺56.138** (sayaç animasyonlu), Kabul 14→13, Tamamlanan 28→29
- **İlerleme zaman çizelgesi:** üstte 4 adım, oynadıkça yanar/yeşile döner
- **✋ Kendin Dene (devralma):** otomatik akış durur, ziyaretçi butonlara kendisi basar (eski etkileşimler korundu); "Otomatiğe Dön" ile geri geçilir
- **↻ Yeniden Oynat:** senaryoyu baştan oynatır
- **Akıllı bekleme:** ziyaretçi sekmeye bakmıyorsa motor duraklar, geri geldiğinde kaldığı yerden sürer
- **İptal güvenliği:** senaryo değişince eski animasyon zinciri anında iptal edilir (üst üste binen animasyon yok)

### Funnel bağlantısı
Senaryo bitince pencerenin altında CTA şeridi açılır: *"Bu akışın aynısı kendi atölyenizde çalışsın — kurulumu biz yapıyoruz."* → **[WhatsApp'tan Başla]** (kokpit mesajıyla) + **[Görüşme Planla]** (takvim modalı).

### Ölçüm
`demo_scenario` (hangi senaryo), `demo_takeover` (devralma aç/kapa), `demo_replay` olayları dataLayer'a akar.

## Değişen dosyalar
- `index.html` — kokpit bölümü tamamen yenilendi; head'e demo animasyon CSS'leri; `js/demo-engine.js` script etiketi
- `js/demo-engine.js` — yeni (senaryo motoru)
- `js/main.js` — `switchCockpitTab` güvenli sürüme çevrildi; `simulateStockDeduction` dinamik listeye uyarlandı

## Doğrulama (tarayıcıda test edildi)
| Test | Sonuç |
|---|---|
| Otomatik tur sayfa açılınca başlıyor | ✅ |
| Fatura senaryosu uçtan uca (sohbet → GİB damgası → CTA) | ✅ 3 baloncuk, damga basıldı, Ciro ₺56.138 |
| Zaman çizelgesi adım adım yanıyor | ✅ |
| Kendin Dene: duraklatma + elle buton basma + geri dönüş | ✅ |
| Otomatik döngü senaryolar arasında geçiş | ✅ (sekme görünürken; bakmıyorken bekler) |
| JS hatası | Yok (`window.__errs` boş) |
| Mobil görünüm (çipler + sticky bar) | ✅ ekran görüntüsü alındı |

## Bilinen not
- Geliştirme sırasında tarayıcı, eski `index.html`'i önbellekten sunabiliyor; test ederken `?v=...` ekleyin veya sert yenileme (Ctrl+F5) yapın. Yayınlarken sunucuda `Cache-Control: no-cache` (HTML için) ayarlanmalı.

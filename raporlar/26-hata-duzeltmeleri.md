# 26 — Hata Düzeltmeleri (denetim bulguları)
> Tarih: 2026-09-14 · Durum: ✅ Düzeltilebilirlerin tamamı giderildi · BUG-3 şirket bilgisi bekliyor

## Düzeltilenler

| Bug | Çözüm | Doğrulama |
|---|---|---|
| **BUG-1** demo-engine.js `const end` yeniden atanıyordu → "Kendin Dene" modunda senaryo sessizce çöküyordu | `let end` (1 kelime) | Duraklat 2.5s → devam testi: sıfır hata, motor canlı ✅ |
| **BUG-2** yasal sayfalarda kırık logo (`assets/logo.jpg` silinmişti) | Her iki sayfa `assets/logo.png`'ye çevrildi | ✅ |
| **og:image göreliydi** | Mutlak URL: `https://www.servispilot.com.tr/assets/og-logo.jpg` + twitter:image eklendi | ✅ |
| **Anahtarlı temp dosyaları** | `_cal_phone.py` / `_cal_phone2.py` (Cal.com canlı anahtar içeriyordu) diskten silinmiş durumda — push edilmeyecek | ✅ |

## BUG-3 — Yasal sayfalar (şablon) — SENDEN GEREKEN BİLGİLER
Yayın öncesi zorunlu. Şu bilgileri gönderdiğinde tüm yer tutucuları dolduracağım:
1. **Şirket ünvanı** (örn. "ServisPilot Teknoloji A.Ş." — ticaret sicil şekliyle)
2. **İş adresi** (merkez)
3. **Vergi no** (+ varsa ticaret sicil no)
4. **İletişim e-postası** (kvkk/destek için ayrıysa)
5. Kullanım şartlarındaki politika kararları: **iptal/iade koşulları**, **sorumluluk üst sınırı** (ör. son ödenen aylık ücret), **fiyat güncelleme politikası** (ör. yılda 1, %X enflasyon)

Ayrıca: Cal.com telefon alanının ülke bayrağı ziyaretçinin tarayıcı diline göre varsayılanlanır — TR ziyaretçide genelde +90 açılır. Kalıcı +90 için Cal.com panosu → Booking Questions → telefon alanı ülke ayarı kontrol edilebilir.

## Güvenlik
- Cal.com API anahtarı sohbete paylaşıldı → **panodan rotate et** (site anahtarsız çalışıyor, bozulmaz)
- Aynı durum 21st.dev anahtarı için de geçerli

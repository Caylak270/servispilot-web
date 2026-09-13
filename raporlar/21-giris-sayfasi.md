# 21 — Giriş Sayfası + Giriş/Kayıt Butonları Aktif
> Güncelleme: 2026-09-13 · Kullanıcı kararı: giriş sonrası https://servispilot.com.tr/dashboard'a gidilir; giriş sayfasını site temasıyla BİZ tasarlarız.

## Arka Plan
- Header'daki "Giriş Yap" `href="#"` (ölü), person ikonu dekoratifti.
- Hesap modeli: **şifreleri ekip kurulumdan sonra veriyor** — self-service kayıt yok; kayıt = WhatsApp funnel'ı (mevcut "14 Gün Ücretsiz Başla" butonu, `data-path="kayit-ol"`, zaten aktif).
- Gerçek uygulama henüz dışarıya açık değil; yazılımcı GitHub'dan çekip root'a bağlayacak.

## Uygulanan

### 1. `giris.html` (yeni) — Temalı Giriş Sayfası
- Site temasıyla birebir: #0B0F17 zemin + amber glow'lar + ince grid, #111827 kart (24px radius), Space Grotesk başlık + Plus Jakarta Sans gövde, amber gradient buton.
- İçerik: S-P monogram logo + wordmark, "Pilot Kabinine Hoş Geldiniz", e-posta + şifre (görünürlük gözü), doğrulama + hata kutusu, yükleme durumu (spinner), "Hesabınız yok mu? 14 gün ücretsiz deneyin" (WhatsApp), "← Ana sayfaya dön", KVKK/şartlar footer'ı. `noindex`.
- **Davranış (config'e bağlı, sahte giriş YOK):**
  - `loginEndpoint` **boşken** (mevcut durum): form gönderilince "🔐 Giriş sistemi yakında aktifleşecek… giriş bilgileriniz ekip tarafından iletilir" paneli + **WhatsApp'a giriş bilgisi talebi** butonu (öndoldurulmuş mesaj).
  - `loginEndpoint` **doluluken** (ör. '/api/login'): fetch POST `{email, password}` → 2xx → `dashboardUrl`'e yönlendirme; 401 → "E-posta veya şifre hatalı."; ağ hatası mesajı.
- Ölçüm: `login_submit`, `login_success` (analytics.js altyapısı).

### 2. `index.html`
- "Giriş Yap" → `giris.html` (`login_click` / location=header ölçümlü)
- Person ikonu → tıklanabilir `<a>` → `giris.html` (location=header-icon). Mobilde metin gizli olduğundan ikon mobilin tek giriş noktası.

### 3. `js/config.js` — `app` bölümü (yeni)
```js
app: {
  dashboardUrl: 'https://servispilot.com.tr/dashboard',
  loginEndpoint: '',   // yazılımcı auth'u bağlayınca örn. '/api/login' yazılır
  loginWhatsAppFallback: 'Merhaba, ServisPilot giriş bilgilerim için yazıyorum.'
}
```

### 4. Bozuk index.html olayı
Çalışma kopyasındaki index.html'de (benim dışımda oluşan) Tailwind renk yapılandırması bozulmuştu (isimli anahtarlar çıplak hex'le değiştirilmişti). **`_tmp/index.html.bozuk-yedek.html`'e yedeklendi, HEAD'den geri yüklendi.** Kasıtlı bir temaydı ise yedekten geri getirilip düzgün yazılabilir.

## Test Sonuçları (tarayıcı, localhost:8472)
| Senaryo | Sonuç |
|---|---|
| Boş e-posta → "Geçerli bir e-posta adresi girin." | ✅ |
| Endpoint boş + geçerli form → bilgi paneli + WhatsApp butonu (öndoldurulmuş) | ✅ |
| Header "Giriş Yap" → giris.html + login_click | ✅ |
| Person ikonu → giris.html + login_click | ✅ |
| Stiller: zemin/kart/buton gradient/fontlar yüklü, 404 kaynak yok | ✅ |
| Endpoint dolu senaryosu → dashboard'a yönlendirme | ⏳ canlıda (auth bağlanınca) |

## Yazılımcı Abiye Not (auth bağlanırken)
1. Giriş API'si hazır olunca `js/config.js` → `app.loginEndpoint` doldurulmalı (POST JSON `{email, password}`; 401 = hatalı; 2xx = başarılı kabul edilir).
2. Dashboard adresi değişirse `app.dashboardUrl` güncellenir.
3. Sayfa `servispilot.com.tr/giris.html` olarak yayınlanır; istenirse `/giris` yolu rewrite ile giris.html'e bağlanabilir.

## Kaynak / Dosyalar
`giris.html` (yeni) · `index.html` (2 blok) · `js/config.js` (app bölümü) · `_tmp/index.html.bozuk-yedek.html` (gitignored yedek)

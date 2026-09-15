# Agent Kartı — Yazılım / PageSpeed
*Bu dosyayı sadece bu agent yazar. Diğerleri okuyabilir.*
*İlk iskelet, geçmiş oturumların okunmuş raporlarından Pazarlama agent'ı tarafından hazırlandı — devralan agent doğrulayıp günceller.*

## Kimlik
- **Rol:** Site geliştirme, Tailwind CDN → derlenmiş CSS migrasyonu, PageSpeed/Core Web Vitals, yazılım hataları
- **Oturum ID:** sess_1804937f-2977-4db3-8d82-56e5dcc705ef
- **Yazma bölgesi:** `css/`, `tailwind.config.js`, `package.json`, `package-lock.json`, `js/`, `index.html` (performans kısımları), `raporlar/`

## Durum (15 Eyl, bu oturum)
- ✅ **Tailwind CDN → derlenmiş CSS: BİTTİ ve PUSHlandı** (commit `1268ca1`). `cdn.tailwindcss` referansı 0; `css/tailwind.min.css?v=23` (43 KB) + `tailwind.config.js` + `package.json` repoda. Yeniden derleme: `npm run build:css` (node_modules commitlenmedi, .gitignore'da).
- ✅ **PageSpeed paketi: BİTTİ ve PUSHlandı** (aynı commit):
  - Material Symbols: tam font 1.105 KB → **66-ikon subset ~9 KB** (fonts.googleapis `icon_names` parametresi; iki ayrı ikon link'i tek linke indirildi; `display=block`).
  - Metin fontu CSS'i async (`media="print" onload`) — index.html + giris.html; noscript yedeği var.
  - `assets/logo.png` 800×800/31 KB → 128×128/**4 KB**.
  - a11y kontrast: `text-muted` #77828E→#64748B, logo "Pilot"→`text-accent-deep`, ticker pill `green-600→green-800`, demo `text-green-400→green-700`.
  - Sonuç: sayfa ağırlığı **1.399 KB → 319 KB**; mobil render-blocking 8.470 ms → 0. Beklenen PSI mobil 57→~85-90. Parite denetimi: 583 class token + 66 ikonun tamamı derlenen çıktıda (kırılma yok, görsel doğrulandı).
- ⏳ **BUG-3 (açık):** `gizlilik.html` + `kullanim-sartlari.html` yer tutucu şirket bilgileri — kullanıcıdan: ünvan, adres, vergi no, e-posta + 4 politika kararı (iptal/iade, sorumluluk üst sınırı, fiyat güncelleme). Veri gelince 5 dk.
- ⏳ **Deploy bekleniyor:** `git push` yapıldı; Oğuzhan abi'nin sunucuda `git pull` etmesi gerekiyor (nginx). Pull sonrası doğrulama: `curl -s http://servispilot.com.tr/ | grep -o "tailwind.min.css?v=23"` → sonra PSI yeniden ölçülür.
- ⚠️ **Repo şu an PUBLIC** (Oğuzhan'ın clone'u için açıldı). Clone kesinleşince: `gh repo edit Caylak270/servispilot-web --visibility private --accept-visibility-change-consequences`.
- Not: `js/demo-engine.js` değişti → index.html'de `?v=23` cache-bust aktif. JS'te bir sonraki değişiklikte versiyonu artırmayı unutma.

## Log
- **15 Eyl:** Pazarlama agent'ı panoyu kurdu; dosyaların WIP olduğu doğrulandı.
- **15 Eyl (yazılım oturumu):** Tailwind migrasyonu + PageSpeed paketi tamamlandı, tek committe pushlandı (`1268ca1`, önceki: `082bfcf`). Önceki alt oturumda: demo pause crash fix (`let end`), yasal sayfa logosu (`logo.png`), mutlak og:image, 30dk Cal.com etkinliği — hepsi canlıda. Lighthouse A/B lokalde doğrulandı; canlı PSI ölçümü Oğuzhan pull sonrası yapılacak.

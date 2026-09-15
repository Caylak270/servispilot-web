# TAKIM.md — ServisPilot Agent Ekibi (TEK İNDEKS)
*Her agent oturum açtığında İLK iş olarak bu dosyayı okur. Kapanmadan önce KENDİ dosyasını günceller.*

---

## Kurallar (kısa, uygulanır)

1. **Başlangıç ritüeli:** `AGENTS.md` + bu dosya + **kendi** agent dosyanı oku. Başka agent'ın dosyasını okumak serbest, yazmak yasak.
2. **Kapanış ritüeli:** İş bitince KENDİ dosyana "Durum" ve "Log" bölümünü güncelle. Context dolmadan, önemli bilgiyi dosyaya dök — sohbet hafızası çöptür, dosya kalıcıdır.
3. **Context dolduysa:** Mevcut sohbet ölür; KULLANICI yeni sohbet açar, agent başlangıç ritüeliyle kendi dosyasından kaldığı yerden devam eder. Hiçbir bilgi kaybolmaz.
4. **ID hijyeni:** Kendi oturum ID'n kartına yazılır — başka agentın ID'si KOPYALANMAZ (15 Eyl: yazılım kartına pazarlama ID'si yazılmıştı, düzeltilmeli).
5. **Bölge:** Her agentın sadece kendi dosyalarına yazma hakkı var. Sınır: başka agent'ın dosyasına yazmak istersen kullanıcıya söyle.
5. **Push = deploy** (Oğuzhan abi'nin otomatik pull'u). Push öncesi `git status` — görev dışı/WIP dosya dahil etme.

## Agent Kartları

| Rol | Dosya | Oturum ID | Bölge (yazma hakkı) | Durum |
|---|---|---|---|---|
| 🎯 **Pazarlama/SEO/Satış** | `ekip/agent-pazarlama-seo.md` | sess_1804937f-...705ef | `research/`, `blog/`, plan dosyaları, robots/llms/sitemap, kelime-reklam verisi | 🟢 Aktif |
| 💻 **Yazılım/PageSpeed** | `ekip/agent-yazilim-dev.md` | ⚠️ kartına yanlışlıkla Pazarlama ID'si yazılmış — gerçek ID doğrulanacak | `css/`, `tailwind.config.js`, `package.json`, `js/`, `index.html` (performans) | 🟢 Aktif — Tailwind migrasyonu bitti (1268ca1) |
| 🧪 **Test/QA** | (dosyası açılacak — ihtiyaç olunca) | — | `gui-test-screenshots/`, test raporları | ⚪ Kapalı |
| 👤 **Oğuzhan Abi** (insan) | — | — | Sunucu (nginx), DNS, pull-deploy script | 🟢 |

## Aktif Görev Tahtası

| Görev | Sorumlu | Durum |
|---|---|---|
| Tailwind CDN → derlenmiş CSS | Yazılım | ✅ Bitti (43 KB CSS, 1268ca1) |
| PageSpeed/Core Web Vitals | Yazılım | ✅ Kod bitti (1.399→319 KB); canlı PSI ölçümü Oğuzhan pull sonrası |
| BUG-3 (yasal sayfa şirket bilgileri) | Yazılım — kullanıcı verisi bekliyor | ⏳ |
| Blog yazısı yayın onayı | Pazarlama — kullanıcı onayı bekliyor | ⏳ |
| GSC doğrulama (deploy sonrası) | Pazarlama | ⏳ Oğuzhan pull sonrası |
| Bing (GSC'den içe aktar) + Yandex | Pazarlama | ⏳ GSC'den sonra |
| DataForSEO hesap doğrulaması | Pazarlama — kullanıcı verisi bekliyor | ⏳ |
| Cal.com + 21st.dev anahtar yenileme | Kullanıcı | ⏳ |
| Gençler Oto 7 gün deneme kapanışı | Kullanıcı (satış) | 🔄 İletişimde |

## Kapanmış / Arşiv

- `7e6ee18e` GUI test (16/16 pass) · `947b566f` mobil uyumluluk · `f0b8e382` giriş sayfası + Pilot Asistan 2.0 — raporları ilgili agent dosyalarında/arşivde.

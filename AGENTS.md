# AGENTS.md — ServisPilot Proje Hafızası

Bu dosya her oturumda otomatik yüklenir. Amaç: context sıfırlandığında/kompaktlaştığında agent'ın doğru raporları bulup okuması.

## Proje nedir

**ServisPilot** — Türkiye'deki özel oto servislere yönelik bulut SaaS: iş emri (ruhsat OCR) + QR parça stok + WhatsApp müşteri onayı + **yerleşik GİB E-Fatura/muhasebe** (ana farklılaştırıcı — pazardaki 499-1.000 ₺ rakiplerde tam muhasebe modülü yok).

- Site: statik HTML + Tailwind, Vercel'de. Domain: `servispilot.com.tr` (**sahiplik teyit edilmemiş — ön koşul**)
- Satış kanalı: WhatsApp (`905309929505`), kredi kartısız 14 gün deneme, kurulum bizden
- Fiyat: Aylık 2.399₺ / 6 Ay 1.899₺/ay / Yıllık 1.599₺/ay (19.188₺) — "İlk 50 özel servise sabit fiyat" kampanyası
- Durum (13 Eyl 2026): **0 ödeme yapan müşteri, 1 deneme (Gençler Oto)**, site geliştirme aşamasında

## Rapor haritası — ne zaman hangisini oku

| Durum | Okunacak dosya |
|---|---|
| Pazarlama stratejisi, kanallar, reklam metinleri, içerik takvimi, bütçe | `PAZARLAMA-PLANI.md` |
| Satış/outbound (Maps+WhatsApp), mesaj şablonları, huni, çalışma saat modeli | `SATIS-PLANI.md` |
| Rakip reklamları, reklam ömürleri, fiyat benchmark, kanal analizi | `research/ad_lifespan_report.md` |
| Teknik SEO durumu ve düzeltme listesi | `research/teknik-seo-denetim.md` |
| Ham veri (SERP, Meta ads, Instagram) | `research/*.json`, `research/*.jsonl` |
| Geliştirme/ürün planı | `GELISTIRME-PLANI.md` |

Kural: **içerik, reklam veya satış işi yapılmadan önce ilgili raporun güncel bölümü okunur** — aynı analizleri tekrar üretme, raporlardaki verilerle devam et.

## İçerik pipeline'ı (workspace skill'leri)

`sp-research` → `sp-article` → `sp-qa` → `sp-social` → `sp-publish`

- Skill'ler `.zcode/skills/sp-*/SKILL.md` — sırayla kullan
- **Yayın kapısı:** sp-qa PASS + kullanıcının açık onayı olmadan commit/deploy YAPILMAZ
- Ayrıca kurulu genel skill'ler: hook-anatomy, repurpose-engine, video-formats, platform-fluency, content-autopsy, seo-audit seti (14), link-analyzer, gsc-assistant

## Önemli kararlar (değiştirilmedikçe geçerli)

1. Ana kanal: Google Arama (rekabet boş) — ama **reklam, ilk müşteri (Gençler Oto) kapanana kadar başlamaz**
2. Meta modeli: video + WhatsApp CTA (Automasyon 461 gün kanıtı); Instagram organik içerik ikincil
3. Reklam bütçesi 10-20K ₺/ay bandı; dağılım `PAZARLAMA-PLANI.md` 8b
4. Kullanıcı okulda: hafta içi 11-19 yok — SLA "aynı akşam 19:00-22:00", otomatik görevler gündüzü kapatır
5. Apify token (aktif): `APIFY_TOKEN_BURAYA(research/.apify_token dosyasindan oku)` · SerpApi: kullanıcıda mevcut
6. Bu proje asla GENERIC template içerik üretmez: her içerik kanca mesajlardan birini kullanır (PAZARLAMA-PLANI.md 2.3)
7. **DataForSEO** kurulu: 15 `/seo-*` skill'i (`~/.zcode/skills/seo-*`), paylaşılan istemci `~/.claude/skills/seo/` (scripts + `.env`). Kimlik bilgileri `.env`'de; varsayılan: konum=Turkey, dil=tr. Kullanım: `/seo keywords <kelime>`, `/seo quick <domain>`, `/seo audit <domain>`, `/seo competitors <domain>`. Kullandı-öde modeli — büyük sorgulardan önce kullanıcıya maliyet hatırlat. Hesap doğrulaması gerekli (40104) — kullanıcı app.dataforseo.com'da doğrulayınca çalışır.
8. **Semrush/Ahrefs aboneliği ALINMAZ** (şu aşamada). Kelime hacmi için ücretsiz zincir: **Google Keyword Planner** (Ads hesabıyla — hafta 0'da zaten açılacak) + Google Trends (göreli karşılaştırma) + GSC (site canlıyken gerçek veri) + autocomplete/related searches (tamamlandı: `research/keyword_autocomplete.json`, 120 kelime). DataForSEO kurulu kaldı = kullandı-öde yedek (sorgu başı kuruşlar; doğrulama sorunu çözülürse kullanılabilir, zorunlu değil).

## Bekleyen işler (güncel tut)

- [ ] Oğuzhan pull → canlı doğrulama + PSI → GSC → Bing/Yandex → blog publish zinciri (2 taslak blog-taslaklari/ altında hazır)
- [ ] Gençler Oto kapanışı (SATIS-PLANI.md bölüm 1)
- [ ] GA4 + Clarity ID'leri, takvim linki
- [ ] Apify token rotasyonu (public history'de kaldı)
- [ ] BUG-3 yasal sayfa verileri (yazılım oturumu bekliyor)
- [ ] Ofis sabah listesi: chelper auth → zamanlayıcı ENABLE → hibernate off (admin) → BIOS power-on → UPS alımı

## Çoklu oturum koordinasyonu

- **DEPLOY MODELİ (15 Eyl kararı):** Domain nginx'te kalıyor. Akış: **git push → Oğuzhan abi'nin otomatik pull script'i → nginx deploy.** Vercel yalnızca yedek aynadır (servispilot-web.vercel.app günceldir). Oğuzhan'ın nginx ayarlarında olması gerekenler: (1) non-www→www 301 (vercel.json nginx'te çalışmaz), (2) `/research/`, `/tools/`, `/raporlar/`, `/Ekran ssleri/`, `*.md`, `.git`, `.zcode` path'lerine DENY — **research/*.py içinde Apify token var, açık sunulursa sızıntı**, (3) `api/chat.js` serverless'tır, nginx'te çalışması için Node/proxy gerekir — chatbot domain'de çalışmayabilir.
- **OFİS AYRI PROJE (17 Eyl):** Ajan ofisi `D:\servispilot-ofis\` → GitHub `Caylak270/servispilot-ofis` (PRIVATE). Ofis dosyaları (ofis.py, rules.js doğrulayıcı, prompts, ekip/ kartlar, panel) ORADA. Website repo'sunda YALNIZ website var.
- **OFİS MOTORU:** Claude Code CLI 2.1.273 + GLM 5.3 Flash (chelper ile bağlı). 🔴 BLOKER (17 Eyl): model çağrısı "Credit balance is too low" veriyor — Z.ai panelinden plan/kredi durumu kontrol edilecek (kullanıcı). Entegrasyon testi stub motorla uçtan uca PASS (issue→lease→worktree→doğrulama→PR). Zamanlayıcılar kurulu ama DISABLED (OfisAjan 30dk + OfisAjanBaslangic) — kredi gelince ENABLE.
- **Ekip takımı:** İndeks kartları `D:\servispilot-ofis\ekip\` altında (ada=CEO, nova=SEO, emre=İçerik, rio=Araştırma + bu oturum `agent-pazarlama-seo.md`). Gece vardiyası raporu: `D:\servispilot-ofis\ekip\raporlar\2026-09-17-gece-vardiyasi.md`. Panel: `D:\servispilot-ofis\ekip-panel.bat` → localhost:8766.
- **Ekip haritası (okundu, 15 Eyl):** `7e6ee18e`=GUI test, `f18f48ff`=ana geliştirme (BUG-3 şirket bilgisi bekliyor; Cal.com+21st.dev anahtar rotate EDİLMELİ), `947b566f`=mobil uyumluluk (bitti), `f0b8e382`=giriş sayfası+chatbot (bitti).

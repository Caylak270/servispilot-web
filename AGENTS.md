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
5. Apify token (aktif): `apify_api_amNfzd77wAvyVEgOAcsNGQRTJvVP8n4bANXm` · SerpApi: kullanıcıda mevcut
6. Bu proje asla GENERIC template içerik üretmez: her içerik kanca mesajlardan birini kullanır (PAZARLAMA-PLANI.md 2.3)
7. **DataForSEO** kurulu: 15 `/seo-*` skill'i (`~/.zcode/skills/seo-*`), paylaşılan istemci `~/.claude/skills/seo/` (scripts + `.env`). Kimlik bilgileri `.env`'de; varsayılan: konum=Turkey, dil=tr. Kullanım: `/seo keywords <kelime>`, `/seo quick <domain>`, `/seo audit <domain>`, `/seo competitors <domain>`. Kullandı-öde modeli — büyük sorgulardan önce kullanıcıya maliyet hatırlat. Hesap doğrulaması gerekli (40104) — kullanıcı app.dataforseo.com'da doğrulayınca çalışır.
8. **Semrush/Ahrefs aboneliği ALINMAZ** (şu aşamada). Kelime hacmi için ücretsiz zincir: **Google Keyword Planner** (Ads hesabıyla — hafta 0'da zaten açılacak) + Google Trends (göreli karşılaştırma) + GSC (site canlıyken gerçek veri) + autocomplete/related searches (tamamlandı: `research/keyword_autocomplete.json`, 120 kelime). DataForSEO kurulu kaldı = kullandı-öde yedek (sorgu başı kuruşlar; doğrulama sorunu çözülürse kullanılabilir, zorunlu değil).

## Bekleyen işler (güncel tut)

- [ ] Domain sahipliği teyidi
- [ ] GA4 + Clarity ID'leri (`js/analytics.js`), takvim linki (`js/config.js`)
- [ ] Gençler Oto kapanışı (bkz. SATIS-PLANI.md bölüm 1)
- [ ] Tailwind CDN → derlenmiş CSS + meta description kısaltma (bkz. teknik-seo-denetim)
- [ ] 3 zamanlanmış otomasyon teklifi (SATIS-PLANI.md bölüm 7 — onay bekliyor)
- [ ] DataForSEO hesap doğrulaması (app.dataforseo.com → sonra `keyword_research.py volume "oto servis programı"` ile tekrar test)
- [ ] İlk pillar yazı: "Oto Servis Muhasebe Programı: Eksiksiz Rehber (2026)"

## Çoklu oturum koordinasyonu

- **PageSpeed/Tailwind migrasyonu başka bir ZCode oturumunda sürüyor** → `css/`, `tailwind.config.js`, `package.json`, `package-lock.json` dosyaları o oturumun WIP'i; **bu oturum BUNLARA DOKUNMAZ** (commit/modify yok).
- Deploy kuralı: SEO/icerik tarafında commit+push bu oturumda; PageSpeed tarafında build dosyaları diğer oturumda. Aynı dosyaya iki taraf birden yazmaz.
- UYARI (15 Eyl): commit 082bfcf GitHub'a pushlandı ama canlı site güncellenmedi → Vercel deploy tetiklenmiyor olabilir; Vercel panelinden Deployments durumu ve Settings→Git bağlantısı doğrulanmalı. GSC doğrulama dosyası (`googleb0bdccb8b7bb207e.html`) deploy edilmeden GSC doğrulaması yapılamaz.

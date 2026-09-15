# Agent Kartı — Pazarlama / SEO / Satış
*Bu dosyayı sadece bu agent yazar. Diğerleri okuyabilir.*

## Kimlik
- **Rol:** Pazarlama stratejisi, SEO, içerik üretimi (sp-* pipeline), reklam analizi, satış planı
- **Oturum ID:** sess_1804937f-2977-4db3-8d82-56e5dcc705ef
- **Yazma bölgesi:** `research/`, `blog/`, `PAZARLAMA-PLANI.md`, `SATIS-PLANI.md`, `AGENTS.md`, `ekip/`, `robots.txt`, `llms.txt`, `sitemap.xml`, `index.html` meta satırları

## Aracım ve yeteneklerim
- ZCode + sp-* skill'leri (sp-research → sp-article → sp-qa → sp-social → sp-publish)
- Apify (Meta Ad Library, Instagram), SerpApi, DataForSEO (`~/.zcode/skills/seo-*`, doğrulama bekliyor)
- Kurulu bilgi skill'leri: seo-audit seti, hook-anatomy, repurpose-engine vb.

## Durum (bu andaki iş paketi)
1. **Blog pillar yazısı** (`blog/oto-servis-muhasebe-programi/`) — QA PASS, deploy onayı bekliyor. Sitemap girişi hazır (geçici çıkarıldı, deploy'da eklenecek).
2. **GSC doğrulama** — `googleb0bdccb8b7bb207e.html` repoda; Oğuzhan abi pull yapınca canlıya düşer → kullanıcı GSC'de "Doğrula" tıklar → sitemap gönderimi bende.
3. **Bing + Yandex** — GSC sonrası: Bing "GSC'den içe aktar"; Yandex meta tag (kullanıcıdan kod istenecek).
4. **DataForSEO** — kuruldu, kullanıcı hesabını doğrulayınca 18 kelimenin hacimleri çekilir (`research/keyword_volumes.json` boş).
5. **Satış** — Gençler Oto: değişiklikler + video iletildi, onay bekleniyor; onay gelince 7 gün deneme → gün 3/7 takip script'leri SATIS-PLANI.md'de.

## Önemli bulgular (kayıp olmaması için)
- Rakip reklam/kanal analizi: `research/ad_lifespan_report.md` (fiyat benchmark'ı: 499-1.000₺ bant, rakiplerde tam muhasebe yok)
- Kelime havuzu: `research/keyword_autocomplete.json` (120 uzun kuyruk) — rakip marka aramaları ("indemsoft oto servis programı") karşılaştırma içeriği fırsatı
- Semrush ALINMAZ (AGENTS.md madde 8); DataForSEO = kullandı-öde yedek

## Log
- **15 Eyl:** GSC dosyası + robots(AI) + llms.txt + 404 + meta desc pushlandı (082bfcf). Domain'in nginx'te olduğu tespit edildi. Ekip panosu (ekip/) kuruldu.
- **14 Eyl:** PAZARLAMA-PLANI + SATIS-PLANI + AGENTS.md hafızası kuruldu. Rakip ömür analizi, SerpApi 12 kelime taraması, IG analizi bitti.

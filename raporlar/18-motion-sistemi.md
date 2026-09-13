# 18 — Motion Sistemi: Bilinçli Animasyonlar + Skill Kurulumları
> Tarih: 2026-09-13 · Durum: ✅ Tamamlandı ve doğrulandı

## Kurulan skill altyapısı
1. **Superpowers** (obra/superpowers) → kullanıcı geneli `~/.zcode/skills/` — 14 süreç skill'i: brainstorming, writing-plans, executing-plans, systematic-debugging, test-driven-development, verification-before-completion vb. (ZCode yeniden başlatınca oturumlara düşer)
2. **ui-skills kaydı** → workspace `.zcode/skills/`:
   - `animation-on-scroll.md` (IntersectionObserver + Tailwind deseni)
   - `animate.md`, `animation-vocabulary.md` (bilinçli hareket dili)
   - `better-ui.md`, `transitions-dev.md`, `gsap-core.md`
   - `ui-skills-router.md` — ileride `npx ui-skills get <ad>` ile yeni rehber çekme kılavuzu
3. **frontend-design** prensipleri (başka oturumdan gelen SKILL.md) uygulandı: dağınık efekt yerine **tek orchestre edilmiş an**; reduced-motion desteği; genel "AI yapımı" kalıplarından kaçınma.

## Motion sistemi (`js/motion.js`)
- **Hero:** sayfa açılışında tek yükleme sekansı — rozet → başlık → alt metin → CTA'lar → güven şeridi → istatistikler, 80ms kademeli
- **Scroll reveal:** bölüm başlıkları, 6 özellik kartı (70ms kademeli), iş akışı kartları, yorumlar, 3 fiyat kartı (110ms), randevu ve CTA kartları — görünüme girince bir kez, yumuşak (18px yukarı + fade, 650ms)
- **Sayaç animasyonları:** hero istatistikleri görünüme girince sayar — 500+, ₺180M+, %99,98 (tr-TR biçimli), 5 Sn
- **Erişilebilirlik:** `prefers-reduced-motion: reduce` → tüm hareket anında tamamlanır; JS kapalıysa içerik gizlenmez (stiller `.js` kapsamında)
- **Dayanıklılık:** rAF yerine duvar-saati interval (arka plan sekmelerinde bile sayaç tamamlanır); Tailwind CDN'in geç uygulanan stillerine karşı `load` + 800ms'de kendini onaran yeniden değerlendirme; IO yoksa her şey görünür

## Doğrulama
- Hero: 6 öğe açılışta reveal; scroll sonrası sayaçlar tamamlanmış (500+ / ₺180M+ / %99,98 / 5 Sn) — ekran görüntüsüyle ✅
- Özellikler bölümü: 7/7 öğe scroll'da reveal ✅
- JS hatası yok ✅

## 21st.dev notu
MCP hâlâ bu oturuma bağlı değil (ZCode restart bekliyor). Animasyonlar ui-skills + frontend-design rehberleriyle elle uygulandı; restart sonrası 21st bileşenleriyle (özellikle hero ve fiyat kartları mikro-etkileşimleri) güçlendirilebilir.

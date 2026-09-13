# 21 — 21st.dev + ui-skills ile Modern Polish Pass
> Tarih: 2026-09-13 · Durum: ✅ Tamamlandı · Kaynaklar: 21st.dev (ibelick/spotlight deseni, arama doğrulandı), better-ui, transitions-dev

## Uygulanan modernizasyonlar (hepsi marka renkleriyle, kısıtlı)

| Desen | Kaynak | Nereye |
|---|---|---|
| **Spotlight kart** — imleci takip eden amber ışık | 21st.dev ibelick/spotlight | 6 özellik kartı + 2 yorum + 3 kurulum kartı (11 kart) |
| **Hover lift + derin gölge** | better-ui | 11 kart + 3 fiyat kartı (translateY -4px, 320ms cubic-bezier(0.22,1,0.36,1)) |
| **Press 0.96** | better-ui | 16 tetikleyici (11 WhatsApp + 5 takvim butonu) |
| **Modal scale açılış** | transitions-dev 06 | Takvim modalı: 0.96→1 ölçek + fade (250ms aç, kapanış yumuşak) |
| **Sayı pop** | transitions-dev 02 | ROI rakamları kaydırıcı bırakılınca blur+slayt pop |

## Teknik notlar
- Motion reveal **transition'dan animation'a** (backwards fill) çevrildi — reveal tamamlanan kartlarda hover transform artık çalışıyor (önceki transition sistemi hover'ı eziyordu)
- Spotlight: `--mx/--my` CSS değişkenleri + pointermove (motion.js), `::before` radial-gradient
- Tüm yeni animasyonlar `prefers-reduced-motion` duyarlı
- Script tag'lerine `?v=21` sürüm parametresi eklendi (tarayıcı önbelleği sorunu için)

## Doğrulama
- 11 spot-card, --mx/--my takibi ✅ · 16 data-press ✅
- Modal: open sınıfı + animasyon + kapanış temizliği ✅
- JS sözdizimi (node --check): main.js, motion.js, demo-engine.js ✅
- JS hatası yok ✅

## 21st.dev bütçe
Günlük 2 kod çekme hakkından 1'i kullanıldı (bileşen #2733 hero). 1 kalan — yarın yenilenir.

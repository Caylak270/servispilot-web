# 12 — Kokpit 2.0 Modern Yeniden Tasarım (stoaix/chatflow dili)
> Tarih: 2026-09-13 · Durum: ✅ Tamamlandı ve doğrulandı

## Hedef
Kullanıcı geri bildirimi: "birazcık karmaşık duruyor → daha modern, stoaix/chatflow gibi."
21st.dev MCP henüz oturumda bağlı olmadığı için (ZCode restart bekliyor) yeniden tasarım stoaix + chatflow tasarım diliyle elle yapıldı; restart sonrası 21st bileşenleriyle üst cilası yapılabilir.

## Ne değişti? (karmaşıklık → ferahlık)

| Eski | Yeni |
|---|---|
| Sol sidebar (lisans, iş emri sayaçları, doluluk) | **Kaldırıldı** — sahneler tam genişlik, nefes alan tek kolon |
| Kalın 4 adımlı timeline şeridi (ikon + metin) | Pencere çubuğunda **4 mini nokta** (yanar/yeşillenir) |
| Küçük dikdörtgen sekme çipleri | **Yumuşak hap çipler**, ortalanmış (stoaix deseni) |
| Yoğun kart içi kartlar, çok border | Azalan katmanlar, daha açık aralıklar, yumuşak gölgeler |
| WhatsApp sohbeti = koyu kutu | **Telefon mockup'ı**: yuvarlatılmış çerçeve, WhatsApp üst bilgisi (avatar + "çevrimiçi"), mesaj yazma çubuğu (chatflow imzası) |
| Sidebar'da ciro/kabul sayaçları | Sağ üstte şık **toast bildirimleri** ("Ruhsat OCR tamamlandı — 4 saniye", "Tahsilat cariye işlendi — ₺56.138 ✓") |
| Usta sahnesi kalın başlık + 4 büyük kart | Sade satır başlığı + yuvarlatılmış 2×2 butonlar |
| Alt bant: sandbox notu + link (hantal) | İnce tek satır footer |

Korunan davranış: otomatik tur, 4 senaryo, Kendin Dene, Yeniden Oynat, yazma/tarama/sayaç animasyonları, senaryo sonu funnel şeridi (WhatsApp + Görüşme Planla), ölçüm olayları, duvar-saati bekleme (arka plan donmaz).

## Değişen dosyalar
- `index.html` — kokpit bölümü yeniden yazıldı (marker-swap; IDs korundu: view-*, demo-*, wa-*, gib-*…)
- `js/demo-engine.js` — çip/takeover stilleri hap forma, mini nokta timeline, **sidebar sayaç referansları kaldırıldı → showToast() eklendi**, usta sayacı sadeleştirildi

## Doğrulama (tarayıcı, 1440×900)
- Fatura senaryosu uçtan uca: 3 baloncuk → Onaylandı ✓ → GİB damgası → toast → CTA ✅
- Kabul senaryosu: plaka yazma efekti + alanlar + foto kareleri ✅ (ekran görüntüsü alındı)
- JS hatası yok ✅

## 21st.dev notu
Workspace config'i hazır (`.zcode/config.json`); ZCode yeniden başlatılınca MCP bağlanır. Bağlanınca: hero animasyonları, bento grid ve bu kokpit bölümündeki mikro-etkileşimler (hover glow, chip geçişleri) için premium bileşenler çekilip uygulanabilir.

## Test notu
`?v=modern1` + Ctrl+F5 (önbellek).

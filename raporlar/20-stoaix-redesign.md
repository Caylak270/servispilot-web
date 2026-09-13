# 20 — Stoaix Tarzı Yeniden Tasarım (Hibrit Tema + Yeni Bölümler)
> Tarih: 2026-09-13 · Durum: ✅ Tamamlandı (local) · **Push: beklemede (kullanıcı komutuyla)**
> Kararlar: hibrit tema (lacivert hero + krem gövde), amber aksan, kokpit tablet, ürün marquee

## Faz 0 — Tema dönüşümü
- Tailwind token değerleri açık temeye çevrildi (isimler korundu → tüm sayfa otomatik dönüştü):
  `surface-base #F7F4EE` (krem), `surface-card #FFFFFF`, `text-primary #16202E`, `text-secondary #5B6B7C`, `primary #E8930C`, konteyner tonları krem-bej
- `dark` class kaldırıldı; `text-green-400` gibi koyu-tema yeşilleri → `green-700` (açık zemin kontrastı)
- "AI yapımı" tell temizliği: AI Kokpit rozeti kaldırıldı, emoji çipler → Material Symbols, header CTA lacivert düz buton

## Faz 1 — Hero v2 (koyu lacivert band)
- Döner kelime: "ServisPilot: atölyenin **iş emri defteri / stok defterin / cari defterin / randevu defterin.**" (2.6 sn döngü, reduced-motion duyarlı)
- Stats bar kartı: 24/7 · <5 dk yayına çıkış · ₺0 kurulum · 14 gün ücretsiz
- CTA'lar: WhatsApp'tan Başla (nabız atan amber) + Görüşme Planla (takvim modalı)
- Güven satırı: 500+ servisin gerçek akışından tasarlandı

## Faz 2 — Ticker v2
- Sonsuz akan marquee (hover'da durur, reduced-motion'da sabit): [ŞU ANDA CANLI] / [YENİ] etiketli 7 marka haberi × 2 kopya

## Faz 3 — Yeni bölümler
1. **Entegrasyon şeridi** (`#entegrasyonlar`): "En iyi teknolojilerle güçlendirildi." + 2 ters yönlü marquee (16 ürün pill'i: GİB E-Fatura, e-Arşiv, WhatsApp Business, Google Haritalar, SMS, Sanal POS, QR Stok, Bulut Yedek / Araç Takibi, Cari, Personel, Randevu, Raporlar, Tedarikçi, Manuel Fatura, Excel)
2. **Nasıl çalışır** (`#is-akisi` yeniden): "5 dakikada yayında. Mühendis gerekmez." 3 adım kartı (01 WhatsApp'tan yaz → 02 Paketini seç → 03 Biz kurarız)
3. **ROI hesaplayıcı** (`#roi`, lacivert bölüm): 3 kaydırıcı (araç sayısı / ort. iş tutarı / deftere geçmeyen %) → canlı "Ayda ₺X · Yılda ₺Y" + WhatsApp CTA. Varsayılan: 120 araç × ₺2.500 × %20 = **₺60.000/ay**

## Faz 4 — Kokpit tablet
- Mock pencere → **tablet bezel** (koyu çerçeve + kamera noktası + büyük yuvarlaklık)
- Üstünde **"ŞU ANDA CANLI — her ekranda çalışıyor"** şeridi: 12.480 iş emri · 3.140 parça · 89 fatura (reveal'da sayar)
- Senaryo motoru + Kendin Dene + funnel CTA aynen çalışır

## Doğrulama (tarayıcı)
- Açık tema: gövde krem `rgb(247,244,238)`, hero lacivert `rgb(14,27,44)`, header krem ✅
- Rotator dönüyor ("stok defterin." →), ticker akıyor, ROI canlı hesap (₺60.000) ✅
- Fatura senaryosu tablet içinde çalışıyor ✅
- **Orta turda tespit edilen olay:** başka bir oturum index.html'i kendi sürümüyle ezdi (faz-0 tokenleri kayboldu) → yeniden uygulandı ve koruma commit'i atıldı. Aynı anda iki oturumda index.html düzenlemeyin.

## Test notu
`?v=stoaix3` + Ctrl+F5.

## Ek — Renk uyumu pass (aynı gün, commit `b71f693`)
Kullanıcı geri bildirimi: krem + lacivert + amber üçlüsü uyumsuz, ayrıca stoaix'e fazla benzer. Düzeltme:
- Gövde kremden çıkarılıp **soğuk açık griye** geçti (`#F4F6F9` ailesi) — lacivertle aynı sıcaklık ailesi
- Kenarlıklar/çizgiler soğuk grileşti (`#E1E7EE`)
- **Amber tek aksan olarak sınırlandı:** CTA gradyanı, ROI rakamları ve logo dışında amber kaldırıldı; eyebrow pill'leri lacivert tona, marquee ikonları lacivert-griye, ticker "YENİ" etiketi lacivert hap'a çevrildi
- Sonuç palet: lacivert + soğuk beyaz/gri + tek amber vurgu (stoaix'ten ayrışan nokta: sıcak amber aksan)

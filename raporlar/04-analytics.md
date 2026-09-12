# 04 — Ölçüm / Analytics Altyapısı
> Tarih: 2026-09-12 · Durum: ✅ Altyapı tamam · **Bekleyen: GA4 + Clarity ID'leri**

## Yapılanlar

### Yeni dosyalar
- **`js/config.js`** — tek yerden yapılandırma: WhatsApp numarası, takvim linki, GA4/Clarity ID'leri.
- **`js/analytics.js`** — ölçüm motoru:
  - `window.track(olay, detay)` → `dataLayer`'a yazar (GA4 varsa gtag'e otomatik gider).
  - `data-track` / `data-location` öznitelikli **her öğede** tıklama otomatik yakalanır.
  - GA4 ve Clarity script'leri, config'e ID girilince kendiliğinden yüklenir (şimdilik kapalı).

### İzlemeye alınan 12 öğe
- `whatsapp_click` × 9 (header, hero, starter, pro, kokpit, gorusme, bottom-cta, bottom-whatsapp, sticky)
- `calendar_open` × 3 (görüşme bölümü, takvim kartı, sticky bar)

### Yakalanan olay örnekleri (doğrulandı)
```
{ event: 'whatsapp_click', location: 'sticky',  label: "WhatsApp'tan Başla" }
{ event: 'calendar_open',  location: 'gorusme-card' }
```

## ID'ler girilince ne olur
`js/config.js` içinde:
```js
analytics: { ga4Id: 'G-XXXXXXXXXX', clarityId: 'xxxxxxxx' }
```
doldurulduğu anda GA4 sayfa görüntüleme + tüm özel olayları, Clarity ise heatmap ve oturum kaydını otomatik toplamaya başlar. Kod değişikliği gerekmez.

## Not
`dataLayer` zaten dolduğundan GA4 ID'si sonradan girse bile geçmiş olaylar için bir şey kaybolmaz — ölçüm o andan itibaren akar.

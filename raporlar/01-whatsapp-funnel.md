# 01 — WhatsApp Funnel Bağlantıları
> Tarih: 2026-09-12 · Durum: ✅ Tamamlandı ve doğrulandı

## Yapılan değişiklikler (`index.html`)

Tüm satış CTA'ları artık `https://wa.me/905309929505?text=...` adresine, **konuma göre öndoldurulmuş Türkçe mesajla** gidiyor. Hiçbir buton boşa dönmüyor.

| Konum | `data-location` | Mesaj |
|---|---|---|
| Header "14 Gün Ücretsiz Başla" | `header` | "Merhaba, ServisPilot'un 14 günlük ücretsiz denemesini başlatmak istiyorum." |
| Hero ana CTA | `hero` | (header ile aynı) |
| Starter kartı butonu | `starter` | "Merhaba, Starter paketi (₺1.150/ay) için kurulum talep ediyorum." |
| Professional kartı butonu | `pro` | "Merhaba, Professional paketi (₺1.500/ay) için kurulum talep ediyorum." |
| Kokpit altı "14 Gün Ücretsiz Deneyin" | `kokpit` | "Merhaba, kokpiti denedim; kendi atölyem için kurulum görüşmek istiyorum." |
| Görüşme bölümü "Ya da hemen yazın" | `gorusme` | (header ile aynı) |
| Alt CTA "14 Gün Ücretsiz Başla" | `bottom-cta` | (header ile aynı) |
| Alt CTA WhatsApp butonu | `bottom-whatsapp` | "Merhaba, ServisPilot hakkında bilgi almak istiyorum." |
| Sticky bar (mobil) | `sticky` | (header ile aynı) |

Toplam: **9 WhatsApp bağlantısı** — hepsi öndoldurulmuş mesajlı ve `target="_blank" rel="noopener"`.

## Eklenen mikro kopya
- Hero CTA altı: *"Kredi kartı gerekmez · Kurulumu ücretsiz ekibimiz yapar — WhatsApp'tan yazmanız yeterli."*
- Her iki fiyat kartı butonu altı: *"Kurulumu ekibimiz yapar — WhatsApp'tan yazmanız yeterli."* (Professional'da amber tonlu)

## Nasıl test edilir
Herhangi bir "Başla" butonuna tıkla → WhatsApp açılır, mesaj kutusunda konuma özel metin hazır görünür.

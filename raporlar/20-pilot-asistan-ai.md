# 20 — Pilot Asistan 2.0: Gerçek AI Sohbet (Z.ai + Groq Failover)
> Güncelleme: 2026-09-13 · Sorun: anahtar kelime motoru doğal konuşmayı anlamıyordu ("selam" → fallback)

## Karar Süreci
- Kullanıcı talebi: "karşıda gerçek biriyle konuşuyormuş gibi" AI asistan.
- Ücretsiz sağlayıcı araştırması (Eyl 2026): **Gemini free tier günlük ~20-100 isteğe düştü** → elendi. **Z.ai GLM-4.7-Flash** tamamen ücretsiz (yumuşak limit), **Groq** günlük ~1.000-14.400 istek (yayınlanmış limit, 30/dk). Karar: **ikisi birden — Z.ai birincil, Groq yedek** (kullanıcı seçimi). Asistan sınırı: **sadece site bilgisi + WhatsApp funnel** (uydurma yok).
- Mimari: statik site + **Vercel serverless proxy** (`api/chat.js`) → API anahtarları asla tarayıcıya gitmez.

## Uygulanan Dosyalar

### 1. `api/chat.js` (yeni — Vercel serverless)
- POST `/api/chat` → `{ messages: [{role, content}] }` → `{ reply, provider }`
- **Sistem promptu (TR):** Pilot Asistan kişiliği (≤4 cümle, ılımlı emoji) + tam bilgi tabanı (3 paket fiyatı, 14 gün kartsız deneme, 15 dk ücretsiz kurulum, OCR/QR/WhatsApp onay/GİB/usta kokpiti, ISO 27001 sunucu, taahhüt yok, iletişim). Kurallar: uydurma yasak, konu dışına kibarca dön, kayıt→`[[WHATSAPP]]`, görüşme→`[[TAKVIM]]`, kişisel veri isteme, pazarlık yapma.
- **Failover zinciri:** Z.ai (401/429/15sn timeout) → Groq → ikisi de düşerse 503. Model adları env ile değiştirilebilir (`ZAI_MODEL`, `GROQ_MODEL`).
- **Koruma:** CORS kısıtlı (vercel.app + sps.servispilot.com.tr + www + localhost), mesaj 500 krk, geçmiş 10 mesaj, IP/dk 10, günlük 400, çıktı 350 token.
- **`AI_MOCK_REPLY` env:** sağlayıcı olmadan uçtan uca UI testi.

### 2. `js/chatbot.js` (güncelleme)
- Serbest yazılan her mesaj → `askAI()`: geçmiş (son 10) + 20sn timeout; yazıyor göstergesi korunur.
- **Cevap render:** sanitize (ham HTML yok), **kalın** + satır sonu desteği, `[[WHATSAPP]]`/`[[TAKVIM]]` etiketleri butona dönüşür. **Funnel güvencesi:** AI etiket koymazsa bile her cevapta WhatsApp butonu otomatik eklenir.
- **3 katmanlı fallback:** AI hata/429/kapalı → anahtar kelime motoru (14 konu) → WhatsApp fallback. Kesinti görünmez.
- Çipler bilinçli olarak anahtar motorda (doğru CTA garantisi); serbest metin AI'da.
- Geçmiş AI'ya iletilir → bağlam takibi çalışır. Yeni olaylar: `chat_ai_ok` (sağlayıcı etiketiyle), `chat_ai_fail`.
- KVKK alt notu: "Sohbetler yapay zekâ desteğiyle yanıtlanır…"

### 3. `js/config.js`
`chat.ai: { enabled: true, endpoint: '/api/chat' }` — endpoint boşsa eski davranış (geri dönüş güvenli).

### 4. `tools/dev-server.js` (yeni)
Vercel CLI'siz lokal uçtan uca test: statik site + `/api/chat` tek portta (varsayılan 8472).

## Önemli Keşif: Groq Model Kataloğu Değişmiş
`llama-3.3-70b-versatile` Groq'dan kaldırılmış (404). Yerine **`openai/gpt-oss-120b`** varsayılan yapıldı — gerçek Türkçe testte: ~1 sn yanıt, doğal dil, doğru fiyatlar, etiket kullanımı yerinde. Katalog: `GET /openai/v1/models` ile görülebilir.

## Test Sonuçları
| Senaryo | Sonuç |
|---|---|
| API birim testleri: OPTIONS 204 / GET 405 / geçersiz gövde 400 / yasak origin 403 | ✅ |
| Hız limiti: 12 ardışık istek → ilk 10 OK, 11-12. 429 | ✅ |
| Failover: geçersiz Z.ai anahtarı (401) → Groq devraldı, 200 | ✅ |
| Anahtar yok → 503 `no_provider_key` | ✅ |
| Tarayıcı + gerçek AI: "selam" → doğal karşılama (eski fallback yok) | ✅ |
| "paketler kaç para?" → 3 fiyat doğru + indirimler | ✅ |
| Konu dışı ("hava durumu") → kibarca ServisPilot'a dönüş | ✅ |
| AI cevabında WhatsApp güvence butonu | ✅ |
| Çip → anahtar motor + doğru CTA'lar | ✅ |
| 503 senaryosu → anahtar motor cevabı + eşleşmeyende WhatsApp/takvim fallback | ✅ |

## Yayına Alma (kullanıcı adımları — 5 dk)
1. z.ai hesabı → API key (kredi kartı yok) → Vercel → Settings → Environment Variables → `ZAI_API_KEY`
2. Groq anahtarı da eklenecekse: console.groq.com → `GROQ_API_KEY`
3. Redeploy — asistan canlı. Anahtar hiç girilmezse site eskisi gibi anahtar kelime motoruyla çalışır.
- Not: Bu geliştirme ortamında `GROQ_API_KEY` zaten tanımlı → lokal testler gerçek AI ile yapıldı.

## Kaynaklar
- [Gemini free tier düşürüldü — How-To Geek](https://www.howtogeek.com/gemini-slashed-free-api-limits-what-to-use-instead/) · [Groq rate limits](https://console.groq.com/docs/rate-limits) · [Z.ai GLM-4.7 dokümanı](https://docs.z.ai/guides/llm/glm-4.7)

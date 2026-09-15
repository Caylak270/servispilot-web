# MASTER BRIEF v3.0
## 7/24 Ajan Ofisi — Web Panel + GLM Abonelik API ile Çoklu Ajan Sistemi

**Versiyon:** 3.0 (v2.0 + kullanıcı kararları + kod denetimi düzeltmeleri)
**Değişiklik özeti (v2 → v3):**
1. **Telegram daraltıldı:** Yalnızca Oğuzhan abi kanalı (deploy/durum bildirimi + onun cevapları). Kullanıcının komut arayüzü DEĞİL.
2. **Kullanıcı komut merkezi = Web Panel** (komut konsolu + kritik olaylar onay/bekleme listesi) ve **Claude terminali** (ZCode oturumları, ağır işler).
3. **LLM bağlantısı: doğrudan GLM API.** Kullanıcının Z.ai aboneliğinin API bölümü kullanımı abonelikten düşer → OpenCode/Crush headless zorunluluğu KALDIRILDI. Ajanlar OpenAI-uyumlu SDK ile doğrudan çağrı yapar.
4. Kod denetimi düzeltmeleri: paralel worker (seri döngü değil), SQL düzeltme, çıktı doğrulama adımı, gerçekçi health check, private repo deploy key.

---

## 1. Vizyon (tek cümle)
Kullanıcı web panelinden komut verir (okuldayken Telegram'dan Oğuzhan'la sistem konuşur); rolleri bölünmüş ajanlar (SEO, İçerik, Araştırma, Deploy) 7/24 kuyruktan görev çekip GLM API ile çalışır, çıktılar doğrulanır, kritik olaylar akşam onay listesine düşer; tüm durum dosya + SQLite'ta kalıcıdır.

## 2. Arayüz Önceliği (v3'ün temel kararı)

| Kanal | Kim kullanır | Ne için |
|---|---|---|
| **Web Panel** (birincil) | Kullanıcı | Komut konsolu, görev tahtası, **onay/bekleme listesi**, ajan durumları, loglar, maliyet |
| **Claude terminali** (ZCode) | Kullanıcı + Pazarlama orchestrator'ı | Ağır/yaratıcı işler (tam blog yazısı, derin analiz), sistem denetimi |
| **Telegram** | Sistem ↔ Oğuzhan abi | Deploy/durum bildirimi, onun cevapları panel "Gelen Kutusu"na düşer |
| **WhatsApp** | Yok | Ana satış numarasına otomasyon BAĞLANMAZ (ban riski) |

Kullanıcı PC başında değilken bile panel ve Telegram erişilebilir (sunucu 7/24 açık).

## 3. LLM Katmanı — Doğrudan GLM Abonelik API
- Kullanıcının Z.ai aboneliğinin API bölümünden alınan anahtar + endpoint, OpenAI-uyumlu SDK ile çağrı (`base_url` + `model` config'de; örn. Z.ai paas v4 endpoint, model `glm-5.3-flash` — kurulumda gerçek değerler doğrulanır).
- **Doğrulama spike'ı (ilk iş):** tek test çağrısı → (a) yanıt geliyor mu, (b) kullanım abonelikten mi düşüyor, (c) token sayısı raporlanıyor mu. Bu test geçmeden kod yazılmaz.
- JSON isteklerinde **robust parsing**: fence temizleme + schema doğrulama + hatalıysa 1 kez düzeltme isteği.
- Her çağrının token kullanımı `usage_ledger`'a yazılır (günlük limit valfi bunu okur).
- Aylık harcama/kota tavanı: dolunca ajanlar yeni görev almaz, panele + Telegram'a bildirim.

## 4. Sistem Mimarisi
```
┌────────────────────────────┐
│  WEB PANEL (birincil UI)   │  ← kullanici: komut ver, onayla, izle
│  auth'lu, deploy'la gelir  │
└──────────────┬─────────────┘
               │ komut / onay
               ▼
┌────────────────────────────┐      ┌──────────────────────────┐
│  GÖREV KUYRUĞU (SQLite WAL)│◄─────│ TELEGRAM (sadece Oğuzhan)│
│  tasks/approvals/usage/    │      │ giden: deploy & durum    │
│  agents/memory_ref         │      │ gelen: onun cevapları →  │
└──────────────┬─────────────┘      │ panel "Gelen Kutusu"     │
               │                    └──────────────────────────┘
               ▼
┌────────────────────────────┐
│  WORKER SÜREÇLERİ (paralel)│  her ajan rolü = ayrı worker (systemd)
│  SEO | İçerik | Deploy |   │  GLM API (abonelik) + tool'lar
│  Araştırma                 │
└──────────────┬─────────────┘
               ▼
┌────────────────────────────┐
│ DOĞRULAYICI → done/failed  │  çıktı kontrolü olmadan görev bitmez
└──────────────┬─────────────┘
               ▼
   RAPORLAR + HAFIZA KARTLARI (markdown, ekip/ ile uyumlu)
```

## 5. Paralellik (v2'nin en büyük kusurunun düzeltmesi)
v2'deki tek döngü bloklayıcıydı → görevler sırayla çalışıyordu. v3 kuralı:
- **Her ajan rolü = kendi worker süreci** (ayrı systemd servisi, kendi kuyruk filtresi `assignee_role`).
- Ya da: tek dispatcher + `subprocess.Popen` (bloklamayan) + tamamlananları toplayan reaper.
- Kabul testi: 2 ajan EŞ ZAMANLI farklı görevde çalışabilmeli (log timestamps ile kanıt).

## 6. Çıktı Doğrulama (v2'de eksikti)
`done` yazılmadan önce zorunlu adım:
- **Kural tabanlı (her görevde):** çıktı dosyası var + boş değil + beklenen formatta (ör. blog taslağı ≥800 kelime, SEO raporunda tablo var) + link/görsel yolları diskte mevcut.
- **İçerik görevlerinde ek:** QA çağrısı (ikinci kısa GLM çağrısı: "bu taslak şu kriterlerde uygun mu? PASS/FAIL + neden").
- Doğrulama başarısız → `failed` + hata notu + retry (max 2), sonra `needs_approval`.

## 7. Görev Kuyruğu Şeması (düzeltilmiş)
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,                 -- deploy-pull | seo-tarama | icerik-taslagi | araştırma
    title TEXT NOT NULL,
    description TEXT,
    priority INTEGER DEFAULT 3,         -- 1 acil .. 5 arka plan
    status TEXT DEFAULT 'todo',         -- todo|blocked_by_budget|running|verifying|needs_approval|done|failed
    assignee_role TEXT,                 -- SEO|Icerik|Arastirma|Deploy
    workspace_path TEXT,
    depends_on INTEGER,
    max_retry INTEGER DEFAULT 2,
    retry_count INTEGER DEFAULT 0,
    last_error TEXT,
    output_path TEXT,
    verification TEXT,                  -- doğrulayıcı raporu
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    report TEXT
);
CREATE TABLE agents (
    name TEXT PRIMARY KEY, role TEXT,
    status TEXT DEFAULT 'idle',         -- idle|working|offline
    current_task_id INTEGER,
    last_heartbeat TIMESTAMP,
    memory_file TEXT
);
CREATE TABLE approvals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER,
    kind TEXT,                          -- message_draft | deploy | content | other
    payload TEXT,                       -- taslak mesaj / onaylanacak şey
    status TEXT DEFAULT 'pending',      -- pending|approved|rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    decided_at TIMESTAMP
);
CREATE TABLE usage_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER, agent_role TEXT,
    input_tokens INTEGER, output_tokens INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**SQL notu (v2 hatası düzeltildi):** günlük kullanım `SELECT SUM(input_tokens+output_tokens) FROM usage_ledger WHERE date(created_at)=date('now')` — COALESCE ile null koruması: `SUM(COALESCE(input_tokens,0)+COALESCE(output_tokens,0))`.

## 8. Kullanım Limiti Valfi
- Günlük token bütçesi config'de (abonelik kotasına göre; ilk hafta gözlem + kalibrasyon).
- Her dispatch öncesi: `bugün_kullanılan + görev_tahmini <= bütçe` → aşılırsa `blocked_by_budget` + panele/Telegram'a bildirim.
- %-90 uyarısı, %100'de kuyruk durur (ertesi gün otomatik devam). Öncelik sıralaması: bütçe azaldıkça yalnız priority 1-2 işlenir.

## 9. Ajan Rolleri ve Hafıza (değişmedi, onaylandı)
Her headless/API görevi üç parça taze context ile başlar: **rol kartı** (statik) + **hafıza kartı** (ajan kendi günceller, son 15-20 satır, eskiler arşive) + **görev brief'i** (kabul kriterleriyle). Görev sonunda ajan hafıza kartına tek satır özet ekler.
- Kartlar `ekip/agent-*.md` yapısıyla uyumlu tutulur (tek kaynak mantığı): SEO/İçerik kartları `ekip/agent-seo-icerik.md` ile, Meta bilgileri `ekip/agent-meta-reklam.md` ile senkron.
- Rol kartlarının içeriği (marka tonu, kanca mesajlar, SEO görev tanımları) Pazarlama orchestrator'ı (ZCode) hazırlar.

## 10. MVP Görev Tipleri
1. **deploy-pull** — sitede `git pull` → health check (gerçek kontrol: `curl -s https://www.servispilot.com.tr/ | grep -o "tailwind.min.css?v="` gibi sürüm işareti; v2'deki var olmayan `/health` değil) → başarısızsa `git reset --hard PREV` rollback
2. **seo-tarama** — site/kelime/rakip kontrolü → yapılandırılmış `.md` rapor (SerpApi ücretsiz kota ile; SearXNG Faz 2'de)
3. **icerik-taslagi** — konu/SEO raporundan kaynaklı blog taslağı (doğrulayıcı: kelime sayısı + QA çağrısı)
`depends_on` zinciri: seo-tarama bitince otomatik icerik-taslagi doğurabilir.

## 11. Web Panel Spesifikasyonu (birincil UI)
Sayfalar:
1. **Dashboard:** görev listesi (durum renkleri), ajan kalp atışları (10 dk'yı geçen kırmızı), günlük token kullanım çubuğu, onay kuyruğu özeti
2. **Komut Konsolu:** görev oluştur (tip seç + başlık + açıklama + öncelik), hızlı komutlar (deploy-pull, tarama başlat)
3. **Onay/Bekleme Listesi:** kritik olaylar (mesaj taslakları, içerik onayı, deploy onayı) — Onayla/Reddet/Düzenle; akşam toplu onay akışı burada
4. **Gelen Kutusu:** Oğuzhan'ın Telegram cevapları
5. **Ajanlar:** kartlar, heartbeat, son görevler
6. **Loglar:** task-<id> kayıtları, hata geçmişi
Auth: kullanıcı adı + şifre (secret'ta), HTTPS (Caddy/Let's Encrypt ücretsiz). Flask veya FastAPI tek dosyalık uygulama; ağır framework yok.

## 12. Telegram (yalnız Oğuzhan kanalı)
- Bot: `python-telegram-bot`, polling. **Allowlist: yalnızca Oğuzhan'ın chat_id'si** (ilk kurulumda bota bir kez yazar, chat_id kaydedilir) + sistem kendi çıkışları için kullanıcının chat_id'sine de bildirim atabilir.
- Giden: "Yeni commit var (082bfcf), pull alındı, health check OK", günlük durum özeti.
- Gelen: Oğuzhan'ın cevapları panel Gelen Kutusu'na düşer (kritikse onay kuyruğuna).
- Şablon dışı giden mesajlar → onay kuyruğu (KRİTİK 7).

## 13. Kurtarma ve Servisler
- `recovery.py` her worker/daemon başlamadan önce: running→todo, working→idle.
- systemd birimleri: `ai-orchestrator.service`, `ai-worker-seo.service`, `ai-worker-icerik.service`, `ai-worker-deploy.service`, `ai-telegram.service`, `ai-panel.service` — hepsi `Restart=always`, `User=aiagent` (root değil).
- `board.db` günlük yedek (cron, 14 gün saklama).

## 14. Deploy Akışı ve Private Repo
- Sistem Oğuzhan'ın sunucusunda çalışıyorsa deploy worker'ı doğrudan `git pull` yapar; site klasörü git clone + **deploy key** (private repo için Oğuzhan bir kez ekler).
- Deploy sonrası health check (bölüm 10) → başarısızsa otomatik rollback.
- Repo şu an PUBLIC (geçici) — Oğuzhan clone aldıktan sonra private'e döner (komut hazır). Deploy key bu durumda şart.

## 15. Güvenlik Özeti
`aiagent` non-root kullanıcı · komut allowlist + blacklist (rm -rf, force-push, drop) · ajanlar worktree'de, main protected · sırlar `.env` (git dışı) · panel auth + HTTPS · Telegram allowlist (Oğuzhan + kullanıcı chat_id) · ana WhatsApp hattına otomasyon yok · ajan cwd dışına yazamaz.

## 16. Klasör Yapısı
```
ai-office/
├── board.db · recovery.py · orchestrator.py (dispatcher)
├── workers/ (seo.py, icerik.py, deploy.py, arastirma.py)
├── verifier/ (rules.py, qa_call.py)
├── telegram_bot.py · panel/ (app.py + templates)
├── configs/ (llm.json: base_url/model; limits.json: günlük bütçe)
├── memory/ (kartlar — ekip/ ile senkron)
├── logs/ (task-<id>.log)
└── worktree'ler repo dışında ../<rol>-workspace
```

## 17. Kurulum Adımları
1. Doğrulama spike'ı: abonelik API'siyle 1 test çağrısı (KRİTİK — geçmeden devam yok)
2. Oğuzhan sunucusu: `aiagent` kullanıcısı + site klasörüne deploy key + Python 3.10+
3. board.db şemasını oluştur, 4 ajanı kaydet, worktree'leri aç, memory kartlarını yaz
4. Worker'ları + dispatcher + recovery + systemd birimlerini kur
5. Paneli kur (auth + HTTPS)
6. Telegram botu kur (Oğuzhan chat_id kaydı + kullanıcı chat_id bildirim)
7. İlk hafta yalnız 3 görev tipiyle kesintisiz çalıştır → token kullanımını gözlemle → limit valfini kalibre et

## 18. Kabul Kriterleri
- [ ] Panel + auth ile giriş; komut konsolundan görev oluşturma çalışır
- [ ] Telegram'dan Oğuzhan'a deploy bildirimi otomatik gider; cevabı panel Gelen Kutusu'na düşer
- [ ] 2 ajan EŞ ZAMANLI farklı görevlerde çalışır (log timestamp kanıtı)
- [ ] Doğrulayıcı başarısız çıktıda `done` yazmaz (test: kasıtlı boş çıktı)
- [ ] Süreç kill + restart → running görevler kayıpsız kuyruğa döner
- [ ] Günlük token limiti dolunca kuyruk durur + bildirim gider
- [ ] Şablon dışı insan mesajı onaysız gitmez
- [ ] Deploy health check + otomatik rollback çalışır (kasıtlı bozuk commit testi)
- [ ] Ajan hafızası kart dosyalarında, her görevde tek satır özet güncellenir
- [ ] Sistem tamamen kullanıcının GLM abonelik API'siyle çalışır; token tüketimi panelde görünür

## 19. Tuzaklar
1. Serverless'ta ajan çalıştırmaya kalkmak (süre limitleri) — kalıcı süreç şart
2. Bloklayan döngüyle "paralel" sanmak (v2 hatası) — gerçek paralellik test edilmeli
3. LLM JSON'unu doğrulamadan kullanmak — robust parser + QA adımı şart
4. Telegram'ı kullanıcı komut arayüzü yapmaya kalkmak — v3'te panel birincil, Telegram yalnız Oğuzhan
5. Ana WhatsApp numarasına otomasyon — ASLA
6. İlk hafta tüm özellikleri kurmaya kalkmak — 3 görev tipi + 1 hafta kesintisiz çalışma kanıtı önce
7. Repo token/sır sızdırma — bu projede yaşandı, tekrarlanmaz (sırlar env'de)

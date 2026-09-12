# 14 — GitHub Push
> Tarih: 2026-09-13 · Durum: ✅ Tamamlandı

## Sonuç
Proje GitHub'a push edildi: **https://github.com/Caylak270/servispilot-web** (gizli/private)

- Branch: `main`
- Commitler: `35781a0` (initial: site + simülatör + raporlar) → `657db26` (rapor güncellemeleri)
- Uzak: `origin` = github.com/Caylak270/servispilot-web.git

## Kurulum yapılanlar
1. **GitHub CLI** kuruldu (winget → `C:\Program Files\GitHub CLI\gh.exe`, v2.100.0)
2. Yetkilendirme: OAuth cihaz-kodu akışı (kullanıcı https://github.com/login/device üzerinden `CCD0-8CE9` kodunu onayladı) → `gh auth login --with-token` → `gh auth setup-git`
3. Repo oluşturma + push: `gh repo create servispilot-web --private --source . --remote origin --push`

## Güvenlik
- `.gitignore` ile repoya **alınmayanlar**: `.zcode/` (21st.dev API anahtarı), `research/` (içinde **Apify API token'ı** hardcoded duruyordu!), `_tmp/`
- ⚠️ **Öneri:** `research/` içindeki Apify token'ı github dışında da görüldüyse (chat/ekran paylaşımları) Apify panosundan **yenilenmeli**. İleride research dosyaları repoya gerekirse token önce ortam değişkenine taşınmalı.

## Sonraki pushlar için
Değişiklik sonrası: `git add -A && git commit -m "..." && git push` — yetkilendirme kalıcı, tekrar kod istenmez.

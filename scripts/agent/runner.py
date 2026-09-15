#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ServisPilot Ajan Runner — GitHub Actions icinde calisir.
GLM API (abonelik anahtari) ile gorevi yapar, ciktiyi dosyaya yazar.

Env: GLM_API_KEY, GLM_BASE_URL, GLM_MODEL, TASK_TYPE, TASK_TOPIC
"""
import json, os, sys, time, urllib.request, datetime

API_KEY = os.environ.get("GLM_API_KEY", "")
BASE_URL = os.environ.get("GLM_BASE_URL", "https://api.z.ai/api/paas/v4").rstrip("/")
MODEL = os.environ.get("GLM_MODEL", "glm-5.3-flash")
TASK_TYPE = os.environ.get("TASK_TYPE", "seo-scan")
TASK_TOPIC = os.environ.get("TASK_TOPIC", "")
TODAY = datetime.date.today().isoformat()

def call_llm(system, user, max_tokens=4000):
    """OpenAI-uyumlu chat completion. Fence temizlemeli JSON/TEXT doneer."""
    body = json.dumps({
        "model": MODEL,
        "messages": [{"role": "system", "content": system},
                     {"role": "user", "content": user}],
        "max_tokens": max_tokens,
        "temperature": 0.6,
    }).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/chat/completions", data=body,
        headers={"Content-Type": "application/json",
                 "Authorization": f"Bearer {API_KEY}"})
    for attempt in range(3):  # retry + backoff
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                data = json.load(r)
            usage = data.get("usage", {})
            print(f"token kullanimi: {usage.get('prompt_tokens')} in / {usage.get('completion_tokens')} out")
            content = data["choices"][0]["message"]["content"] or ""
            # markdown fence temizligi
            if content.strip().startswith("```"):
                content = content.strip().strip("`")
                if content.startswith("json"): content = content[4:]
            return content.strip()
        except Exception as e:
            print(f"deneme {attempt+1} hata: {e}")
            time.sleep(5 * (attempt + 1))
    raise RuntimeError("GLM cagrisi basarisiz")

SEO_SYSTEM = """Sen ServisPilot'un SEO analist ajansın. ServisPilot: Türkiye'deki özel oto
servisleri için bulut tabanlı servis yönetimi + muhasebe programı. Hedef kitle: oto servis
sahipleri. Görevin: verilen konuyu tara, fırsatları ve içerik önerilerini yapılandırılmış
markdown raporda topla. Türkçe yaz, uydurma veri yok."""

CONTENT_SYSTEM = """Sen ServisPilot'un içerik ajansın. Hedef kitle: Türkiye'deki özel oto servis
sahipleri (ustalar). Sade, saygılı, usta ağzı; boş kurumsal dil yok. SEO: hedef kelime başlıkta ve
ilk paragrafta, H2 yapısı, 1200+ kelime, sonunda CTA ("14 gün ücretsiz, kredi kartı yok — WhatsApp'tan yaz").
Kaynak teminatı: emin olmadığın rakamı yazma."""

def main():
    os.makedirs("ekip/raporlar", exist_ok=True)
    os.makedirs("blog-taslaklari", exist_ok=True)

    if TASK_TYPE == "seo-scan":
        topic = TASK_TOPIC or "oto servis programı pazarı"
        out = call_llm(SEO_SYSTEM,
            f"Konu: {topic}\nBugünün tarihi: {TODAY}\n"
            "Şu yapıda markdown rapor üret: 1) Öne çıkan 5 içerik fırsatı (başlık + hedef kelime + neden) "
            "2) Rakip hareketleri için kontrol listesi 3) Önümüzdeki hafta için 3 aksiyon.",
            max_tokens=2000)
        path = f"ekip/raporlar/{TODAY}-seo-tarama.md"
    elif TASK_TYPE == "content":
        if not TASK_TOPIC:
            print("TASK_TOPIC bos — content gorevi icin konu gerekli"); sys.exit(1)
        out = call_llm(CONTENT_SYSTEM,
            f"Konu: {TASK_TOPIC}\nBugün: {TODAY}\n"
            "1200+ kelimelik blog taslağı üret: H1 başlık, meta description (155 krk), "
            "giriş, H2 bölümler, karşılaştırma tablosu, SSS (4 soru), CTA.",
            max_tokens=6000)
        slug = TASK_TOPIC.lower().replace(" ", "-").replace("ı","i").replace("ğ","g").replace("ü","u").replace("ş","s").replace("ö","o").replace("ç","c")
        slug = "".join(c for c in slug if c.isalnum() or c == "-")[:60]
        path = f"blog-taslaklari/{TODAY}-{slug or 'taslak'}.md"
    else:
        print(f"bilinmeyen gorev tipi: {TASK_TYPE}"); sys.exit(1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(out)
    print(f"CIKTI: {path} ({len(out)} karakter)")

if __name__ == "__main__":
    main()

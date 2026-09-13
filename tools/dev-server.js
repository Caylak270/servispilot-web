/* ============================================================
   ServisPilot — Lokal geliştirme sunucusu
   Statik site + /api/chat fonksiyonunu tek portta çalıştırır
   (Vercel CLI kurmadan uçtan uca test için).

   Kullanım:
     node tools/dev-server.js [port]            (varsayılan 8472)
   Sağlayıcı anahtarı olmadan UI testi:
     AI_MOCK_REPLY="Merhaba 👋 **deneme** yanıtı [[WHATSAPP]]" node tools/dev-server.js
   ============================================================ */
const http = require('http');
const fs = require('fs');
const path = require('path');
const handler = require('../api/chat.js');

const root = path.join(__dirname, '..');
const port = Number(process.argv[2]) || 8472;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

http.createServer(function (req, res) {
  const url = (req.url || '/').split('?')[0];

  if (url === '/api/chat') {
    return handler(req, res);
  }

  const rel = url === '/' ? '/index.html' : decodeURIComponent(url);
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    return res.end();
  }
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404');
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, function () {
  console.log('Dev sunucu: http://localhost:' + port);
  if (process.env.AI_MOCK_REPLY) console.log('AI_MOCK_REPLY aktif — sağlayıcı çağrılmadan mock yanıt dönüyor.');
});

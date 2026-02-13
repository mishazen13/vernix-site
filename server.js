const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const pageMap = {
  '/': 'index.html',
  '/rules': 'rules.html',
  '/donate': 'donate.html'
};

const apiData = {
  '/api/home': {
    title: 'Vernix Network',
    description: 'Новый Minecraft сервер с PvP, кланами, ивентами и дружным комьюнити.',
    online: 124,
    ip: 'play.vernix.ru'
  },
  '/api/rules': {
    title: 'Правила сервера',
    rules: [
      'Уважайте других игроков и администрацию.',
      'Запрещены читы, x-ray и любые сторонние преимущества.',
      'Никакого спама, токсичности и рекламы сторонних проектов.',
      'Рейды разрешены только в рамках игровых механик.'
    ]
  },
  '/api/donate': {
    title: 'Донат-магазин',
    packs: [
      { name: 'Vernix Plus', price: '149 ₽', perks: 'Кит + цветной ник + 2 дома' },
      { name: 'Vernix Elite', price: '349 ₽', perks: 'Кит Elite + префикс + /fly в лобби' },
      { name: 'Vernix Legend', price: '699 ₽', perks: 'Все привилегии + уникальные косметики' }
    ]
  }
};

const mime = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=UTF-8'
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);

  if (apiData[requestPath]) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify(apiData[requestPath]));
    return;
  }

  if (pageMap[requestPath]) {
    sendFile(res, path.join(publicDir, pageMap[requestPath]));
    return;
  }

  const staticFile = path.normalize(path.join(publicDir, requestPath));
  if (!staticFile.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(staticFile, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }
    sendFile(res, staticFile);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Vernix site running: http://localhost:${PORT}`);
});

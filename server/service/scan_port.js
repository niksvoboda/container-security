const net = require('net');

const host = '192.168.0.1'; // IP-адрес для сканирования
const startPort = 1; // начальный порт для сканирования
const endPort = 65535; // конечный порт для сканирования

console.log(`Scanning ports on ${host}...\n`);

// Функция для сканирования портов
function scanPort(port) {
  const socket = new net.Socket();

  socket.setTimeout(1000);

  socket.on('connect', function() {
    console.log(`Port ${port}: OPEN`);
    socket.destroy();
  });

  socket.on('timeout', function() {
    socket.destroy();
  });

  socket.on('error', function(error) {
    // Если не удалось установить соединение, то порт закрыт
    if (error.code === 'ECONNREFUSED') {
      console.log(`Port ${port}: CLOSED`);
    }
  });

  socket.connect(port, host);
}

// Цикл для сканирования всех портов
for (let port = startPort; port <= endPort; port++) {
  scanPort(port);
}
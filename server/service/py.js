const { spawn } = require('child_process');

// Запуск Python скрипта
const pythonScript = spawn('C:/Python310/python.exe', ['tools/scan_port.py', '-p', '-k', '192.168.0.100']);

// Обрабатываем данные, которые возвращает Python скрипт
pythonScript.stdout.on('data', (data) => {
  console.log(`Received data from Python script: ${data}`);
});

// Обрабатываем ошибки
pythonScript.stderr.on('data', (error) => {
  console.error(`Error received from Python script: ${error}`);
});

// Обработка завершения работы скрипта
pythonScript.on('close', (code) => {
  console.log(`Python script exited with code ${code}`);
});
'use strict';

const os = require('os');

const BYTES_IN_GB = 1024 ** 3;
const FREE_MEMORY_THRESHOLD_GB = 4;

function printOsInfo() {
  const freeMemoryGB = (os.freemem() / BYTES_IN_GB).toFixed(2);
  const totalMemoryGB = (os.totalmem() / BYTES_IN_GB).toFixed(2);
  const networkInterfaces = os.networkInterfaces();

  console.log(`Платформа:           ${os.platform()}`);
  console.log(`Архитектура:         ${os.arch()}`);
  console.log(`Имя хоста:           ${os.hostname()}`);
  console.log(`Главная директория:  ${os.homedir()}`);
  console.log(`Свободная память:    ${freeMemoryGB} GB`);
  console.log(`Общая память:        ${totalMemoryGB} GB`);
  console.log(`Время работы ОС:     ${(os.uptime() / 3600).toFixed(2)} ч`);
  console.log(`Количество ядер CPU: ${os.cpus().length}`);
  console.log('Сетевые интерфейсы:');

  for (const [name, addresses] of Object.entries(networkInterfaces)) {
    for (const addr of addresses) {
      if (addr.family === 'IPv4') {
        console.log(`  ${name}: ${addr.address} (${addr.family})`);
      }
    }
  }
}

function checkFreeMemory() {
  const freeMemoryGB = os.freemem() / BYTES_IN_GB;
  const isEnough = freeMemoryGB > FREE_MEMORY_THRESHOLD_GB;

  console.log(
    `\nПроверка памяти: ${freeMemoryGB.toFixed(2)} GB свободно — ` +
    `${isEnough ? '✔ больше' : '✘ меньше'} ${FREE_MEMORY_THRESHOLD_GB} GB`
  );

  return isEnough;
}

function withAccessControl(fn) {
  const mode = process.env.MODE;

  if (mode === 'admin') {
    console.log(`[ACCESS] Режим "${mode}" — доступ разрешён\n`);
    fn();
  } else {
    console.log(`[ACCESS] Режим "${mode}" — доступ запрещён. Требуется режим "admin"`);
  }
}

module.exports = { printOsInfo, checkFreeMemory, withAccessControl };

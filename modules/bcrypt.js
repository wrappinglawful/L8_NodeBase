'use strict';

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function generatePasswords(count) {
  const passwords = [];
  for (let i = 1; i <= count; i++) {
    passwords.push(`SecureP@ssw0rd_${i}`);
  }
  return passwords;
}

async function hashPassword(password, index) {
  const start = performance.now();
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const end = performance.now();
  const timeMs = (end - start).toFixed(2);

  return { index, hash, timeMs: parseFloat(timeMs) };
}

async function runBcryptDemo() {
  const PASSWORD_COUNT = 13;
  const passwords = generatePasswords(PASSWORD_COUNT);

  console.log(`Шифрование ${PASSWORD_COUNT} паролей одновременно (saltRounds = ${SALT_ROUNDS})...\n`);

  const totalStart = performance.now();

  const results = await Promise.all(
    passwords.map((pwd, i) => hashPassword(pwd, i + 1))
  );

  const totalEnd = performance.now();
  const totalTimeMs = (totalEnd - totalStart).toFixed(2);

  for (const { index, hash, timeMs } of results) {
    console.log(`  Пароль #${String(index).padStart(2, '0')}: ${timeMs} мс  →  ${hash.substring(0, 30)}...`);
  }

  const times = results.map((r) => r.timeMs);
  const avgTime = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
  const minTime = Math.min(...times).toFixed(2);
  const maxTime = Math.max(...times).toFixed(2);

  console.log(`\n  Общее время:     ${totalTimeMs} мс`);
  console.log(`  Среднее время:   ${avgTime} мс`);
  console.log(`  Минимальное:     ${minTime} мс`);
  console.log(`  Максимальное:    ${maxTime} мс`);

  console.log('\n  --- Анализ результатов ---');
  console.log('  Все 13 паролей шифруются параллельно через Promise.all.');
  console.log('  bcrypt — CPU-bound операция: каждый вызов hash() выполняется');
  console.log('  в отдельном потоке libuv thread pool (по умолчанию 4 потока).');
  console.log('  Поэтому первые ~4 пароля шифруются быстрее (попадают в пул сразу),');
  console.log('  а остальные ждут освобождения потоков, что увеличивает их общее время.');
  console.log('  Общее время ≈ (13 / 4) × время одного хеширования, а не 13 × время.');
}

module.exports = { runBcryptDemo };

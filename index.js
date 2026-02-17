'use strict';

const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.ENV_FILE || '.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

if (envFile !== '.env') {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

const { printStudentInfo } = require('./src/studentInfo');
const { printOsInfo, checkFreeMemory, withAccessControl } = require('./os');
const { runBcryptDemo } = require('./modules/bcrypt');

async function main() {
  console.log('='.repeat(60));
  console.log(`  Текущий режим работы приложения: ${process.env.MODE}`);
  console.log('='.repeat(60));

  console.log('\n--- Раздел 1: Информация о студенте (dotenv) ---\n');
  printStudentInfo();

  console.log('\n--- Раздел 2: Модуль OS ---\n');
  withAccessControl(printOsInfo);
  checkFreeMemory();

  console.log('\n--- Раздел 3: Шифрование паролей (bcrypt) ---\n');
  await runBcryptDemo();

  console.log('\n' + '='.repeat(60));
  console.log('  Демонстрация завершена');
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Критическая ошибка приложения:', err);
  process.exit(1);
});

'use strict';

const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.ENV_FILE || '.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const { fetchData } = require('./custom/fetchData');
const { sortStrings } = require('./custom/sortStrings');
const { writeFileAsync, createDirAsync } = require('./custom/fileSystem');

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_DIR = path.join(__dirname, 'users');
const NAMES_FILE = path.join(USERS_DIR, 'names.txt');
const EMAILS_FILE = path.join(USERS_DIR, 'emails.txt');

async function main() {
  console.log('='.repeat(60));
  console.log('  Демонстрация кастомных модулей (use.js)');
  console.log('='.repeat(60));

  console.log('\n[1] Загрузка пользователей с JSONPlaceholder...');
  const result = await fetchData(USERS_API_URL);

  if (result.error) {
    console.error('Ошибка загрузки:', result.error.message);
    process.exit(1);
  }

  console.log(`    Загружено пользователей: ${result.data.length}`);
  console.log(`    isLoading: ${result.isLoading}`);
  console.log(`    error: ${result.error}`);

  const users = result.data;

  console.log('\n[2] Сортировка пользователей по именам...');

  const names = users.map((user) => user.name);
  const sortedNames = sortStrings(names);

  console.log('    Исходный порядок:');
  names.forEach((name, i) => console.log(`      ${i + 1}. ${name}`));

  console.log('\n    Отсортированный порядок:');
  sortedNames.forEach((name, i) => console.log(`      ${i + 1}. ${name}`));

  const sortedUsers = [...users].sort((a, b) => {
    const cleanA = a.name.replace(/\s/g, '').toLowerCase();
    const cleanB = b.name.replace(/\s/g, '').toLowerCase();
    return cleanA.localeCompare(cleanB);
  });

  console.log('\n[3] Создание структуры users/ и запись данных...');

  await createDirAsync(USERS_DIR);

  const namesContent = sortedUsers
    .map((user, i) => `${i + 1}. ${user.name}`)
    .join('\n');

  const emailsContent = sortedUsers
    .map((user, i) => `${i + 1}. ${user.email}`)
    .join('\n');

  await writeFileAsync(NAMES_FILE, namesContent);
  await writeFileAsync(EMAILS_FILE, emailsContent);

  console.log(`    Создана директория: ${USERS_DIR}`);
  console.log(`    Записан файл:      ${NAMES_FILE}`);
  console.log(`    Записан файл:      ${EMAILS_FILE}`);

  console.log('\n    Содержимое names.txt:');
  console.log(`    ${namesContent.split('\n').join('\n    ')}`);

  console.log('\n    Содержимое emails.txt:');
  console.log(`    ${emailsContent.split('\n').join('\n    ')}`);

  console.log('\n' + '='.repeat(60));
  console.log('  Демонстрация завершена');
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});

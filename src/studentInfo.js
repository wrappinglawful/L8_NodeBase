'use strict';

function printStudentInfo() {
  const { FIRST_NAME, LAST_NAME, GROUP_NUMBER, STUDENT_NUMBER } = process.env;

  if (!FIRST_NAME || !LAST_NAME || !GROUP_NUMBER || !STUDENT_NUMBER) {
    console.warn('[WARN] Не все переменные окружения заданы в .env файле');
  }

  console.log(`Имя:              ${FIRST_NAME || 'не задано'}`);
  console.log(`Фамилия:          ${LAST_NAME || 'не задано'}`);
  console.log(`Номер группы:     ${GROUP_NUMBER || 'не задано'}`);
  console.log(`Номер по списку:  ${STUDENT_NUMBER || 'не задано'}`);
}

module.exports = { printStudentInfo };

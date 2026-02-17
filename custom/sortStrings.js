'use strict';

function sortStrings(strings) {
  if (!Array.isArray(strings)) {
    throw new TypeError('Аргумент должен быть массивом строк');
  }

  return [...strings].sort((a, b) => {
    const cleanA = a.replace(/\s/g, '').toLowerCase();
    const cleanB = b.replace(/\s/g, '').toLowerCase();
    return cleanA.localeCompare(cleanB);
  });
}

module.exports = { sortStrings };

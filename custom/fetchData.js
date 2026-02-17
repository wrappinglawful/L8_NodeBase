'use strict';

async function fetchData(url) {
  const result = {
    data: [],
    isLoading: true,
    error: null,
  };

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }

    result.data = await response.json();
  } catch (err) {
    result.error = err instanceof Error ? err : new Error(String(err));
  } finally {
    result.isLoading = false;
  }

  return result;
}

module.exports = { fetchData };

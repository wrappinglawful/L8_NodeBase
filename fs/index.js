'use strict';

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const SERVICE_ENTRIES = new Set([
  'node_modules',
  '.git',
  '.env',
  '.env.production',
  '.env.development',
  '.env.domain',
  '.gitignore',
  'package.json',
  'package-lock.json',
]);

function writeFileSync(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, data, 'utf-8');
}

function readFileSync(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Файл не найден: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function updateFileSync(filePath, newData) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Файл не найден: ${filePath}`);
  }
  fs.writeFileSync(filePath, newData, 'utf-8');
}

function clearFileSync(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Файл не найден: ${filePath}`);
  }
  fs.writeFileSync(filePath, '', 'utf-8');
}

function removeNoiseSync(filePath) {
  let content = readFileSync(filePath);
  content = content.replace(/\d/g, '');
  content = content.toLowerCase();
  fs.writeFileSync(filePath, content, 'utf-8');
}

function copyFileSync(sourcePath, destPath) {
  const content = readFileSync(sourcePath);
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(destPath, content, 'utf-8');
}

function createDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function removeDirSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function listProjectFilesSync(dirPath) {
  const results = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (SERVICE_ENTRIES.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  }

  walk(dirPath);
  return results;
}

function cleanProjectSync(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (SERVICE_ENTRIES.has(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

async function writeFileAsync(filePath, data) {
  const dir = path.dirname(filePath);
  await fsPromises.mkdir(dir, { recursive: true });
  await fsPromises.writeFile(filePath, data, 'utf-8');
}

async function readFileAsync(filePath) {
  try {
    return await fsPromises.readFile(filePath, 'utf-8');
  } catch {
    throw new Error(`Файл не найден: ${filePath}`);
  }
}

async function updateFileAsync(filePath, newData) {
  await fsPromises.access(filePath);
  await fsPromises.writeFile(filePath, newData, 'utf-8');
}

async function clearFileAsync(filePath) {
  await fsPromises.access(filePath);
  await fsPromises.writeFile(filePath, '', 'utf-8');
}

async function removeNoiseAsync(filePath) {
  let content = await readFileAsync(filePath);
  content = content.replace(/\d/g, '');
  content = content.toLowerCase();
  await fsPromises.writeFile(filePath, content, 'utf-8');
}

async function copyFileAsync(sourcePath, destPath) {
  const content = await readFileAsync(sourcePath);
  const dir = path.dirname(destPath);
  await fsPromises.mkdir(dir, { recursive: true });
  await fsPromises.writeFile(destPath, content, 'utf-8');
}

async function createDirAsync(dirPath) {
  await fsPromises.mkdir(dirPath, { recursive: true });
}

async function removeDirAsync(dirPath) {
  try {
    await fsPromises.rm(dirPath, { recursive: true, force: true });
  } catch {
  }
}

async function listProjectFilesAsync(dirPath) {
  const results = [];

  async function walk(currentPath) {
    const entries = await fsPromises.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (SERVICE_ENTRIES.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  }

  await walk(dirPath);
  return results;
}

async function cleanProjectAsync(dirPath) {
  const entries = await fsPromises.readdir(dirPath, { withFileTypes: true });

  const tasks = entries
    .filter((entry) => !SERVICE_ENTRIES.has(entry.name))
    .map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      return entry.isDirectory()
        ? fsPromises.rm(fullPath, { recursive: true, force: true })
        : fsPromises.unlink(fullPath);
    });

  await Promise.all(tasks);
}

module.exports = {
  writeFileSync,
  readFileSync,
  updateFileSync,
  clearFileSync,
  removeNoiseSync,
  copyFileSync,
  createDirSync,
  removeDirSync,
  listProjectFilesSync,
  cleanProjectSync,

  writeFileAsync,
  readFileAsync,
  updateFileAsync,
  clearFileAsync,
  removeNoiseAsync,
  copyFileAsync,
  createDirAsync,
  removeDirAsync,
  listProjectFilesAsync,
  cleanProjectAsync,

  SERVICE_ENTRIES,
};

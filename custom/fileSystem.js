'use strict';

const {
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
} = require('../fs');

const sync = {
  writeFile: writeFileSync,
  readFile: readFileSync,
  updateFile: updateFileSync,
  clearFile: clearFileSync,
  removeNoise: removeNoiseSync,
  copyFile: copyFileSync,
  createDir: createDirSync,
  removeDir: removeDirSync,
  listProjectFiles: listProjectFilesSync,
  cleanProject: cleanProjectSync,
};

const async_ = {
  writeFile: writeFileAsync,
  readFile: readFileAsync,
  updateFile: updateFileAsync,
  clearFile: clearFileAsync,
  removeNoise: removeNoiseAsync,
  copyFile: copyFileAsync,
  createDir: createDirAsync,
  removeDir: removeDirAsync,
  listProjectFiles: listProjectFilesAsync,
  cleanProject: cleanProjectAsync,
};

module.exports = {
  sync,
  async: async_,

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
};

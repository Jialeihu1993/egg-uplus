'use strict';
const path = require('path');
module.exports = {
  // 方法扩展
  package(key) {
    const pack = getpackage();
    return key ? pack[key] : pack;
  },
  // 属性扩展
  get allpackage() {
    return getpackage();
  },
};
function getpackage() {
  const filepath = path.join(process.cwd(), 'package.json');
  const pack = require(filepath);
  return pack;
}

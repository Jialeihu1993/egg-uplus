'use strict';
const dayjs = require('dayjs');

module.exports = {
  base64Encode(str = '') {
    return new Buffer(str).toString('base64');
  },
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  timestamp(date) {
    return new Date(date).getTime();
  },
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const key in source) {
        if (!arr.includes(key)) {
          obj[key] = source[key];
        }
      }
      return obj;
    }
  },
};

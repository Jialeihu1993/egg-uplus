'use strict';

module.exports = {
  get token() {
    console.log('========', this.header);
    return this.get('token');
  },
};

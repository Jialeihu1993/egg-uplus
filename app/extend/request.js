'use strict';

module.exports = {
  get token() {
    // console.log('========', this.header, this.get('token'));
    return this.get('token');
  },
};

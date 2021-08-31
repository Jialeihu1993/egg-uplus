'use strict';

const BaseService = require('./base');

class HouseService extends BaseService {
  async hot() {
    return this.run(async (ctx, app) => {
      const result = ctx.model.House.findAll({
        limit: 4,
      });
      return result;
    });
  }
}

module.exports = HouseService;

'use strict';

const BaseService = require('./base');

class HouseService extends BaseService {
  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        limit: 4,
        order: [[ 'showCount', 'DESC' ]],
        attributes: {
          exclude: [ 'startTime', 'endTime', 'publishTime' ],
        },
        include: [{
          model: app.model.Imgs,
          limit: 1,
          attributes: [ 'url' ],
        }],
      });
      // console.log('hhh', result);
      return result;
    });
  }
}

module.exports = HouseService;

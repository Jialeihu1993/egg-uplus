'use strict';

const BaseService = require('./base');

class HouseService extends BaseService {
  commonAttr(app) {
    return {
      order: [[ 'showCount', 'DESC' ]],
      attributes: {
        exclude: [ 'startTime', 'endTime', 'publishTime' ],
      },
      include: [{
        model: app.model.Imgs,
        limit: 1,
        attributes: [ 'url' ],
      }],
    };
  }
  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        limit: 4,
        ...this.commonAttr(app),
      });
      // console.log('hhh', result);
      return result;
    });
  }

  async search(params) {
    return this.run(async (ctx, app) => {
      // 小于
      const { lte, gte } = app.Sequelize.Op;
      const _where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          [lte]: params.startTime,
        },
        endTime: {
          [gte]: params.endTime,
        },
      };
      const result = await ctx.model.House.findAll({
        limit: 4,
        ...this.commonAttr(app),
        offset: (params.pageNum - 1) * params.pageSize,
        where: _where,
      });
      // console.log('hhh', result);
      return result;
    });
  }
  async details(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: {
          id,
        },
        include: [{
          model: app.model.Imgs,
        }],
      });
      return result;
    });
  }
}

module.exports = HouseService;

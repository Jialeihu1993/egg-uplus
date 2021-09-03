'use strict';


// const Service = require('egg').Service;
const BaseSerice = require('./base');
class OrdersService extends BaseSerice {
  async hasOrder(params) {
    return this.run(async ctx => {
      const res = await ctx.model.Orders.findOne({
        where: {
          userId: params.userId,
          houseId: params.houseId,
        },
      });
      return res;
    });
  }

  async addOrder(params) {
    return this.run(async ctx => {
      const res = await ctx.model.Orders.create(params);
      return res;
    });
  }

  async delOrder(id) {
    return this.run(async ctx => {
      const res = await ctx.model.Orders.destroy({
        where: {
          id,
        },
      });
      return res;
    });
  }

  async lists(params) {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.Orders.findAll({
        where: {
          userId: params.userId,
          isPayed: params.isPayed,
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [{
          model: app.model.House,
          as: 'house',
          include: [{
            model: app.model.Imgs,
            attributes: [ 'url' ],
            limit: 1,
          }],
        }],
      });
      return res;
    });
  }
}

module.exports = OrdersService;

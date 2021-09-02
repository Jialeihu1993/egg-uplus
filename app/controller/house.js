'use strict';
const BaseController = require('./base');

class HouseController extends BaseController {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    this.success(result);
  }

  async search() {
    const { ctx, app } = this;
    console.log('hello', ctx);
    const result = await ctx.service.house.search(ctx.request.body);
    this.success(result);
  }

  async details() {
    const { ctx, app } = this;
    const result = await ctx.service.house.details(ctx.params('id'));
    this.success({
      info: result,
      banner: result.imgs,
    });
  }
}

module.exports = HouseController;

'use strict';
const BaseController = require('./base');

class HouseController extends BaseController {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    console.log(result);
    this.success(result);
  }
}

module.exports = HouseController;

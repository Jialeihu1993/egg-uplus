'use strict';

const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    const res = await app.httpclient.request('http://apis.imooc.com/?icode=89773B5DA84CA283', {
      dataType: 'json',
    });
    console.log('22222', res);
    ctx.body = {
      status: 200,
      data: res.data,
    };
  }
}

module.exports = CommonsController;

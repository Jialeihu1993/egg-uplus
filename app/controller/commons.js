'use strict';

const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    // const res = await app.httpclient.request('http://apis.imooc.com/?icode=89773B5DA84CA283', {
    //   dataType: 'json',
    // });
    ctx.body = {
      status: 200,
      data: [{ label: '北京', value: '100001' }, { label: '上海', value: '100002' }],
    };
  }
}

module.exports = CommonsController;

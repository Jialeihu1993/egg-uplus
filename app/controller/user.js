'use strict';

const Controller = require('egg').Controller;
const MD5 = require('md5');
const dayjs = require('dayjs');

class UserController extends Controller {
  async registry() {
    const { ctx, app } = this;
    console.log('===', ctx.request.body);
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(params.username);

    if (user) {
      ctx.body = {
        status: 500,
        errMsg: '用户已经存在',
      };
    }

    const reslut = await ctx.service.user.add({
      ...params,
      password: MD5(params.password + app.config.salt),
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    if (reslut) {
      ctx.body = {
        status: 200,
        data: reslut,
      };
    } else {
      ctx.body = {
        status: 500,
        errorMsg: '注册用户失败',
      };
    }
  }
}

module.exports = UserController;

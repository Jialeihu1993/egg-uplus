'use strict';

const Controller = require('egg').Controller;
const MD5 = require('md5');
// const dayjs = require('dayjs');

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
      return;
    }

    const reslut = await ctx.service.user.add({
      ...params,
      password: MD5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
    });
    console.log('+++++++++', reslut);
    if (reslut) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(reslut.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(reslut.createTime),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errorMsg: '注册用户失败',
      };
    }
  }

  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(params.username, params.password);
    console.log('user', user, user.id);
    if (user) {
      ctx.session.userId = user.dataValues.id;
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(user.createTime),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errorMsg: '该用户不存在',
      };
    }
  }
}

module.exports = UserController;

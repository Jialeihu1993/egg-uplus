'use strict';

// const Controller = require('egg').Controller;
const MD5 = require('md5');
const BaseController = require('./base');
// const dayjs = require('dayjs');

class UserController extends BaseController {
  async jwtSign() {
    const { app, ctx } = this;
    // 优化
    // const username = ctx.request.body.username;
    const username = ctx.params('username');
    const token = app.jwt.sign({ username }, app.config.jwt.secret);
    // ctx.session[username] = 1;
    // await ctx.redis.set(username, 1, 'EX', 5);
    await app.redis.set(username, token, 'EX', app.config.redisExpire);
    return token;
  }
  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }
  async registry() {
    const { ctx, app } = this;
    // console.log('===', ctx.request.body);cl
    const token = await this.jwtSign();
    //  const params = ctx.request.body;
    const params = ctx.params();
    if (!params.username) {
      ctx.body = {
        status: 500,
        errMsg: '参数有误',
      };
      return;
    }
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
    console.log('+++++++++', reslut, ctx.helper.time());
    if (reslut) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(reslut.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(reslut.createTime),
          token,
        },
      };
      // this.success({
      //   ...this.parseResult(ctx, reslut),
      //   token,
      // });
    } else {
      this.error('注册用户失败');
      // ctx.body = {
      //   status: 500,
      //   errorMsg: '注册用户失败',
      // };
    }
  }

  async login() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(params.username, params.password);
    console.log('user', user);
    if (user) {
      // ctx.session.userId = user.dataValues.id;
      // ctx.session.username = 1;
      console.log(app.redis);
      const token = app.jwt.sign({ username: params.username }, app.config.jwt.secret);
      await app.redis.set(params.username, token, 'EX', app.config.redisExpire);
      // ctx.session[params.username] = 1;
      ctx.body = {
        status: 200,
        data: {
          // ...this.parseResult(ctx, user),
          ...ctx.helper.unPick(user.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(user.createTime),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errorMsg: '该用户不存在',
      };
    }
  }

  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    if (user) {
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
        errMsg: '用户不存在',
      };
    }
  }

  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null;
      ctx.body = {
        status: 200,
        data: 'ok',
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        errorMsg: '退出登陆失败',
      };
    }
  }

  async edit() {
    const { ctx } = this;
    console.log('hhhh', ctx.params());
    const res = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
    });
    this.success(res);
  }
}

module.exports = UserController;

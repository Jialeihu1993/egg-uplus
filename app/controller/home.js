'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const res = await ctx.service.user.details(20);
    // console.log(res);
    ctx.body = 'res';
  }
  async newApplication() {
    const { ctx, app } = this;
    // const packInfo = app.package();
    // console.log('------', packInfo);
    const allpack = app.allpackage;
    console.log(allpack);
    ctx.body = 'new application';
  }
  async newContext() {
    const { ctx } = this;
    const params = ctx.params();
    console.log(params);
    ctx.body = 'newContext';
  }

  async newRequest() {
    const { ctx } = this;
    const token = ctx.request.token;
    ctx.body = token;
  }

  async newResponse() {
    const { ctx } = this;
    ctx.response.token = '123abc';
    const base64 = ctx.helper.base64Encode('hello');
    ctx.body = base64;
  }
}

module.exports = HomeController;


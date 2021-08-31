'use strict';
module.exports = options => {
  return async (ctx, next) => {
    // const url = ctx.request.url;
    console.log('options', options);
    // const user = ctx.session.user;
    // const user = ctx.session[ctx.username];
    const token = ctx.request.token;
    const username = await ctx.app.redis.get(ctx.username);
    const user = username ? username === token : username;
    console.log('ctx', ctx);
    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errorMsg: '用户未登陆',
      };
      // await next();
    } else {
      await next();
    }
  };
};

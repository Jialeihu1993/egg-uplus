'use strict';
module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    console.log('options', options);
    const user = ctx.session.user;
    console.log('user', user, options.exclude.includes(ctx.request.url.split('?')[0]));
    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errorMsg: '用户未登陆',
      };
    } else {
      await next();
    }
  };
};

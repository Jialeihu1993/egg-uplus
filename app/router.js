'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/registry', controller.user.registry);
  router.post('/api/user/detail', controller.user.detail);
};

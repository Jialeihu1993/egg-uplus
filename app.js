'use strict';

module.exports = app => {
  const store = {};
  app.sessionStore = {
    async get(key) {
      console.log(key);
      return store[key];
    },
    async set(key, value) {
      store[key] = value;
    },
    async destroy(key) {
      store[key] = null;
    },
  };
  app.config.coreMiddleware.push('notFound');
  app.config.coreMiddleware.push('auth');
};

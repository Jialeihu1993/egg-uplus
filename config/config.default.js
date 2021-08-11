/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626859993357_4175';

  // add your middleware config here
  config.middleware = [ 'httpLog' ];
  config.httpLog = {
    type: 'all',
  };

  config.auth = {
    exclude: [ '/home', '/user', '/login', '/logot' ],
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'egg',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
    // 单个
    // root: path.join(appInfo.baseDir, 'app/view'),
    root: [ path.join(appInfo.baseDir, 'app/view'), path.join(appInfo.baseDir, 'app/html') ].join(','),
  };

  config.ejs = {
    delimiter: '',
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, '/app/public/'),
  };

  config.session = {
    key: 'XINGYE',
    httpOnly: true,
    maxAge: 1000 * 50,
    renew: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'muke',
  };


  return {
    ...config,
    ...userConfig,
  };
};

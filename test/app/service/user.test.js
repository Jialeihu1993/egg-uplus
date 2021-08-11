'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('service user test', () => {
  it.only('test details', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.details(20);
    assert(user);
    assert(user.id === 20);
  });
});

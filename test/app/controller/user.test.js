'use strict';

const { app } = require('egg-mock/bootstrap');

describe('user test', () => {

  it('user index', () => {
    return app.httpRequest()
      .get('/user')
      .expect('hi, user')
      .expect(200);
  });

  it('user list', () => {
    return app.httpRequest()
      .get('/user/lists')
      .expect('hi,i am here')
      .expect(200);
  });

  it('user details', () => {
    return app.httpRequest()
      .get('/user/details?id=123')
      .expect(200)
      .expect('123');
  });

  it('user details2', () => {
    return app.httpRequest()
      .get('/user/details2/123')
      .expect(200)
      .expect('123');
  });

  it('user add post', () => {
    return app.httpRequest()
      .post('/user/add')
      .send({
        name: 'hjl',
        age: 18,
      })
      .expect(200)
      .expect({
        status: 200,
        data: {
          name: 'hjl',
          age: 18,
        },
      });
  });
});

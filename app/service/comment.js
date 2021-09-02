'use strict';

const BaseService = require('./base');

class CommentsService extends BaseService {
  async add(param) {
    return this.run(async ctx => {
      const result = await ctx.model.Comment.create(param);
      return result;
    });
  }

  async lists(params, userId) {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.Comment.findAll({
        where: {
          houseId: params.houseId,
          userId,
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [{
          model: app.model.User,
          attributes: [ 'avatar' ],
        }],
      });
      return res;
    });
  }
}

module.exports = CommentsService;

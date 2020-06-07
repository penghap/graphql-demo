/*jshint esversion: 6 */
import mongoose from 'mongoose';
const User = mongoose.model('user');

export const saveUser = async (ctx, next) => {
  // 获取请求的数据
  let data = ctx.request.body;
  let user = new User(data);

  const one = await user.save(); // 保存数据
  if (one) {
    ctx.body = { success: true, user: one };
  } else {
    ctx.body = { success: false };
  }
};

// 获取所有的user数据
export const fetchUsers = async (ctx, next) => {
  let conds = {};
  let options = {
    limit: ctx.request.limit || 10,
    offset: ctx.request.offset || 0,
  };
  const [users, total] = await Promise.all([User.find(conds, null, options).exec(), User.countDocuments(conds)]);
  ctx.body = {
    total,
    data: users,
  };
};

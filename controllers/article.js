/*jshint esversion: 6 */
import mongoose from 'mongoose';
const Article = mongoose.model('article');

export const saveArticle = async (ctx, next) => {
  const data = ctx.request.body;
  const article = new Article(data);
  const one = await article.save();
  ctx.body = one;
};

export const fetchArticles = async (ctx, next) => {
  let conditions = {};
  let options = {
    limit: ctx.request.limit || 10,
    offset: ctx.request.offset || 0,
  };
  const [articles, total] = await Promise.all([Article.find(conditions, null, options).populate({ path: 'user', select: 'name age avatar' }).exec(), Article.countDocuments(conditions)]);
  ctx.body = {
    total,
    data: articles,
  };
};

export const fetchArticleDetail = async (ctx, next) => {
  let conditions = {
    _id: ctx.params.articleId,
  };
  const article = await Article.findOne(conditions).populate({ path: 'author', select: 'name age avatar' }).exec();
  ctx.body = article;
};

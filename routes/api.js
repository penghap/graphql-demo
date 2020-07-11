/*jshint esversion: 6 */
import { saveUser, fetchUsers } from '../controllers/user';

import { saveArticle, fetchArticles, fetchArticleDetail } from '../controllers/article';

import Router from 'koa-router';
const router = new Router();

router.post('/users', saveUser)
  .get('/users', fetchUsers)
  .post('/articles', saveArticle)
  .get('/articles', fetchArticles) // api
  .get('/articles/:articleId', fetchArticleDetail);

export default router;

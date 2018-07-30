/*jshint esversion: 6 */
import {
  graphqlKoa,
  graphiqlKoa
} from 'graphql-server-koa';

import Router from 'koa-router';
import schema from '../graphql/schema';

const router = new Router();

router.post('/graphql', async (ctx, next) => {
    await graphqlKoa({
      schema: schema
    })(ctx, next) // 使用schema
  })
  .get('/graphql', async (ctx, next) => {
    await graphqlKoa({
      schema: schema
    })(ctx, next) // 使用schema
  })
  .get('/graphiql', async (ctx, next) => {
    await graphiqlKoa({
      endpointURL: '/graphql'
    })(ctx, next) // 重定向到graphiql路由
  });

export default router;
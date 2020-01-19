import {
  graphqlKoa,
  graphiqlKoa
} from 'graphql-server-koa'

import koaRouter from 'koa-router'
import schema from '../graphql/schema'

const router = new koaRouter();

router.post('/graphql', async (ctx, next) => {
    return graphqlKoa({
      schema
    })(ctx, next)
  })
  .get('/graphql', async (ctx, next) => {
    return graphqlKoa({
      schema
    })(ctx, next)
  })
  .get('/graphiql', async (ctx, next) => {
    return graphiqlKoa({
      endpointURL: '/graphql'
    })(ctx, next)
  })
  .get('/', async (ctx, next) => {
    ctx.response.redirect('/graphiql')
    next()
  })

export default router
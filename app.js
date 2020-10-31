/*jshint esversion: 6 */
import Koa from 'koa';
import KoaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import config from 'config';

// 引入mongodb
import './mongodb';
import routes from './routes';
import graphqlServer from './graphqlServer';

const app = new Koa();

// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

routes(app);

const port = config.get('default.port');
app.listen(port);

graphqlServer.applyMiddleware({ app });
console.log(`🚀 Server graphQL server listen port: ${port}, graphql path ${graphqlServer.graphqlPath}`)

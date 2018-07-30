/*jshint esversion: 6 */
import Koa from 'koa';
import KoaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import config from 'config';

// 引入mongodb
import db from './mongodb';
import routes from './routes';

const app = new Koa();
// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

routes(app);

const port = config.get('default.port');
app.listen(port);

console.log(`graphQL server listen port: ${port}`);
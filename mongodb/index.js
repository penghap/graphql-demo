/*jshint esversion: 6 */
// 引入mongoose模块
require('./schema/user');
require('./schema/article');

import mongoose from 'mongoose';
import config from 'config';
const url = config.get('default.dbPath');
const options = { autoReconnect: true, useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set('debug', true);
mongoose.connect(url, options);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to MongoDB ', url);
});

db.on('error', (error) => {
  console.error(error);
  mongoose.disconnect();
  process.exit();
});

db.on('disconnected', () => {
  mongoose.connect(url, options);
});

db.on('close', function () {
  console.log('数据库断开，重新连接数据库');
  mongoose.connect(url, options);
});

export default db;

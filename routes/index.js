/*jshint esversion: 6 */
'use strict';
import api from './api';
export default (app) => {
  app.use(api.routes());
};

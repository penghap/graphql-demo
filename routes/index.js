/*jshint esversion: 6 */
'use strict';

import api from './api'
import graphql from './graphql'

export default app => {
  app.use(api.routes())
  app.use(graphql.routes())
}
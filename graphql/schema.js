/*jshint esversion: 6 */
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import {
  user,
  users
} from './user';

import {
  articles
} from './article';

// Queries
const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      user,
      users,
      articles
    }
  })
});

export default graphQLSchema;
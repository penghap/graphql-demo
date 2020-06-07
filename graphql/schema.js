/*jshint esversion: 6 */
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { user, users, createUser, updateUser, deleteUser } from './user';

import { articles, createArticle, updateArticle, deleteArticle } from './article';

// Queries
const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      user,
      users,
      articles,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser,
      updateUser,
      deleteUser,
      createArticle,
      updateArticle,
      deleteArticle,
    },
  }),
});

export default graphQLSchema;

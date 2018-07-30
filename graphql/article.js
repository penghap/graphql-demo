/*jshint esversion: 6 */
import mongoose from 'mongoose';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  GraphQLInt
} from 'graphql';

import {
  userType,
  metaType
} from './user';

const Article = mongoose.model('article');

let articleType = new GraphQLObjectType({
  name: 'Article',
  fields: {
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    summary: {
      type: GraphQLInt
    },
    author: {
      type: userType
    },
    meta: {
      type: metaType
    }
  }
});

export const articles = {
  type: new GraphQLList(articleType),
  args: {},
  resolve(root, params, options) {
    let conds = {};
    return Article.find(conds, null, options).populate({
      path: 'user',
      select: 'name age avatar'
    }).exec()
  }
}
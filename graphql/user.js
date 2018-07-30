/*jshint esversion: 6 */
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  isOutputType
} from 'graphql';

import mongoose from 'mongoose'
const User = mongoose.model('user')


export const metaType = new GraphQLObjectType({
  name: 'meta',
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
});

export const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    avatar: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    meta: {
      type: metaType
    }
  }
});

export const users = {
  type: new GraphQLList(userType),
  args: {},
  resolve(root, params, options) {
    return User.find({}).exec();
  }
}


export const user = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options) {
    return User.findOne({
      _id: params.id
    }).exec()
  }
}

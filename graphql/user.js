/*jshint esversion: 6 */
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  isOutputType
} from 'graphql'

import mongoose from 'mongoose'
const userModel = mongoose.model('user')


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
})

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
    meta: {
      type: metaType
    }
  }
})

export const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    avatar: {
      type: GraphQLString
    }
  }
})

export const users = {
  type: new GraphQLList(userType),
  args: {
    
  },
  async resolve(root, params, options) {
    return userModel.find({}).exec()
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
  async resolve(root, params, options) {
    return userModel.findOne({
      _id: params.id
    }).exec()
  }
}

export const createUser = {
  type: userType,
  args: {
    input: {
      name: 'user',
        type: new GraphQLNonNull(userInput)
    }
  },
  resolve(root, params, options) {
    let user = new userModel(params.input)
    return user.save()
  }
}

export const updateUser = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    input: {
      name: 'user',
      type: new GraphQLNonNull(userInput)
    }
  },
  async resolve(root, params, options) {
    let conds = {
      _id: params.id
    }
    let update = params.input
    let opts = {
      new: true
    }
    let _user = await userModel.findOneAndUpdate(conds, update, opts).exec()
    return _user
  }
}

export const deleteUser = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, params, options) {
    const articleId = params.id
    const removed = await userModel.findByIdAndRemove(articleId)
    return removed;
  }
}
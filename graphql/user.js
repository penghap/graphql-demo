/*jshint esversion: 6 */
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql'
import graphqlFields from 'graphql-fields';
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


export const pages = new GraphQLInputObjectType({
  name: 'userIpagesnput',
  fields: {
    limit: {
      name: 'limit',
      type: new GraphQLNonNull(GraphQLInt)
    },
    offset: {
      name: 'offset',
      type: new GraphQLNonNull(GraphQLInt)
    }
  }
})

export const users = {
  type: new GraphQLObjectType({
    name: 'pages',
    fields: {
      total: {
        name: 'total',
        type: GraphQLInt,
      },
      data: {
        name: 'data',
        type: new GraphQLList(userType)
      }
    }
  }),
  args: {
    limit: {
      name: 'limit',
      type: new GraphQLNonNull(GraphQLInt)
    },
    offset: {
      name: 'offset',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve(root, params, _, info) {
    const { data: dataFields } = graphqlFields(info);
    const projection = Object.keys(dataFields).join(' ');
    const { limit, offset } = params;
    const optiosn = { limit, offset };
    const conds = {};
    const [data, total] = await Promise.all([
      userModel.find(conds, projection, optiosn).lean().exec(), //
      userModel.count(conds)
    ])
    return  { total, data }
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
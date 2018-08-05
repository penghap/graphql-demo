/*jshint esversion: 6 */
import mongoose from 'mongoose'
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import {
  userType,
  metaType
} from './user'

const userModel = mongoose.model('user')
const articleModel = mongoose.model('article')

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
})

export const articles = {
  type: new GraphQLList(articleType),
  args: {},
  resolve(root, params, options) {
    let conds = {}
    return Article.find(conds, null, options).populate({
      path: 'user',
      select: 'name age avatar'
    }).exec()
  }
}

export const articleInput = new GraphQLInputObjectType({
  name: 'articleInput',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    content: {
      type: GraphQLString
    },
    summary: {
      type: GraphQLInt
    },
    author: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
})

export const createArticle = {
  type: articleType,
  args: {
    input: {
      name: 'articleInput',
      type: new GraphQLNonNull(articleInput)
    }
  },
  async resolve(root, params, options) {
    let {
      author
    } = params.input
    let conds = {
      _id: author
    }
    let projection = '_id'
    let user = await userModel.findOne(conds, projection).exec()
    if (!user) {
      return false
    }
    let article = Object.assign({}, params.input)
    let _article = new articleModel(article)
    return _article.save()
  }
}

export const updateArticle = {
  type: articleType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    input: {
      name: 'articleInput',
      type: new GraphQLNonNull(articleInput)
    }
  },
  async resolve(root, params, options) {
    let {
      author
    } = params.input

    let conds = {
      _id: author
    }
    let projection = '_id'
    let user = await userModel.findOne(conds, projection).exec()
    if (!user) {
      return false
    }
    conds = {
      _id: params.id
    }
    let update = params.input
    let opts = {
      new: true
    }
    return articleModel.findOneAndUpdate(conds, update, opts).exec()
  }
}

export const deleteArticle = {
  type: articleType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, params, options) {
    const articleId = params.id
    const removed = await articleModel.findByIdAndRemove(articleId)
    return removed;
  }
}
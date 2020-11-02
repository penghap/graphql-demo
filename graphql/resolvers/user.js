
import graphqlFields from 'graphql-fields';
import mongoose from 'mongoose';
const userModel = mongoose.model('user');
const profileModel = mongoose.model('profile');

export const getUserProfileResolver = async (root, params, context, info) => {
    const conditions = {
        user: root._id 
    }
    return profileModel.findOne(conditions).lean().exec();
}

export const userResolver = async (root, params, context, info) => {
    const conditions = {
        _id: params.id
    }
    return userModel.findOne(conditions).lean().exec();
}

export const usersResolver = async (root, params, context, info) => {
    const { limit, offset } = params;
    const options = { limit, offset };
    const conditions = {};
    const projection = null;
    const [data, total] = await Promise.all([
      userModel.find(conditions, projection, options).lean().exec(), //
      userModel.count(conditions),
    ]);
    return { total, data };
}

export const createUserResolver =async (root, params, context, info) => {
    let user = new userModel (params.input);
    return user.save ();
}; 


export const updateUserResolver = async (root, params, context, info) => {
    const conditions = {
        _id: params.id,
    };
    const options = {
        new: true,
    };
    const update = {
        $set: params.input
    }
    return userModel.findOneAndUpdate(conditions, update, options).exec();
}; 


export default {
    Query: {
        user: userResolver,
        users: usersResolver
    },
    User: {
        name: (root) => {
            console.log("name", root.name);
            return root.name;
        },
        profile: getUserProfileResolver,
    },
    Mutation: {
        createUser: createUserResolver,
        updateUser: updateUserResolver,
    },
}
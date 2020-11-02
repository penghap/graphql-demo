
import graphqlFields from 'graphql-fields';
import mongoose from 'mongoose';
const userModel = mongoose.model('user');
const profileModel = mongoose.model('profile');

export const getUserProfileResolver = async (root, params, context, info) => {
    const conditions = {
        _id: root.user
    }
    return userModel.findOne(conditions).lean().exec();
}

export const profileResolver = async (root, params, context, info) => {
    const conditions = {
        _id: params.id 
    }
    return profileModel.findOne(conditions).lean().exec();
}

export const createProfileResolver = async (root, params, context, info) => {
    const conditions = {
        user: params.userId
    }
    const update = {
        $set: params.input
    }
    const options = {
        upsert: true,
        new: true,
    };
    return profileModel.findOneAndUpdate(conditions, update, options).exec();
}; 

export const updateProfileResolver = async (root, params, context, info) => {
    const conditions = {
        _id: params.id,
    };
    const options = {
        new: true,
    };
    const update = {
        $set: params.input
    }
    return profileModel.findOneAndUpdate(conditions, update, options).exec();
}; 


export default {
    Query: {
        profile: profileResolver
    },
    Profile: {
        user: getUserProfileResolver,
    },
    Mutation: {
        createProfile: createProfileResolver,
        updateProfile: updateProfileResolver,
    },
}
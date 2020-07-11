/*jshint esversion: 6 */
import mongoose from 'mongoose';
import DataLoader from 'dataloader';

const userProfileModel = mongoose.model('profile');

async function batchFunction (keys) {
  const conditions = {
    _id: { $in: [...new Set(keys)]}
  }
  const users = await userProfileModel.find(conditions).lean().exec();
  const map = new Map(users.map((user) => [user._id.toString(), user]));
  return keys.map((key) => map.get(key));
}

export const profileLoader = new DataLoader(batchFunction, {
  maxBatchSize: 1
});
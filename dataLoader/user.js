/*jshint esversion: 6 */
import mongoose from 'mongoose';
const userModel = mongoose.model('user');

import DataLoader from 'dataloader';

async function batchFunction (keys) {
  const conditions = {
    _id: { $in: [...new Set(keys)]}
  }
  const users = await userModel.find(conditions).lean().exec();
  const map = new Map(users.map((user) => [user._id.toString(), user]));
  return keys.map((key) => map.get(key));
}

export const userLoader = new DataLoader(batchFunction, {
  maxBatchSize: 1
});
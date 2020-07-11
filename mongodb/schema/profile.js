/*jshint esversion: 6 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userProfileSchema = new Schema({
  address: String,
  user: {
    type: ObjectId,
    ref: 'user',
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

userProfileSchema.pre('save', function (next) {
  this.meta.updatedAt = Date.now();
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt;
  }
  next();
});

const profileModel = mongoose.model('profile', userProfileSchema);
export default profileModel;

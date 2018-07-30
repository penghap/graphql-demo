/*jshint esversion: 6 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  avatar: String,
  password: String,
  status: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

userSchema.pre('save', function (next) {
  this.meta.updatedAt = Date.now();
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt;
  }
  next();
});

const User = mongoose.model('user', userSchema);
export default User;
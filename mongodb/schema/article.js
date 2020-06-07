/*jshint esversion: 6 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const articleSchema = new Schema({
  title: String,
  tags: [String],
  content: String,
  summary: String,
  author: {
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

articleSchema.pre('save', function (next) {
  this.meta.updatedAt = Date.now();
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt;
  }
  next();
});

const Article = mongoose.model('article', articleSchema);
export default Article;

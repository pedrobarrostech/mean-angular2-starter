import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Cat Schema
 */
const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    },
  weight: {
    type: Number,
    required: true,
    },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CatSchema.method({
});

/**
 * Statics
 */
CatSchema.statics = {
  /**
   * Get cat
   * @param {ObjectId} id - The objectId of cat.
   * @returns {Promise<Cat, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((cat) => {
        if (cat) {
          return cat;
        }
        const err = new APIError('No such cat exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List cats in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of cats to be skipped.
   * @param {number} limit - Limit number of cats to be returned.
   * @returns {Promise<Cat[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Cat
 */
export default mongoose.model('Cat', CatSchema);

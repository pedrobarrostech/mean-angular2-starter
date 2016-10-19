import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Client Schema
 */
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  rg: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
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
ClientSchema.method({
});

/**
 * Statics
 */
ClientSchema.statics = {
  /**
   * Get client
   * @param {ObjectId} id - The objectId of client.
   * @returns {Promise<Client, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((client) => {
        if (client) {
          return client;
        }
        const err = new APIError('No such client exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List clients in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of clients to be skipped.
   * @param {number} limit - Limit number of clients to be returned.
   * @returns {Promise<Client[]>}
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
 * @typedef Client
 */
export default mongoose.model('Client', ClientSchema);

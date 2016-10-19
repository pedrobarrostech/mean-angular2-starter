import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

   // POST /api/cats
  createCat: {
    body: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      weight: Joi.number().required()
    }
  },

  // UPDATE /api/cats/:catId
  updateCat: {
    body: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      weight: Joi.number().required()
    },
    params: {
      catId: Joi.string().hex().required()
    }
  },


   // POST /api/clients
  createClient: {
    body: {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      rg: Joi.string().required(),
      cpf: Joi.string().required(),
      maritalStatus: Joi.string().required(),
      sex: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      phone: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      facebook:  Joi.string().required(),
      email:  Joi.string().required(),
      birthday: Joi.string().required(),
      comments: Joi.string().required()
    }
  },

  // UPDATE /api/clients/:clientId
  updateClient: {
    body: {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      rg: Joi.string().required(),
      cpf: Joi.string().required(),
      maritalStatus: Joi.string().required(),
      sex: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      phone: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      facebook:  Joi.string().required(),
      email:  Joi.string().required(),
      birthday: Joi.string().required(),
      comments: Joi.string().required()
    },
    params: {
      clientId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

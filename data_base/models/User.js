'use strict';

const { mongoose } = require('../init');
console.log(mongoose);
console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');

const user_schema = new mongoose.Schema({

  id: {
    type:           String,
    hashKey:        true,
    required:       true,
    trim:           true,
    validate:       /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  },

  user_name: {
    type:           String,
    required:       true,

  },

  password: {
    type:           String,
  },

  location: {
    x:              Number,
    y:              Number,
  },
  inventory: {
    type:           Array,
  },
  meters: {
    type:           Object,
  },
},
{
  timestamps: {
    createdAt:     'creation_date',
    updatedAt:     'last_update_date',
  },
});

module.exports = mongoose.model('User', user_schema);

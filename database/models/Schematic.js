const mongoose = require('mongoose');

const Schematic = new mongoose.Schema({

  id: {
    type:           String,
    hashKey:        true,
    required:       true,
    trim:           true,
    validate:       /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  },

  name: {
    type:           String,
    required:       true,

  },

  materials: {
    type:           Array,
  },
},
{
  timestamps: {
    createdAt:     'creation_date',
    updatedAt:     'last_update_date',
  },
});



module.exports = mongoose.model('User', Schematic);

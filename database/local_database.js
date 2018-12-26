'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
  mongoose,
};

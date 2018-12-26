'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
  database,
};

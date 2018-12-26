'use strict';

const mongoose = require('mongoose');
const process = require('process');
mongoose.connect('mongodb://localhost:27017');

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));

database.once('open', function() {

  process.stdout.write('\x1B[2J');

  console.log(' ... Database connected on port: 27017');
});

module.exports = {
  mongoose,
};

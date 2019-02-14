'use strict';

const mongoose = require('mongoose');

const database_port = process.env.DATABASE_PORT || 27017;

mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line

mongoose.connection.once('open', () => {
  console.log(' ... Database connected on port: ' + database_port); // eslint-disable-line
});

module.exports = {
  mongoose,
};
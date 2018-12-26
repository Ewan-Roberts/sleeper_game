'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log(' ... Database connected on port: 27017');
});

module.exports = {
  mongoose,
};

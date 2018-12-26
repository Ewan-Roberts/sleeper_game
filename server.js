'use strict';

const website_port = process.env.PORT || 3000;
const database_port = process.env.DATABASE_PORT || 27017;

const express = require('express');
const app = express();
const server = require('http').Server(app);

const { mongoose } = require('./database/local_database');
const { socket_management } = require('./back_end/engine/socket');

mongoose.connection.once('open', function() {
  process.stdout.write('\x1B[2J');

  console.log(' ... Database connected on port: ' + database_port);
});

socket_management(server);

app.use(express.static('./public'));

app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/public/index.html`);

});

server.listen(website_port, () => {
  console.log(` ... Server listening on port: ${website_port}`);
});




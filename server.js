'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const init = require('./database/local_database');
const { socket_management } = require('./back_end/engine/socket');

socket_management(server);

app.use(express.static('./public'));

app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/public/index.html`);

});

server.listen(port, () => {
  console.log(` ... Server listening on port: ${port}`);
});




// put in DB and cache in this layer


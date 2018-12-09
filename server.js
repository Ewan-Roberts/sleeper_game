'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server, {});

const player_inventory = {
  items: [
    {
      name: 'bunny',
      item_id: 'an id',
      slot: 0,
    },
    {
      name: 'bunny',
      item_id: 'an id',
      slot: 1,
    },
    {
      name: 'bunny',
      item_id: 'an id',
      slot: 2,
    },
    {
      name: 'bunny',
      item_id: 'an id',
      slot: 3,
    },
  ],
};

io.on('connection', (socket) => {
  socket.on('get_inventory', () => {
    socket.emit('player_inventory', player_inventory);
  });
});

app.use(express.static('./public'));

app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/public/index.html`);

});

server.listen(port, () => {
  //console.log(`server is listening on port: ${port}`);
});

io.on('connection', () => {
  //console.log('Client connected.');
});

'use strict';

const {
  get_player_inventory_on_id,
  register_user,
} = require('../player/inventory');

function socket_management(server) {

  const io = require('socket.io')(server, {});

  io.on('connection', client => {

    client.on('get_inventory', async function() {

      const inventory = await get_player_inventory_on_id();

      client.emit('player_inventory', inventory);
    });


    client.on('register', async function(user_details) {

      const response = await register_user(user_details);

      client.emit('register_success', response);
    });

  });


  io.on('connection', () => {

    console.log(' ... Sockets connected on port: 3000');

  });

}

module.exports = {
  socket_management,
};



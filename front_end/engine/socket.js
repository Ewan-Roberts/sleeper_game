'use strict';

const io = require('socket.io-client');

const { NetworkCharacter } = require('../character/network/network_player');
const viewport = require('./viewport');

const socket = io.connect();

async function register_user(user_details) {

  const input = {
    user_name: 'ewan',
    password: 'yoyoyyo',
  };

  socket.emit('register', input);
}

socket.on('register_success', response => {
  //console.log(response)
});

socket.on('other_players', response => {

  //if(not the current player) { return };
  //rendertheplayer
  console.log(response);

});


socket.on('server_player_pool', player_pool => {

  //console.log(player_pool);

  viewport.getChildByName('network_players').removeChildren();

  player_pool.forEach(player => {
    if(player.id === socket.id) {
      //console.log('this is your player data');
      //console.log(player);
      return;

    }
    const network_player = new NetworkCharacter(player);

  });
});


module.exports = {
  register_user,
  socket,
};

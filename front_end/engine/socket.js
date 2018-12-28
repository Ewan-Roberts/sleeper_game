'use strict';

const io = require('socket.io-client');

const socket = io.connect();

async function register_user(user_details) {

  const input = {
    user_name: 'ewan',
    password: 'yoyoyyo',
  };

  socket.emit('register', input);
}

socket.on('register_success', response => {

  //console.log(response);

});

socket.on('other_players', response => {

  //if(not the current player) { return };
  //rendertheplayer

  console.log(response);

});



module.exports = {
  register_user,
  socket,
};

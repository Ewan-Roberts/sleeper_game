'use strict';

const io     = require('socket.io-client');
const socket = io.connect();

function register_user(user_details) {
  socket.emit('register', user_details);
}

socket.on('user_register_success', response => {
  if(response.error) {
    throw new Error(response.error);
  }
  const overlay = global.document.querySelector('.response_overlay');
  overlay.style.display = 'block';

  const response_overlay_tags = global.document.querySelectorAll('.response_overlay p');
  response_overlay_tags[0].innerHTML = response.user_name;
  response_overlay_tags[1].innerHTML = response.password;

});

socket.on('other_players', response => {

  //if(not the current player) { return };
  //rendertheplayer

});


socket.on('server_player_pool', player_pool => {

  //console.log(player_pool);

  //viewport.getChildByName('network_players').removeChildren();

  //player_pool.forEach(player => {
  //  if(player.id === socket.id) {
  //    //console.log('this is your player data');
  //    //console.log(player);
  //    return;

  //  }
  //  const network_player = new NetworkCharacter(player);

  //});
});


module.exports = {
  register_user,
  socket,
};

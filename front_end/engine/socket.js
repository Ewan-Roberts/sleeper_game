'use strict';

const io     = require('socket.io-client');
const socket = io.connect();

function register_user(user_details) {
  socket.emit('register', user_details);
}

function get_user(user_details) {
  socket.emit('get_user', user_details);
}

function save_user(user_details) {
  socket.emit('update_user', user_details);
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

socket.on('find_user_success', response => {
  console.log(response);
});

socket.on('update_user_success', response => {
  console.log(response);
});

module.exports = {
  register_user,
  get_user,
  save_user,
  socket,
};

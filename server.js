'use strict';

const website_port = process.env.PORT || 3000;

const express    = require('express');
const app        = express();
const web_server = require('http').Server(app);
const io         = require('socket.io')(web_server, {});
const {
  create_user,
  get_user_by_password,
}= require('./back_end/register');

require('./database/local_database');

web_server.listen(website_port, () =>
  console.log(` ... Server listening on port: ${website_port}`)); // eslint-disable-line

io.on('connection', () =>
  console.log(' ... Sockets connected on port: 3000')); // eslint-disable-line

app.use(express.static('./public'));

app.get('/', response => response.sendFile(`${__dirname}/public/index.html`));

const current_players = [];

// todo move to folder
io.on('connection', client => {

  client.on('register', async function(user_details) {
    const created_user = await create_user(user_details);

    client.emit('user_register_success', created_user);
  });

  client.on('get_user', async function(user_details) {
    const created_user = await get_user_by_password(user_details.passcode);

    client.emit('find_user_success', created_user);
  });

  client.on('save_user', async function(user_details) {
    console.log(user_details);
  });

  client.on('client_player_location', player_data => {

    const { id } = client;

    const player_server_data = {
      ...player_data,
      id,
    };

    const is_player_in_pool = current_players.some(player => player.id === player_server_data.id);

    if(is_player_in_pool) {
      for(let i = 0; i < current_players.length; i++) {

        if(current_players[i].id === player_server_data.id) {
          current_players[i] = player_server_data;
        }
      }
    } else {
      current_players.push(player_server_data);
    }

    io.sockets.emit('server_player_pool', current_players);
  });

});





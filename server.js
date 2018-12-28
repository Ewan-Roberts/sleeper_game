'use strict';

const website_port = process.env.PORT || 3000;
const database_port = process.env.DATABASE_PORT || 27017;

const express = require('express');
const app = express();
const server = require('http').Server(app);

const { mongoose } = require('./database/local_database');

mongoose.connection.once('open', function() {
  //process.stdout.write('\x1B[2J');
  console.log(' ... Database connected on port: ' + database_port);
});

app.use(express.static('./public'));

app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/public/index.html`);

});

server.listen(website_port, () => {
  console.log(` ... Server listening on port: ${website_port}`);
});


const {
  get_player_inventory_on_id,
} = require('./back_end/player/inventory');

const {
  create_user,
} = require('./back_end/register/index');

const uuid = require('uuid/v4');
const io = require('socket.io')(server, {});

io.on('connection', client => {

  //client.on('get_inventory', async function() {

  //  const inventory = await get_player_inventory_on_id();

  //  //client.emit('player_inventory', inventory);
  //});


  //client.on('register', async function(user_details) {

  //  const id = uuid();

  //  const valid_details = {
  //    ...user_details,
  //    id,
  //  };

  //  const response = await create_user(valid_details);

  //  //client.emit('register_success', response);
  //});

  client.on('send_player_location', player_data => {
    console.log(player_data)

    console.log(client.id);
    client.emit('update_location_from_server', player_data);
    //client.emit('server_location_update', player_data.position);
  });


  //const position = {
  //  x: 700,
  //  y: 700,
  //};

  //setInterval(()=> {
  //  position.x += 10;
  //  position.y += 10;
  //  client.emit('network_player', position);
  //}, 4000);



});


io.on('connection', () => {

  //console.log(' ... Sockets connected on port: 3000');

});



'use strict';

const port     = process.env.PORT || 3000;
const compress = require('compression');
const express  = require('express');
const app      = express().use(compress());

const web_server = require('http').Server(app);
web_server.listen(port, () =>
  console.log('server on:' + port)); // eslint-disable-line

app.use(express.static('./public'));
app.get('/', res => res.sendFile(`${__dirname}/public/index.html`));

// const { Build } = require('./scripts/automation');

// app.post('/automation', (request, response) => Build.set_version(request, response));
// app.get( '/automation', (request, response) => Build.get_version(request, response));

// const { handler } = require('./application_layer/register.js');

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.post('/register', (req, res) => {
  console.log(req.body);
  console.log(res.body);
  res.send('hifwfwe');
});


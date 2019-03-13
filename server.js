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

app.post('/automation', (request, response) => Build.set_version(request, response));
app.get( '/automation', (request, response) => Build.get_version(request, response));

const { handler } = require('./application_layer/register.js');
app.post('/register', (req, res) => handler(req, res));


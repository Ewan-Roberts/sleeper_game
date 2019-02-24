'use strict';

const port        = process.env.PORT || 3000;
const express     = require('express');
const compression = require('compression');
const app         = express().use(compression());

const web_server = require('http').Server(app);
web_server.listen(port, () => console.log('server on:' + port)); // eslint-disable-line

app.use(express.static('./public'));
app.get('/', res => res.sendFile(`${__dirname}/public/index.html`));


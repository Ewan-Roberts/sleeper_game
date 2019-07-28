
const process  = require('process');
const port     = process.env.PORT || 3000;
const compress = require('compression');
const express  = require('express');
const app      = express();
app.use(compress({level: 9, memLevel:9}));

const web_server = require('http').Server(app);
web_server.listen(port, () =>
  console.log('server on:' + port)); // eslint-disable-line

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  //console.log('server hit at ' + Date());
  const mem_usage = process.memoryUsage();
  console.log(mem_usage);
  next();
});

app.use(express.static('./public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


'use strict';



const fs       = require('fs');
const { Tiled_Data } = require('./web/level/attributes/parse_tiled_data');
function parse_level_data () {
  const testFolder = './assets/level_data/';

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      if(file === '.DS_Store') return;
      const level_data_raw = require(testFolder+file);

      const parsed = new Tiled_Data(level_data_raw);
      const foo = JSON.stringify(parsed);
      fs.writeFileSync('./web/level/data/'+file, foo);
    });
  });
}

parse_level_data();

const port     = process.env.PORT || 3000;
const compress = require('compression');
const express  = require('express');
const app      = express();
app.use(compress({level: 9, memLevel:9}));

const web_server = require('http').Server(app);
web_server.listen(port, () =>
  console.log('server on:' + port)); // eslint-disable-line

app.use(express.static('./public'));
app.get('/', res => res.sendFile(`${__dirname}/public/index.html`));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


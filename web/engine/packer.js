'use strict';
const PIXI   = require('pixi.js');
const packer = require('pixi-packer-parser');
require('pixi-tween');

const loader = new PIXI.loaders.Loader();
loader.use(packer(PIXI));

module.exports = {
  loader,
};

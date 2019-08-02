const { decals } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Decal extends Element {
  constructor(data) {
    super(data);
    this.tint = data.tint || 0xA9A9A9;

    decals.addChild(this);
  }
}

module.exports = {
  Decal,
};




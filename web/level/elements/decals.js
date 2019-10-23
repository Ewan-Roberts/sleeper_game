const { World } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Decal extends Element {
  constructor(data) {
    super(data);
    this.tint = data.tint || 0xA9A9A9;

    World.add_to('decal', this);
  }
}

module.exports = {
  Decal,
};


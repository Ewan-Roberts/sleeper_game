const { World } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Collision extends Element {
  constructor(data) {
    super(data);
    this.tint = data.tint || 0xA9A9A9;

    World.add_to('collision', this);
  }
}

module.exports = {
  Collision,
};

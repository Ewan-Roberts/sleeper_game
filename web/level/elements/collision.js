const { collisions      } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Collision extends Element {
  constructor(data) {
    super(data);
    this.tint = data.tint || 0xA9A9A9;

    collisions.addChild(this);
  }
}

module.exports = {
  Collision,
};

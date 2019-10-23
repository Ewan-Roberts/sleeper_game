const { World } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Floor extends Element {
  constructor(data) {
    super(data);

    World.add_to('background', this);
  }
}

module.exports = {
  Floor,
};

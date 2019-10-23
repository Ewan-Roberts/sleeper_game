const { World } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Roof extends Element {
  constructor(data) {
    super(data);

    World.add_to('roof', this);
  }
}

module.exports = {
  Roof,
};

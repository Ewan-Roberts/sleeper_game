const { backgrounds } = require('../../engine/pixi_containers');
const { Element } = require('./model');

// TODO consider dependancy injection
class Floor extends Element {
  constructor(data) {
    super(data);

    backgrounds.addChild(this);
  }
}

module.exports = {
  Floor,
};

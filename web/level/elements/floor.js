const { backgrounds } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Floor extends Element {
  constructor(data) {
    super(data);

    backgrounds.addChild(this);
  }
}

module.exports = {
  Floor,
};

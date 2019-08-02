const { roofs } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Roof extends Element {
  constructor(data) {
    super(data);
    this.anchor.set(0, 1);

    roofs.addChild(this);
  }
}

module.exports = {
  Roof,
};

const { roofs   } = require('../../engine/pixi_containers');
const { Element } = require('./model');

class Roof extends Element {
  constructor(data) {
    super(data);

    roofs.addChild(this);
  }
}

module.exports = {
  Roof,
};

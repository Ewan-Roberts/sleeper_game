const { borders } = require('../../engine/pixi_containers');
const { env     } = require('../../../config');
const { Element } = require('./model');

class Border extends Element {
  constructor(data) {
    super(Texture.WHITE);
    this.alpha = (env.visable_borders)?0.2:0;
    this.anchor.set(0, 1);

    borders.addChild(this);
  }
}

module.exports = {
  Border,
};

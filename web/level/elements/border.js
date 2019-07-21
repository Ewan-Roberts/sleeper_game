const { borders         } = require('../../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { env             } = require('../../../config');

class Border extends Sprite {
  constructor(data) {
    super(Texture.WHITE);
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = (env.visable_borders)?0.2:0;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.anchor.set(0, 1);

    borders.addChild(this);
    this.position.copy(data);
  }
}

module.exports = {
  Border,
};

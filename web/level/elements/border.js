const { borders         } = require('../../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');

class Border extends Sprite {
  constructor(data) {
    super(Texture.fromImage('black_dot'));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.alpha    = 0;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.anchor.set(0, 1);

    borders.addChild(this);
    this.position.copy(data);
  }
}

module.exports = {
  Border,
};

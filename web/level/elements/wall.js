const { Sprite, Texture } = require('pixi.js');
const { collisions      } = require('../../engine/pixi_containers');

class Wall extends Sprite {
  constructor(data) {
    super(Texture.fromImage('black_dot'));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.tint     = data.properties && data.properties.tint || 0x000000;
    this.alpha    = data.properties && data.properties.alpha || 1;

    if(data.properties && data.properties.hidden) this.alpha = 0;

    this.anchor.set(0, 1);
    this.position.copy(data);

    collisions.addChild(this);
  }
}

module.exports = {
  Wall,
};



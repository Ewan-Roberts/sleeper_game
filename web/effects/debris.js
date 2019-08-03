const { backgrounds } = require('../engine/pixi_containers');
const { random_bound } = require('../utils/math');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { tweenManager } = require('pixi.js');

class Debris extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name || 'bunny'));
    this.id       = data.id;
    this.height   = data.height || 20;
    this.width    = data.width  || 100;
    this.alpha    = data.alpha || 1;
    this.tint     = 0xd3d3d3;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.anchor.set(0.5);
    this.position.copy(data);
    this.tween = tweenManager.createTween(this);
    const random_distance_from_center = random_bound(-50, 50);
    const random_rotation = Math.random() * 4 - 1;

    this.tween.to({
      x: this.x + random_distance_from_center,
      y: this.y - random_distance_from_center,
      rotation: random_rotation,
    });
    this.tween.time = 500;
    this.tween.start();

    backgrounds.addChild(this);
  }
}

module.exports = {
  Debris,
};

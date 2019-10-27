const { World } = require('../engine/pixi_containers');
const { random_bound } = require('../utils/math');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { tweenManager } = require('pixi.js');

// TODO this is the random spread of a small chip of rubble
// class Debris extends Sprite {
//   constructor(data = {}) {
//     super(Texture.fromImage(data.image_name || 'wood_rubble'));
//     this.id       = data.id;
//     this.height   = data.height || 20;
//     this.width    = data.width  || 100;
//     // this.alpha    = data.alpha || 1;
//     this.tint     = 0xd3d3d3;
//     this.rotation = data.rotation * DEG_TO_RAD;
//     this.anchor.set(0.5);
//     this.position.copy(data);
//     this.tween = tweenManager.createTween(this);
//     const random_distance_from_center = random_bound(-20, 20);
//     const random_distance_from_center2 = random_bound(-20, 20);
//     const random_rotation = Math.random() * 2 - 1;

//     this.tween.to({
//       'x'       : this.x + random_distance_from_center,
//       'y'       : this.y + random_distance_from_center2,
//       'rotation': random_rotation,
//     });
//     this.tween.time = 500;
//     this.tween.start();

//     World.add_to('gui', this);
//   }
// }

class Debris extends Sprite {
  constructor({
    id,
    image_name,
    height = 20,
    width = 100,
    rotation = 0,
    x,
    y,
    distance = 10,
    time = 300,
    alpha = 1,
  }) {
    super(Texture.fromImage(image_name || 'wood_rubble'));
    this.id       = id;
    this.height   = height;
    this.width    = width;
    this.alpha    = alpha;
    this.tint     = 0x007080;
    this.rotation = rotation;
    this.position.copy({ x, y });
    this.anchor.set(0, 1);

    const random_distance_from_centerX = random_bound(-distance, distance);
    const random_distance_from_centerY = random_bound(distance, distance);

    this.tween = tweenManager.createTween(this);
    this.tween.expire = true;
    this.tween.time = time;
    this.tween.to({
      'x'       : this.x + random_distance_from_centerX,
      'y'       : this.y + random_distance_from_centerY,
      'rotation': this.rotation + 0.2,
    });
    this.tween.start();

    World.add_to('gui', this);
  }
}

module.exports = {
  Debris,
};

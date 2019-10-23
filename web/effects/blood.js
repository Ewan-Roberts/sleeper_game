const { Sprite, Texture } = require('pixi.js');
const { World } = require('../engine/pixi_containers');
const { random_bound } = require('../utils/math.js');
const { tweenManager } = require('pixi.js');

const blood_options = [
  'Blood splatter 5-sc',
  'Blood splatter 18-sc',
  'Blood splatter 20-sc',
  'round_floor_stain',
];

const random_texture_name = () => {
  const random_index = random_bound(0, blood_options.length - 1);
  const random_blood_name = blood_options[random_index];
  return random_blood_name;
};

class Blood extends Sprite {
  static random_at(point) {
    const random_blood_name = random_texture_name();
    const sprite = new Sprite(Texture.fromImage(random_blood_name));
    sprite.width  /= 4;
    sprite.height /= 4;
    sprite.alpha  = 0.3;
    sprite.anchor.set(0, 0.5);
    sprite.position.copy(point);
    sprite.rotation = random_bound(0, 3);

    World.add_to('decal', sprite);
  }

  static pool_at(point) {
    const sprite = new Sprite(Texture.fromImage('round_floor_stain'));

    sprite.width  = 80;
    sprite.height = 80;
    sprite.alpha  = 0.1;
    sprite.anchor.set(0.5);
    sprite.position.copy(point);
    sprite.rotation = random_bound(0, 3);

    const tween = tweenManager.createTween(sprite);
    tween.to({
      'width' : sprite.width + 200,
      'height': sprite.height + 200,
      'alpha' : 0.6,
    });

    tween.time = 10000;
    tween.start();
    tween.expire = true;

    World.add_to('decal', sprite);
  }
}

module.exports = {
  Blood,
};


const { Texture } = require('pixi.js');

class rat_animations {
  static move_frames() {
    const moving_frames = [];

    for (let i = 2; i < 15; i++) {
      moving_frames.push(Texture.fromFrame(`rat_${i}`));
    }

    for (let i = 15; i > 1; i--) {
      moving_frames.push(Texture.fromFrame(`rat_${i}`));
    }

    moving_frames.push(Texture.fromFrame('rat_48'));
    moving_frames.push(Texture.fromFrame('rat_49'));
    moving_frames.push(Texture.fromFrame('rat_50'));
    moving_frames.push(Texture.fromFrame('rat_49'));
    moving_frames.push(Texture.fromFrame('rat_48'));

    return moving_frames;
  }

  static wait_frames() {
    return [
      Texture.fromFrame('rat_36'),
      Texture.fromFrame('rat_36'),
      Texture.fromFrame('rat_36'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_51'),
      Texture.fromFrame('rat_51'),
      Texture.fromFrame('rat_51'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_36'),
      Texture.fromFrame('rat_36'),
      Texture.fromFrame('rat_36'),
    ];
  }

  static dead_frames() {
    return [ Texture.fromFrame('rat_35') ];
  }

  static eat_frames() {
    return [
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_39'),
      Texture.fromFrame('rat_40'),
      Texture.fromFrame('rat_39'),
      Texture.fromFrame('rat_40'),
      Texture.fromFrame('rat_41'),
      Texture.fromFrame('rat_40'),
      Texture.fromFrame('rat_39'),
      Texture.fromFrame('rat_38'),
      Texture.fromFrame('rat_37'),
      Texture.fromFrame('rat_36'),
    ];
  }
}

const rodent_frames = {
  move:   rat_animations.move_frames(),
  attack: rat_animations.eat_frames(),
  death:  rat_animations.dead_frames(),
  eat:    rat_animations.eat_frames(),
  idle:   rat_animations.wait_frames(),
};


module.exports = {
  rodent_frames,
};

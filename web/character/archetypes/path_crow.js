const { PathSprite   } = require('../types/path');
const { sound        } = require('pixi.js');
const { random_bound } = require('../../utils/math.js');
const { Animation    } = require('../attributes/animation');
const { bird_frames  } = require('../animations/bird');
const { World        } = require('../../engine/pixi_containers');

class PathCrow extends PathSprite {
  constructor(data) {
    super(data);
    this.width  = 95;
    this.height = 30;
    this.add_component(new Animation(this, bird_frames));
    this.animation.wait();
    this.animation.speed = 0.29;
    const random_start_frame = random_bound(0, 15);
    this.gotoAndPlay(random_start_frame);
    this._set_sound();

    World.add_to('visual', this, { 'cull_sprite': false });
  }

  _set_sound() {
    this.fly_sound = sound.find('birds_fly_away');
    this.fly_sound.volume = 0.20;
  }

  start() {
    super.start();
    this.fly_sound.play();
  }
}

module.exports = {
  PathCrow,
};


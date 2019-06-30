const { PathSprite    } = require('../types/path');
const { sound         } = require('pixi.js');
const { random_bound  } = require('../../utils/math.js');
const { Animation     } = require('../attributes/animation');
const { bird_frames   } = require('../animations/bird');

class PathCrow extends PathSprite {
  constructor(data) {
    super(data);
    this.width  /= 2.5;
    this.height /= 2.5;
    this.add_component(new Animation(this, bird_frames));
    this.fly_sound = sound.find('birds_fly_away');
    this.fly_sound.volume = 0.40;
    this.wait();
  }

  wait() {
    this.animation.switch('wait');
    this.animationSpeed = 0.08;
    const random_start_frame = random_bound(0, 15);
    this.gotoAndPlay(random_start_frame);
  }

  talk() {
    this.fly_sound.play();
  }
}

module.exports = {
  PathCrow,
};

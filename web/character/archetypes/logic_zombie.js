const { zombie_frames } = require('../animations/zombie');
const { Animation     } = require('../attributes/animation');
const { LogicSprite   } = require('../types/logic');

class LogicZombie extends LogicSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, zombie_frames));
    this.animationSpeed = 0.30;
  }
}

module.exports = {
  LogicZombie,
};




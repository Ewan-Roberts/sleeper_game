const { zombie_frames } = require('../animations/zombie');
const { Animation     } = require('../attributes/animation');
const { LogicSprite   } = require('../types/logic');
const { Dialog        } = require('../../engine/script_generator');

class LogicZombie extends LogicSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, zombie_frames));
    this.anchor.set(0.5);
  }
}

module.exports = {
  LogicZombie,
};

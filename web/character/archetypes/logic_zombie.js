//const { draw_path        } = require('../../utils/line');
const { zombie_frames   } = require('../animations/zombie');
const { Animation        } = require('../attributes/animation');
const { LogicSprite        } = require('../types/logic');

class LogicZombie extends LogicSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, zombie_frames));
  }
}

module.exports = {
  LogicZombie,
};

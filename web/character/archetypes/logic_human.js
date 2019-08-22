const { human_frames } = require('../animations/human');
const { Animation    } = require('../attributes/animation');
const { LogicSprite  } = require('../types/logic');

class LogicHuman extends LogicSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, human_frames));
  }
}

module.exports = {
  LogicHuman,
};

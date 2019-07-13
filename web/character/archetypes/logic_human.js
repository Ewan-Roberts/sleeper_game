const { human_frames } = require('../animations/human');
const { Animation    } = require('../attributes/animation');
const { LogicSprite  } = require('../types/logic');
const { Dialog       } = require('../../engine/script_generator');

class LogicHuman extends LogicSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, human_frames));
    this.scripts = {};
    this.anchor.set(0.5);
  }

  add_script(name, array){
    this.scripts[name] = new Dialog(this, array);
  }
}

module.exports = {
  LogicHuman,
};

const { Texture, extras, tweenManager } = require('pixi.js');
const { human_frames } = require('../animations/human');
const { enemys       } = require('../../engine/pixi_containers');
const { Animation    } = require('../attributes/animation');
const { LogicSprite  } = require('../types/logic');
const { radian } = require('../../utils/math');

class LogicHuman extends LogicSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, human_frames));
  }
}


module.exports = {
  LogicHuman,
};

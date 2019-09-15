const { zombie_frames } = require('../animations/zombie');
const { Animation     } = require('../attributes/animation');
const { LogicSprite   } = require('../types/logic');
const { Blood         } = require('../../effects/blood');

class LogicTest extends LogicSprite {
  constructor(data) {
    super(data);

    this.add_component(new Animation(this, zombie_frames));
    this.animation.idle();
    this.animationSpeed = 0.30;
    // TODO this will fire before the general logic
    // Which is what we want, its unique for each entities
    // behaviour, but this information is hidden, consider way of
    // explaining this
    this.tween.on('repeat', () => {
      if(!this._target.vitals.alive) {
        this.animation.eat();
        Blood.pool_at(this.position);
        // this.tween.remove();
      }
    });
  }
}

module.exports = {
  LogicTest,
};


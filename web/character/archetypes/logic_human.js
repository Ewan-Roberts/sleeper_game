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

// TODO move to its own file
class ActorHuman extends extras.AnimatedSprite {
  constructor({
    id,
    x,
    y,
  }) {
    super([ Texture.fromFrame('bunny') ]);
    this.tween = tweenManager.createTween();
    this.name = 'actor';
    this.id   = id;
    this.height = 10;
    this.width  = 8;
    this.anchor.set(0.5);
    this.position.copy({ x, y });

    this.add_component(new Animation(this, human_frames));
    this.animation.speed = 0.70;
    this.animation.prefix = 'nothing';
    this.animation.idle();

    this.visible = false;
    enemys.addChild(this);
  }

  face_point(point) {
    this.rotation = radian(point, this);
  }


  add_component(component) {
    this[component.name] = component;
  }
}

module.exports = {
  LogicHuman,
  ActorHuman,
};

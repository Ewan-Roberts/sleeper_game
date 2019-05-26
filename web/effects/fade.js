'use strict';
const { tweenManager } = require('pixi.js');

//TODO this isnt really a mixin currently consider making it static
class Fade {
  static in(sprite) {
    const movement = tweenManager.createTween(sprite);
    movement.time = 150;
    movement.expire = true;

    movement.from({alpha: sprite.alpha});
    movement.to({alpha: 1});
    movement.start();
    sprite.visible = true;
  }

  static to(sprite, value) {
    const movement = tweenManager.createTween(sprite);
    movement.time = 150;
    movement.expire = true;

    movement.from({alpha: sprite.alpha});
    movement.to({alpha: value});
    movement.start();
  }

  static out_destroy(sprite) {
    const tweens = tweenManager.getTweensForTarget(sprite);

    if(tweens.length > 0) return;
    const movement = tweenManager.createTween(sprite);
    movement.time = 250;
    movement.expire = true;
    movement.from({alpha: sprite.alpha});
    movement.to({alpha: 0});
    movement.on('end', () => sprite.destroy());
    movement.start();
  }

  static out(sprite) {
    const movement = tweenManager.createTween(sprite);
    movement.time = 150;
    movement.expire = true;

    movement.from({alpha: sprite.alpha});
    movement.to({alpha: 0});
    movement.start();

    movement.on('end', () => sprite.visible = false);
  }
}

module.exports = {
  Fade,
};

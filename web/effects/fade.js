'use strict';
const PIXI = require('pixi.js');

//const tweening = PIXI.tweenManager.getTweensForTarget(sprite);
//TODO this isnt really a mixin currently consider making it static
class Fade {
  static in(sprite) {
    const movement = PIXI.tweenManager.createTween(sprite);
    movement.time = 150;
    movement.expire = true;

    movement.from({alpha: sprite.alpha});
    movement.to({alpha: 1});
    movement.start();
    sprite.visible = true;
  }

  to(sprite, value) {
    const movement = PIXI.tweenManager.createTween(sprite);
    movement.time = 150;
    movement.expire = true;

    movement.from({alpha: sprite.alpha});
    movement.to({alpha: value});
    movement.start();
  }

  static out(sprite) {
    const movement = PIXI.tweenManager.createTween(sprite);
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

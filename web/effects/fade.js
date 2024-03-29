const { tweenManager } = require('pixi.js');

class Fade {
  static in(sprite) {
    const movement  = tweenManager.createTween(sprite);
    movement.time   = 150;
    movement.expire = true;
    movement.to({ 'alpha': 1 });
    movement.start();
    sprite.visible = true;
  }

  static to(sprite, value) {
    const movement  = tweenManager.createTween(sprite);
    movement.time   = 150;
    movement.expire = true;
    movement.to({ 'alpha': value });
    movement.start();
    movement.on('end', () => movement.remove());
  }

  static out_destroy(sprite, time) {
    const tweens = tweenManager.getTweensForTarget(sprite);

    if(tweens.length > 0) {
      return;
    }
    const movement  = tweenManager.createTween(sprite);
    movement.time   = time || 400;
    movement.expire = true;
    movement.to({ 'alpha': 0 });
    movement.on('end', () => {
      movement.remove();
      sprite.destroy();
    });
    movement.start();
  }

  static out(sprite, { time = 150, visible_on_end = false } = {}) {
    const movement  = tweenManager.createTween(sprite);
    movement.time   = time;
    movement.expire = true;
    movement.to({ 'alpha': 0 });
    movement.start();

    movement.on('end', () => {
      sprite.renderable = visible_on_end;
      sprite.visible = visible_on_end;
      movement.remove();
    });
  }
}

module.exports = {
  Fade,
};

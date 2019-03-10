'use strict';
const PIXI = require('pixi.js');

// const { sleep } = require('../../utils/time');

class Route {
  constructor({ sprite, tween }) {
    this.name = 'route';

    this.tween  = tween;
    this.sprite = sprite;
  }

  start(point) {
    this.sprite.position.set(point);
  }

  async route_path(path) {
    const new_tween = PIXI.tweenManager.createTween(this.sprite);
    const new_path = new PIXI.tween.TweenPath();
    for (let i = 1; i < path.length; i++) {
      new_path.arcTo(
        path[i-1].x,
        path[i-1].y,
        path[i].x,
        path[i].y,
        50);
    }

    new_tween.path = new_path;
    new_tween.time = 3000;
    new_tween.delay = 2000;

    this.tween.movement.chain(new_tween);
  }

  stop() {
    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => tween.stop());
  }
}

module.exports = {
  Route,
};

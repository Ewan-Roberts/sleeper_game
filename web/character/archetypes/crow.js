'use strict';
const { enemys } = require('../../engine/pixi_containers');

const { Tween     } = require('../../engine/tween');
const { radian    } = require('../../utils/math');
const { Character } = require('../character_model');
const { Bird      } = require('../animations/bird');

// this should extend a character type
class Crow extends Character{
  constructor({ path, time, smooth, draw, turn } = {}) {
    super();
    this.name = 'crow';

    this.add_component(new Bird(this));
    this.tint = 0x352925;

    if(path) {
      this.add_component(new Tween(this.sprite));
      this.tween.add_path(path);
      this.tween.time = time || 10000;
      this.tween.path_smoothness = smooth || 100;
      if(draw) this.tween.draw_path();
      if(turn) {
        this.tween.movement.on('update', () => {
          this.sprite.rotation = radian(this.sprite, this.tween.movement.path._tmpPoint);
        });
      }
      this.tween.movement.on('end', () => {
        this.sprite.destroy();
      });
    }

    this.sprite.name = 'crow';
    enemys.addChild(this.sprite);
  }

  destroy() {
    this.sprite.destroy();
  }

}

module.exports = {
  Crow,
};

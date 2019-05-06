'use strict';
const { enemys    } = require('../../engine/pixi_containers');

const { Tween     } = require('../../engine/tween');
const { radian    } = require('../../utils/math');
const { Character } = require('../character_model');
const { Zombie    } = require('../animations/zombie');

// this should extend a character type
class Lurcher extends Character{
  constructor({ path, time, smooth, draw, turn } = {}) {
    super();
    this.name = 'lurcher';

    this.add_component(new Zombie(this));
    this.sprite.play();

    if(path) {
      this.add_component(new Tween(this.sprite));
      this.tween.add_path(path);
      this.tween.time = time | 10000;
      this.tween.path_smoothness = smooth | 100;
      if(draw) this.tween.draw_path();
      if(turn) {
        this.tween.movement.on('update', () => {
          this.sprite.rotation =
            radian(this.sprite, this.tween.movement.path._tmpPoint);
        });
      }
    }

    enemys.addChild(this.sprite);
  }
}

module.exports = {
  Lurcher,
};

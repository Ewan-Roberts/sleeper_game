'use strict';
const { enemys    } = require('../../engine/pixi_containers');
const { Tween     } = require('../../engine/tween');
const { Vitals    } = require('../attributes/vitals');
const { radian    } = require('../../utils/math');
const { Character } = require('../character_model');
const { Zombie    } = require('../animations/zombie');
const { Inventory } = require('../attributes/inventory');

class Lurcher extends Character{
  constructor({ id, path, time, smooth, draw, turn } = {}) {
    super();
    this.name = 'lurcher';
    this.id = id;
    this.add_component(new Zombie(this));
    this.add_component(new Inventory(this));
    this.add_component(new Vitals(this));

    if(path) {
      this.add_component(new Tween(this.sprite));
      this.tween.add_path(path);
      this.tween.time = time || 10000;
      this.tween.path_smoothness = smooth || 100;
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

'use strict';
const { enemys        } = require('../../engine/pixi_containers');
const { damage_events } = require('../../engine/damage_handler');

const { Tween     } = require('../../engine/tween');
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

    this.health = 100;
    const on_damage = ({id, damage}) => {
      if(this.id !== id) return;
      this.health -= damage;
      if(this.health > 0) return;

      damage_events.removeListener('damage', on_damage);
      this.tween.stop();
      this.loot.populate_with(['blood']);
      this.loot.set_position(this.sprite);
      this.loot.show();
      this.sprite.destroy();
    };
    damage_events.on('damage', on_damage);

    enemys.addChild(this.sprite);
  }
}

module.exports = {
  Lurcher,
};

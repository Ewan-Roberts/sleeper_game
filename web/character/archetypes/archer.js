'use strict';

const { tweenManager     } = require('pixi.js');
const { distance_between } = require('../../utils/math');
const { enemys    } = require('../../engine/pixi_containers');
const { Character } = require('../character_model');
const { Human     } = require('../animations/human');
const { Inventory } = require('../attributes/inventory');
const { Vitals    } = require('../attributes/vitals');
const { Pathfind  } = require('../attributes/pathfind');

const { Melee } = require('../attributes/melee');
const { Range } = require('../attributes/ranged');
const { Blood } = require('../../effects/blood');

class Archer extends Character {
  constructor() {
    super();
    this.name = 'archer';
    this.id = 6;
    this.add_component(new Human(this));

    this.add_component(new Inventory());
    this.add_component(new Vitals(this));
    this.add_component(new Pathfind(this.sprite));

    enemys.addChild(this.sprite);
    this.inventory.add_ranged_weapon_by_name('old_bow');
    this.inventory.add_melee_weapon_by_name('dev_knife');
    this.inventory.equip_ranged_weapon();
    this.animation.weapon = 'bow';
    this.blood = new Blood();

    this.add_component(new Melee(this));
    this.add_component(new Range(this));

    this._logic        = tweenManager.createTween(this.sprite);
    this._logic.time   = 800;
    this._logic.repeat = 20;
    this._logic.expire = true;
    this._logic.dead   = false;
  }

  _walk_to_enemy() {
    this.animation.walk();

    this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  _loot_enemy() {
    this.melee.equip();
    this.animation.idle();

    this.loot.take_items(this.enemy.loot.items);
    this.enemy.loot.empty();

    this.pathfind.stop();
    this._logic.stop();
    this._logic.remove();
  }

  _distance_to(point) {
    return distance_between(point, this.sprite);
  }

  get _target_far_away() {
    const distance = this._distance_to(this.enemy.sprite);

    return distance > 200;
  }

  enemy(character) {
    this.enemy = character;
  }

  logic_start() {
    this.animation.ready_weapon();
    this._logic.start();
    this._logic.on('repeat', () => {
      if(!this.vitals.alive) this.kill();

      if(this._target_far_away) {
        if(!this.enemy.vitals.alive) return this._walk_to_enemy();

        return this.range.attack(this.enemy, 20);
      }

      if(!this.enemy.vitals.alive) return this._loot_enemy();

      return this.melee.attack(this.enemy);
    });
  }
}

// const can_see_enemy = this.raycasting.contains_point(this.enemy.sprite);
// if(can_see_enemy){
// }

module.exports = {
  Archer,
};

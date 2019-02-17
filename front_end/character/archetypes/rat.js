'use strict';

const PIXI = require('pixi.js');

const { timer    } = require('../../engine/ticker');
const { PathFind } = require('../../engine/pathfind.js');
const { Entity_Container } = require('../../engine/entity_container.js');

const { Animal    } = require('../types/rat');
const { Melee     } = require('../attributes/melee');
const { Inventory } = require('../attributes/inventory');
const { Lootable  } = require('../attributes/lootable');
const { distance_between_points } = require('../../utils/math');

/**
 * @class
 * @extends Enemy
 * @memberof Rodent
 * @memberof Inventory
 * @memberof Lootable
 * @memberof Predator
 * @memberof Vitals
 */
class Rat extends Animal {
  constructor(enemy) {
    super();
    this.name = 'enemy';

    //---- hard dependancy
    this.add_component(new Inventory());
    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.equip_weapon_by_name('rat_teeth');
    this.add_component(new Melee(this));
    //----- hard dependancy

    this.add_component(new Lootable(this));
    this.enemy = enemy;
    this._logic = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;

    Entity_Container.add(this);
  }

  _stop_moving() {
    this.animation.kill();

    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => PIXI.tweenManager.removeTween(tween));
  }

  _walk_to_enemy() {
    this.animation.walk();
    PathFind.move_sprite_to_sprite_on_grid(this.sprite, this.enemy.sprite);
  }

  // TODO RAT LOGIC
  logic_start() {
    this._logic.start();
    this._logic.on('repeat', () => {

      if(!this.vitals.alive) {
        this.loot.populate();
        this.loot.create_icon();
        this._logic.stop();
        return this._stop_moving();
      }

      const distance = distance_between_points(this.enemy.sprite, this.sprite);

      if(distance > 200) return this._walk_to_enemy();

      if(distance < 200) return this.melee.attack(this.enemy);
    });

    this._logic.on('stop', () => console.log('i have been stopped'));
    this._logic.on('end', () => console.log('i end'));
  }

  logic_stop() {
    this._logic.stop();
  }
}


module.exports = {
  Rat,
};

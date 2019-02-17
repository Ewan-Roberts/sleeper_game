'use strict';

const PIXI = require('pixi.js');

const { timer    } = require('../../engine/ticker');
const { PathFind } = require('../../engine/pathfind.js');
const { Entity_Container } = require('../../engine/entity_container.js');

const { Enemy     } = require('../types/enemy');
const { Melee     } = require('../attributes/melee');
const { Range     } = require('../attributes/ranged');
const { Inventory } = require('../attributes/inventory');
const { Lootable  } = require('../attributes/lootable');
const { distance_between_points } = require('../../utils/math');

/**
 * @class
 * @extends Enemy
 * @memberof Human
 * @memberof Inventory
 * @memberof Lootable
 * @memberof Predator
 * @memberof Vitals
 * @memberof Raycasting
 */
class Archer extends Enemy {
  constructor(enemy) {
    super();
    this.name = 'enemy';

    //----- only hard dependancy
    this.add_component(new Inventory());
    this.inventory.add_ranged_weapon_by_name('old_bow');
    this.inventory.add_melee_weapon_by_name('rusty_knife');
    this.inventory.equip_weapon_by_name('old_bow');
    this.add_component(new Melee(this));
    this.add_component(new Range(this));
    //----- only hard dependancy

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


  logic_start() {
    this._logic.start();
    this.animation.ready_weapon();

    this._logic.on('repeat', () => {

      if(!this.vitals.alive) {

        this.loot.populate();
        this.loot.create_icon();
        this._logic.stop();
        return this._stop_moving();
      }

      const distance = distance_between_points(this.enemy.sprite, this.sprite);

      if(distance < 220) {
        if(!this.enemy.loot) return;

        this.animation.idle();
        this.enemy.loot.show();
        this.enemy.loot.items.forEach(item => this.loot.items.push(item));
        this.enemy.remove_component('loot');
      }

      if(!this.enemy.vitals.alive) return this._walk_to_enemy();

      // shoot thorugh walls
      //const can_see_enemy = this.raycasting.contains_point(this.enemy.sprite);
      //if(can_see_enemy){
      // this.stop_moving();

      if(distance > 200) return this.range.attack(this.enemy);

      return this.melee.attack_from_to(this, this.enemy);
      //}

      //return this.walk_to_enemy();
    });

    this._logic.on('stop', () => console.log('i have been stopped'));
    this._logic.on('end', () => console.log('i end'));
  }

  logic_stop() {
    this._logic.stop();
  }
}


module.exports = {
  Archer,
};

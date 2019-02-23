'use strict';

const PIXI = require('pixi.js');

const { timer            } = require('../../engine/ticker');
const { PathFind         } = require('../../engine/pathfind.js');
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
    this.inventory.add_ranged_weapon_by_name('dev_bow');
    this.animation.weapon = 'bow';
    this.inventory.add_melee_weapon_by_name('dev_knife');
    this.inventory.equip_weapon_by_name('dev_bow');
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
    const tweens = PIXI.tweenManager.getTweensForTarget(this.sprite);

    tweens.forEach(tween => PIXI.tweenManager.removeTween(tween));
  }

  _walk_to_enemy() {
    this.animation.walk();

    PathFind.move_sprite_to_sprite_on_grid(this.sprite, this.enemy.sprite);
  }

  kill() {
    if(!this.loot.items) this.loot.populate();
    // this.loot.populate();
    this.loot.create_icon();
    this.animation.kill();

    this._stop_moving();
    this._logic.remove();
  }

  _loot_enemy() {
    this.melee.equip_weapon();
    this.animation.idle();

    this._stop_moving();

    this.enemy.loot.items.forEach(item => this.loot.items.push(item));
    this.enemy.loot.empty();

    this.face_sprite(this.enemy.sprite);

    this._logic.remove()
  }

  logic_start() {
    this._logic.start();
    this.animation.ready_weapon();

    this._logic.on('repeat', () => {
      const distance = distance_between_points(this.enemy.sprite, this.sprite);

      if(distance < 220) {
        if(!this.enemy.loot) return;
        this._loot_enemy();
      }

      if(!this.enemy.vitals.alive) return this._walk_to_enemy();

      // shoot through walls
      // const can_see_enemy = this.raycasting.contains_point(this.enemy.sprite);
      // if(can_see_enemy){
      this._stop_moving();

      if(distance > 200) return this.range.attack(this.enemy);

      return this.melee.attack(this.enemy);
      // }
    });

    this._logic.on('stop', () => console.log('i have been stopped'));
    this._logic.on('end', () => console.log('i end'));
  }
}


module.exports = {
  Archer,
};

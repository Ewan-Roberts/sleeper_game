'use strict';

const { timer            } = require('../../engine/ticker');
const { Entity_Container } = require('../../engine/entity_container.js');
const { distance_between } = require('../../utils/math');

const { Enemy } = require('../types/enemy');
const { Melee } = require('../attributes/melee');
const { Range } = require('../attributes/ranged');

class Archer extends Enemy {
  constructor() {
    super();
    this.name = 'archer';

    this.inventory.add_ranged_weapon_by_name('old_bow');
    this.inventory.add_melee_weapon_by_name('dev_knife');
    this.inventory.equip_ranged_weapon();
    this.animation.weapon = 'bow';

    this.add_component(new Melee(this));
    this.add_component(new Range(this));

    this._logic = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;

    Entity_Container.add(this);
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

    this.logic_start();
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();
    this.loot.create_icon();

    this.animation.kill();

    this.pathfind.stop();
    this._logic.stop();
    this._logic.remove();
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

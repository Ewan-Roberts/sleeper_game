'use strict';

const { timer            } = require('../../engine/ticker');
const { Entity_Container } = require('../../engine/entity_container.js');
const { distance_between } = require('../../utils/math');

const { Animal } = require('../types/rat');
const { Melee  } = require('../attributes/melee');

class Rat extends Animal {
  constructor() {
    super();
    this.name = 'rat';

    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));

    this._logic        = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;

    Entity_Container.add(this);
  }

  _walk_to_enemy() {
    this.animation.walk();

    this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  _distance_to(point) {
    return distance_between(point, this.sprite);
  }

  get _target_far_away() {
    const distance = this._distance_to(this.enemy.sprite);

    return distance > 200;
  }

  kill() {
    if(!this.loot.items.length) this.loot.populate();
    this.loot.create_icon();

    this.animation.kill();

    this.pathfind.stop();
    this._logic.stop();
    this._logic.remove();
  }

  enemy(character) {
    this.enemy = character;
  }

  logic_start() {
    if(!this.enemy) return new Error('no enemy');
    this._logic.start();

    this._logic.on('repeat', () => {
      if(!this.vitals.alive) this.kill();

      if(this._target_far_away) return this._walk_to_enemy();

      return this.melee.attack(this.enemy);
    });
  }
}


module.exports = {
  Rat,
};

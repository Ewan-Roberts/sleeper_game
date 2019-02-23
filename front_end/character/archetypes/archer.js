'use strict';

const { timer            } = require('../../engine/ticker');
const { Entity_Container } = require('../../engine/entity_container.js');

const { Enemy     } = require('../types/enemy');
const { Melee     } = require('../attributes/melee');
const { Range     } = require('../attributes/ranged');
const { Inventory } = require('../attributes/inventory');

class Archer extends Enemy {
  constructor() {
    super();
    this.name = 'archer';

    this.add_component(new Inventory());
    this.inventory.add_ranged_weapon_by_name('old_bow');
    this.inventory.add_melee_weapon_by_name('dev_knife');
    this.inventory.equip_ranged_weapon();
    this.animation.weapon = 'bow';
    // TODO these are coupled
    this.add_component(new Melee(this));
    this.add_component(new Range(this));

    Entity_Container.add(this);
  }

  enemy(character) {
    this.enemy = character;
  }

  _walk_to_enemy() {
    this.animation.walk();

    this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  kill() {
    if(!this.loot.items) this.loot.populate();
    this.loot.create_icon();

    this.animation.kill();

    this.pathfind.stop();
    this._logic.remove();
  }

  _loot_enemy() {
    this.melee.equip();
    this.animation.idle();
    this.pathfind.stop();

    this.loot.take_items(this.enemy.loot.items);
    this.enemy.loot.empty();

    this._logic.remove();
  }

  logic_start() {
    this._logic = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;
    this._logic.start();

    this.animation.ready_weapon();

    this._logic.on('repeat', () => {
      const distance = this.distance_to(this.enemy.sprite);

      if(distance < 220) {
        if(!this.enemy.vitals.alive) return this._loot_enemy();

        return this.melee.attack(this.enemy);
      }

      if(!this.enemy.vitals.alive) return this._walk_to_enemy();

      return this.range.attack(this.enemy);
    });
  }
}

// const can_see_enemy = this.raycasting.contains_point(this.enemy.sprite);
// if(can_see_enemy){
// }

module.exports = {
  Archer,
};

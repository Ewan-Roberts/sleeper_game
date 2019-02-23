'use strict';

const { timer    } = require('../../engine/ticker');
const { Entity_Container } = require('../../engine/entity_container.js');

const { Animal    } = require('../types/rat');
const { Melee     } = require('../attributes/melee');
const { Inventory } = require('../attributes/inventory');
const { Lootable  } = require('../attributes/lootable');
const { Pathfind  } = require('../attributes/pathfind');
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
  constructor() {
    super();
    this.name = 'enemy';

    //---- hard dependancy
    this.add_component(new Inventory());
    this.inventory.add_melee_weapon_by_name('rat_teeth');
    //TODO maybe remove, handy but implies ranged weapon
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));
    this.add_component(new Pathfind(this.sprite));
    //----- hard dependancy

    this.add_component(new Lootable(this));
    this._logic = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;

    Entity_Container.add(this);
  }

  enemy(character) {
    this.enemy = character;
  }

  kill() {
    this.loot.populate();
    this.loot.create_icon();
    this.animation.kill();

    this.pathfind.stop();
    this._logic.remove();
  }

  _walk_to_enemy() {
    this.animation.walk();

    this.pathfind.go_to_sprite(this.enemy.sprite);
  }

  logic_start() {
    if(!this.enemy) return new Error('no enemy');

    this._logic.start();
    this._logic.on('repeat', () => {

      if(!this.vitals.alive) this.kill();

      const distance = this.distance_to(this.enemy.sprite);

      if(distance > 200) return this._walk_to_enemy();

      if(distance < 200) return this.melee.attack(this.enemy);
    });

    this._logic.on('stop', () => console.log('i have been stopped'));
    this._logic.on('end', () => console.log('i end'));
  }
}


module.exports = {
  Rat,
};

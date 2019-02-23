'use strict';

const { timer            } = require('../../engine/ticker');
const { Entity_Container } = require('../../engine/entity_container.js');

const { Animal    } = require('../types/rat');
const { Melee     } = require('../attributes/melee');
const { Inventory } = require('../attributes/inventory');
const { Pathfind  } = require('../attributes/pathfind');

class Rat extends Animal {
  constructor() {
    super();
    this.name = 'rat';

    this.add_component(new Inventory());
    this.inventory.add_melee_weapon_by_name('rat_teeth');
    this.inventory.equip_melee_weapon();
    this.add_component(new Melee(this));
    this.add_component(new Pathfind(this.sprite));

    Entity_Container.add(this);
  }

  enemy(character) {
    this.enemy = character;
  }

  kill() {
    if(!this.loot.items) this.loot.populate();
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
    this._logic = timer.createTimer(800);
    this._logic.repeat = 20;
    this._logic.expire = true;

    if(!this.enemy) return new Error('no enemy');

    this._logic.start();
    this._logic.on('repeat', () => {
      const distance = this.distance_to(this.enemy.sprite);
      if(distance > 200) return this._walk_to_enemy();

      return this.melee.attack(this.enemy);
    });
  }
}


module.exports = {
  Rat,
};

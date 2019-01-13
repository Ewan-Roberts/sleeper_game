'use strict';

const { viewport  } = require('../../engine/viewport');
const { construct } = require('../../engine/constructor');

const { find_weapon_by_name } = require('../../data/item_data');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Inventory } = require('../attributes/Inventory');
const { Predator  } = require('../attributes/predator');

const enemy_container = viewport.getChildByName('enemy_container');

// logic
//  - give enemy a weapon with a damage value
//  - when the enemy is close to the enemy attack them and do damage


class Enemy extends construct(Character, Vitals, Predator, Inventory) {
  constructor() {
    super();
    this.name = 'enemy';

    const knife = find_weapon_by_name('rusty_knife');

    this.equip_item(knife);

    enemy_container.addChild(this.sprite);
  }
}


module.exports = {
  Enemy,
};

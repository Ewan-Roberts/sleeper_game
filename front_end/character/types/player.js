'use strict';

const { viewport  } = require('../../engine/viewport.js');
const { construct } = require('../../engine/constructor');
const { Keyboard  } = require('../../engine/keyboard');
const { Mouse     } = require('../../engine/mouse');
const { PlayerVisualModel } = require('../../engine/inventory_manager');

const character_animations = require('./animations/character');

const {
  get_item_by_name,
} = require('../../items/item_data');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Inventory } = require('../attributes/inventory');
const { Predator  } = require('../attributes/predator');

const player_inventory_model = {
  head:             get_item_by_name('sunglasses'),
  hat:              get_item_by_name('bandana'),
  slot_one:         get_item_by_name('keys'),
  slot_two:         get_item_by_name('ball'),
  chest:            get_item_by_name('torn_clothes'),
  feet:             get_item_by_name('army_boots'),
  primary_weapon:   get_item_by_name('old_bow'),
  secondary_weapon: get_item_by_name('pistol'),
  melee_weapon:     get_item_by_name('wrench_blade'),
  util:             get_item_by_name('util'),
  item_slots:       [],
};

const test_inventory = new PlayerVisualModel();
test_inventory.head('old_bandana');
test_inventory.hat('old_helmet');
test_inventory.chest('old_clothes');
test_inventory.shoes('old_boots');
test_inventory.background('merc_portrait');
test_inventory.primary_weapon('wrench_blade');
test_inventory.secondary_weapon('rusty_knife');
test_inventory.inventory_slot('rat_leg_bone', 0);
test_inventory.inventory_slot('rat_femur', 1);
test_inventory.inventory_slot('meat', 2);
test_inventory.inventory_slot('skull_cap_bone', 3);

//test_inventory.slot_one('keys');
//test_inventory.slot_two('ball');
//test_inventory.inventory('skull_cap_bone');
//test_inventory.small_weapon('meat');


class Player extends construct(Character, Keyboard, Mouse, Inventory, Vitals, Predator) {
  constructor() {
    super();
    this.sprite = character_animations.animated.knife.walk;
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.play();

    const knife = get_item_by_name('rusty_knife');
    this.equip_item(knife);

    this.name = 'player';
    this.sprite.height /= 2;
    this.sprite.width /= 2;
  }

  add_controls() {
    viewport.on('mouseup', (event) => {
      this.mouse_up(event);
    });

    viewport.on('mousemove', (event) => {
      this.mouse_move(event);
    });

    viewport.on('mousedown', (event) => {
      this.mouse_down(event);
    });

    global.window.addEventListener('keydown', (event) => {
      this.key_down(event);
    });

    global.window.addEventListener('keyup', () => {
      this.key_up();
    });

    viewport.addChild(this.sprite);
  }
}

module.exports = {
  Player,
};

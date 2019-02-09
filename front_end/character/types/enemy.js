'use strict';

const PIXI = require('pixi.js');

const { viewport  } = require('../../engine/viewport');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Inventory } = require('../attributes/Inventory');
const { Predator  } = require('../attributes/predator');

const { get_item_by_name } = require('../../items/item_data');

const enemy_container = viewport.getChildByName('enemy_container');
const character_animations = require('../types/animations/character');

class Enemy extends Character {
  constructor() {
    super();
    this.name = 'enemy';

    this.sprite = new PIXI.extras.AnimatedSprite(character_animations.knife.walk);
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();

    this.addComponent(new Inventory());
    this.addComponent(new Predator(this));
    this.addComponent(new Vitals());

    const knife = get_item_by_name('rusty_knife');
    this.inventory.equip_item(knife);

    enemy_container.addChild(this.sprite);
  }
}

module.exports = {
  Enemy,
};

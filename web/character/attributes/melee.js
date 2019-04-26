'use strict';
const PIXI = require('pixi.js');

const { melee_attack } = require('../../engine/melee');
const { visual_effects_container } = require('../../engine/pixi_containers');

class Melee {
  constructor({ inventory, animation, sprite }) {
    if(!inventory) throw new Error('This component needs an inventory');
    this.name      = 'melee';

    this.inventory = inventory;
    this.animation = animation;
    this.sprite    = sprite;

    this.melee_weapon = inventory.melee_weapon;
  }

  equip() {
    this.inventory.switch_to_melee_weapon();

    this.animation.weapon = this.melee_weapon.animation_name;
  }

  hit_box() {
    const box = new PIXI.Sprite.fromFrame('black_dot');
    box.width = 50;
    box.height= 300;
    box.position.set(this.sprite.x,this.sprite.y);
    box.anchor.y = 1;
    box.anchor.x = 0.5;
    box.alpha = 0.5;
    box.rotation = this.sprite.rotation + 1.57;

    visual_effects_container.addChild(box);
  }

  attack(target) {
    this.equip();
    this.animation.attack();

    this.animation.face_point(target.sprite);

    this.hit_box(target.sprite);

    melee_attack(this.melee_weapon, target);
  }
}

module.exports = {
  Melee,
};

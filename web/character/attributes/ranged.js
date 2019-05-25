'use strict';
const { Graphics    } = require('pixi.js');
const { shoot_arrow } = require('../../engine/ranged');
const { visuals     } = require('../../engine/pixi_containers');

class Aiming_Line {
  constructor() {
    this.name = 'aiming_line';

    this.line = new Graphics();
    this.line.lineStyle(0.1, 0xffffff);
  }

  add_between_sprites(start, end) {

    this.line.moveTo(start.x, start.y)
      .lineTo(end.x, end.y);

    visuals.addChild(this.line);
  }
}

class Range {
  constructor({ inventory, animation, sprite }) {
    this.name      = 'range';
    this.inventory = inventory;
    this.animation = animation;
    this.sprite    = sprite;
    this.aiming    = new Aiming_Line();
  }

  equip() {
    //this.inventory.switch_to_ranged_weapon();
    this.animation.weapon = this.inventory.ranged_weapon.animation_name;
  }

  attack(target) {
    this.equip();
    //this.animation.ready_weapon();
    this.animation.face_point(target.sprite);

    const ranged_weapon = this.inventory.ranged_weapon;
    const origin = this.sprite;
    shoot_arrow(ranged_weapon.speed, ranged_weapon.damage, origin, target.sprite);
  }

  _add_line(sprite) {
    this.line.add_between_sprites(this.sprite, sprite);
  }
}

module.exports = {
  Range,
};

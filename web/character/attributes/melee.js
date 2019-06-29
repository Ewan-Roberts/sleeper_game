// 'use strict';
// const { Sprite     } = require('pixi.js');
// const { visuals    } = require('../../engine/pixi_containers');
// const { face_point } = require('../../utils/math');

// class Melee {
//   constructor({ inventory, animation, sprite }) {
//     if(!inventory) throw new Error('This component needs an inventory');
//     this.name      = 'melee';

//     this.inventory = inventory;
//     this.animation = animation;
//     this.sprite    = sprite;

//     this.melee_weapon = inventory.melee_weapon;
//     this.create_hit_box();
//   }

//   equip() {
//     this.inventory.equip(this.melee_weapon.name);
//     this.animation.weapon = this.melee_weapon.animation_name;
//   }

//   create_hit_box() {
//     this.box          = new Sprite.fromFrame('black_dot');
//     this.box.width    = 50;
//     this.box.height   = 300;
//     this.box.anchor.y = 1;
//     this.box.anchor.x = 0.5;
//     this.box.alpha    = 0.5;

//     visuals.addChild(this.box);
//   }

//   hit_box() {
//     this.box.position.set(this.sprite.x,this.sprite.y);

//     this.box.rotation = this.sprite.rotation + 1.57;
//   }
// }

// module.exports = {
//   Melee,
// };

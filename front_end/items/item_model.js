'use strict';

function condition () {}
function cost() {}
function cost() {}
function rank() {}

class Item {
  pool(...args) {}
  id() {}
  melee() {}
  ranged() {}
  primary() {}
  secondary() {}
  material() {}
  hat() {}
  head() {}
  slot() {}
  feet() {}
  chest() {}
  util() {}
  type() {}
  all() {}
  extract_image() {}
  by_name() {}
  by_image_name() {}
  random() {}
}




// const { non_collision_container,
//   collision_container,
// } = require('../engine/pixi_containers.js');

// class Item {
//   set_position(point) {
//     this.sprite.position.set(point.x, point.y);
//   }

//   with_character_collision() {
//     collision_container.addChild(this.sprite);
//   }

//   with_projectile_collision() {
//     this.sprite.hitable_with_arrow = true;
//   }

//   without_projectile_collision() {
//     this.sprite.hitable_with_arrow = false;
//   }

//   without_character_collision() {
//     non_collision_container.addChild(this.sprite);
//   }

//   moveable() {
//     this.sprite.moveable = true;
//   }

//   immovable() {
//     this.sprite.moveable = false;
//   }

// }

module.exports = {
  Item,
};

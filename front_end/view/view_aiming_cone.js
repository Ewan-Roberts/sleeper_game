'use strict';

const PIXI = require('pixi.js');
const { viewport          } = require('../../engine/viewport');

//this.aiming_cone.alpha = 0;
//this.aiming_cone.count = 10;
//this.aiming_cone.width = 500;
//this.aiming_cone.height = 300;
//TODO presuposes vitals REMOVE
//this.vitals.power = 900;

//this.animation_switch('bow', 'ready');
//this.sprite.loop = false;
//this.count_down = () => {
//  if (!this.sprite.shift_pressed){
//    ticker.remove(this.count_down);
//    this.aiming_cone.alpha = 0;
//    return;
//  }
//  if(this.power < 300) {
//    this.sprite.textures = this.sprite.animations.bow.idle;
//    ticker.remove(this.count_down);
//    return;
//  }
//  if (this.power > 650) {
//    this.allow_shoot = false;
//  } else {
//    this.allow_shoot = true;
//  }

//  this.aiming_cone.width -= 1.5;
//  this.aiming_cone.height += 3;
//  this.aiming_cone.alpha += 0.002;
//  this.aiming_cone.count -= 0.04;
//  //this.aiming_cone.filters[0].blur = this.aiming_cone.count;

//  if (this.power > 400) {
//    this.power -= 5;
//  }
//};
//ticker.add(this.count_down);

// if(this.aiming_cone) {
//   this.aiming_cone.rotation = radian(this.sprite, mouse_position_player);
// }


class Aiming_Cone {
  add_aiming_cone() {
    this.aiming_cone = PIXI.Sprite.fromFrame('yellow_triangle');

    this.aiming_cone.height = 800;
    this.aiming_cone.width = 400;
    this.aiming_cone.anchor.x = 0.5;
    this.aiming_cone.alpha = 0;
    //this.aiming_cone.filters = [new PIXI.filters.BlurFilter()];
    this.aiming_cone.name = 'aiming_cone';
    this.aiming_cone.position.set(this.sprite.x, this.sprite.y);

    viewport.addChild(this.aiming_cone);
  }

}

module.exports = {
  Aiming_Cone,
};

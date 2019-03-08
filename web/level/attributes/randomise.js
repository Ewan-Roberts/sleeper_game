'use strict';
const PIXI = require('pixi.js');

const { visual_effects_container } = require('../../engine/pixi_containers');
const { random_bound } = require('../../utils/math');

const { Chest     } = require('../elements/chest');
const { Hay       } = require('../elements/hay_bale');
const { Backpack  } = require('../elements/back_pack');
const { Workbench } = require('../elements/workbench');
const { Chair     } = require('../elements/chair');
const { Matress   } = require('../elements/dirty_matress');

class Randomise {
  constructor() {
    this.area = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.area.alpha = 0.1;
    this.area.anchor.set(0.5);
    this.rotate_items = true;
    // this.area.tint = 0xff0000;
    visual_effects_container.addChild(this.area);
  }

  set height(value) {
    this.area.height = value;
  }

  set anchor(value) {
    this.area.anchor.set(value);
  }

  set width(value) {
    this.area.width = value;
  }

  populate_with_item(name) {
    let item = null;
    switch(name) {
      case 'workbench' : item = new Workbench(); break;
      case 'hay'       : item = new Hay();       break;
    }

    const point = this.bound_point(item.sprite);

    item.set_position(point);
  }

  random_items() {
    //TODO these ae created when invoked

    const item_array = [
      new Hay(),
      new Chest(),
      new Backpack(),
      new Workbench(),
      new Matress(),
      new Chair(),
    ];
    const item = item_array[Math.floor(Math.random()*item_array.length)];

    const point = this.bound_point(item.sprite);

    item.set_position(point);
  }

  box(value) {
    this.area.width  = value;
    this.area.height = value;
  }

  set alpha(value) {
    this.area.alpha = value;
  }

  set tint(color) {
    switch(color) {
      case 'red'    : this.area.tint = 0xff0000; break;
      case 'yellow' : this.area.tint = 0xbdb76b; break;
      case 'white'  : this.area.tint = 0xffffff; break;
      case 'green'  : this.area.tint = 0x008000; break;
      case 'grey'   : this.area.tint = 0xd3d3d3; break;
    }
  }

  set_position({x,y}) {
    this.area.position.set(x,y);
  }

  bound_point(sprite) {
    //This always uses the largest of height and width
    //This is done so you dont have to worry about rotation
    const bound = (sprite.width > sprite.height)?sprite.width:sprite.height;

    const minX = -this.area.width + bound;
    const maxX =  this.area.width - bound;

    const minY = -this.area.height + bound;
    const maxY =  this.area.height - bound;

    const point_x = random_bound(minX, maxX)/2;
    const point_y = random_bound(minY, maxY)/2;

    //TODO this function shouldnt change the state of sprites
    if(this.rotate_items) {
      sprite.rotation = random_bound(-1.57, 1.57);
    }

    return {
      x: this.area.x + point_x,
      y: this.area.y + point_y,
    };
  }
}

module.exports = {
  Randomise,
};

'use strict';

const PIXI = require('pixi.js');

const { viewport             } = require('../engine/viewport');
const { move_sprite_to_point } = require('../engine/pathfind');

class Character {
  constructor() {
    const texture = [PIXI.Texture.fromFrame('bunny')];

    this.sprite = new PIXI.extras.AnimatedSprite(texture);
    this.sprite.interactive = true;
    //this.sprite.buttonMode = true;
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  move_to_point(x,y) {
    move_sprite_to_point(this, {
      middle: {
        x,
        y,
      },
    });
  }

  follow_sprite_with_camera() {
    viewport.follow(this.sprite);
  }

  add_sight_line() {
    const sight_line_box = PIXI.Sprite.fromFrame('black_dot');

    sight_line_box.name     = 'sight_line';
    sight_line_box.width    = 3000;
    sight_line_box.height   = 600;
    sight_line_box.anchor.y = 0.5;
    sight_line_box.alpha    = 0.2;

    this.sprite.addChild(sight_line_box);
  }

  add_influence_box() {
    const influence_box = PIXI.Sprite.fromFrame('black_dot');

    influence_box.name   = 'influence_box';
    influence_box.width  = 2000;
    influence_box.height = 2000;
    influence_box.alpha  = 0.4;
    influence_box.anchor.set(0.5);

    this.sprite.addChild(influence_box);
  }

  with_light() {
    console.log('Be aware this may overlay and not allow touch events');

    const light  = PIXI.Sprite.fromFrame('light_gradient');
    light.name   = 'light';
    light.width  = 2000;
    light.height = 2000;
    light.alpha  = 0.1;
    light.anchor.set(0.5);

    this.sprite.addChild(light);
  }
}

module.exports = {
  Character,
};



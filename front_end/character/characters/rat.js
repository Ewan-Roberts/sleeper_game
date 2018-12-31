'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const rat_animations = require('../animations/rat');
const { move_sprite_to_point, distance_between_two_points, move_sprite_to_sprite_on_grid } = require('../../engine/pathfind');
const ticker = require('../../engine/ticker');


const angle = (anchor, point) => Math.atan2( anchor.y - point.y,anchor.x - point.x)

class Rat {
  constructor() {

    this.animations = rat_animations;

    this.sprite = new PIXI.extras.AnimatedSprite(this.animations.move);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.rotation = -0.5;
    this.sprite.play();
    this.sprite.name = 'rat';

    viewport.getChildByName('critter_container').addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  // todo this is from the player model
  add_influence_box() {
    this.influence_box = PIXI.Sprite.fromFrame('black_dot');

    this.influence_box.name = 'influence_box';
    this.influence_box.width = 500;
    this.influence_box.height = 500;
    this.influence_box.alpha = 0.4;
    this.influence_box.anchor.set(0.5);

    this.sprite.addChild(this.influence_box);
  }

  is_prey_to(predator) {
    const prey  = this.sprite;

    const point_to_run_for = new PIXI.Sprite.fromFrame('bunny');
    point_to_run_for.name = 'dot';

    ticker.add(() => {
      point_to_run_for.position.set(prey.x + (prey.x - predator.x), prey.y +(prey.y - predator.y));

      if(this.influence_box.containsPoint(predator.getGlobalPosition())) {
        move_sprite_to_sprite_on_grid(prey, point_to_run_for);
      }

    });

    viewport.getChildByName('critter_container').addChild(point_to_run_for);

    //setInterval(()=> {

    //  move_sprite_to_sprite_on_grid(prey, point_to_run_for);

    //},2000);
  }

  distance_to_player() {
    //const player = viewport.getChildByName('player');

    //const distance = distance_between_two_points(this.sprite, player);

  }

  move_to_point(point) {
    move_sprite_to_point(this.sprite, {
      middle: {
        x: point.x,
        y: point.y,
      },
    });
  }
}

module.exports = {
  Rat,
};

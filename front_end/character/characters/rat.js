'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const rat_animations = require('../animations/rat');
const {
  move_sprite_to_point,
  move_sprite_to_sprite_on_grid,
} = require('../../engine/pathfind');

const { Inventory } = require('../attributes/inventory');
const { Vitals } = require('../attributes/vitals');
const { GUI_Container } = require('../../gui/container');

const ticker = require('../../engine/ticker');

//const angle = (anchor, point) => Math.atan2( anchor.y - point.y,anchor.x - point.x)

class Rat {
  constructor() {
    this.sprite = new PIXI.extras.AnimatedSprite(rat_animations.move);

    this.sprite.animations = rat_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.rotation = -0.5;
    this.sprite.play();
    this.sprite.name = 'rat';
    this.sprite.height *= 2;
    this.sprite.width *= 2;
    this.sprite.inventory = new Inventory();
    // for testing
    this.sprite.inventory.spike_populate_inventory();

    this.sprite.status = new Vitals();
    viewport.getChildByName('critter_container').addChild(this.sprite);
  }

  create_patrol_path(path_data) {
    this.sprite.patrol_path = path_data;
  }

  lootable_on_death() {
    this.sprite.kill = () => {

      this.sprite.stop();
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.texture = this.sprite.animations.dead;
      this.sprite.status = 'dead';

      const get_tween = PIXI.tweenManager.getTweensForTarget(this.sprite);
      if(get_tween[0]) {
        get_tween[0].stop();
      }

      this.sprite.click = () => {
        console.log(this.sprite.inventory.slots);

        const inventory_visuals = new GUI_Container(this.sprite);
        inventory_visuals.add_item_tiles();

        console.log(this.sprite.inventory.slots);

        this.sprite.inventory.slots.forEach(item => {
          inventory_visuals.populate_slot_1(item.image_name);
        });

      };

    };

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

  add_inventory() {
  }

  is_prey_to(predator) {
    this.add_influence_box();

    const prey  = this.sprite;

    const point_to_run_for = new PIXI.Sprite.fromFrame('bunny');
    point_to_run_for.name = 'dot';

    ticker.add(() => {
      point_to_run_for.position.set(prey.x + (prey.x - predator.x), prey.y +(prey.y - predator.y));

      if(this.sprite.status.alive && this.influence_box.containsPoint(predator.getGlobalPosition())) {
        move_sprite_to_sprite_on_grid(prey, point_to_run_for);
      }
    });

    viewport.getChildByName('critter_container').addChild(point_to_run_for);
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

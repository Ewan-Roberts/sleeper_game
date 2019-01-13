'use strict';

const PIXI = require('pixi.js');

const { viewport             } = require('../engine/viewport');
const { ticker               } = require('../engine/ticker');
const { get_intersection     } = require('../engine/raycasting');
const { move_sprite_to_point } = require('../engine/pathfind');

const character_animations = require('./animations/character');

class Character {
  constructor() {
    this.sprite = new PIXI.extras.AnimatedSprite(character_animations.knife.idle);
    this.sprite.animations = character_animations;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();

    //for example bow, idle or nothing, idle
    this.sprite.animation_switch = (type, action) => {
      if(this.sprite.textures !== this.sprite.animations[type][action]) {
        this.sprite.textures = this.sprite.animations[type][action];
        this.sprite.loop = true;
        this.sprite.play();
      }
    };
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

    sight_line_box.name = 'sight_line';
    sight_line_box.width = 3000;
    sight_line_box.height = 600;
    sight_line_box.anchor.y = 0.5;
    sight_line_box.alpha = 0.2;

    this.sprite.addChild(sight_line_box);
  }

  add_influence_box() {
    const influence_box = PIXI.Sprite.fromFrame('black_dot');

    influence_box.name = 'influence_box';
    influence_box.width = 2000;
    influence_box.height = 2000;
    influence_box.alpha = 0.4;
    influence_box.anchor.set(0.5);

    this.sprite.addChild(influence_box);
  }

  with_light() {
    const light = PIXI.Sprite.fromFrame('light_gradient');
    light.name = 'light';

    light.anchor.set(0.5);
    light.width   = 2000;
    light.height  = 2000;
    light.alpha   = 0.1;

    this.sprite.addChild(light);
  }

  add_raycasting(level_segments) {
    const raycast = new PIXI.Graphics();
    const points = [];
    level_segments.forEach(seg => points.push(seg.a,seg.b));

    const light = this.sprite.getChildByName('light');
    light.mask = raycast;
    // light._filters = [new PIXI.filters.BlurFilter(10)]; // test a filter

    ticker.add(() => {
      const unique_angles = [];
      let intersects = [];

      raycast.clear();
      raycast.beginFill(0xfffffff, 0.05);

      points.forEach(elem => {
        const angle = Math.atan2(elem.y - this.sprite.y, elem.x - this.sprite.x);
        elem.angle = angle;
        unique_angles.push(angle - 0.00001, angle + 0.00001);
      });

      for(let k=0; k < unique_angles.length; k++){
        const angle = unique_angles[k];
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const ray = {
          a: {x: this.sprite.x,       y: this.sprite.y},
          b: {x: this.sprite.x + dx,  y: this.sprite.y + dy},
        };

        let closest_intersect = null;
        for(let i=0; i < level_segments.length; i++){
          const intersect = get_intersection(ray, level_segments[i]);
          if(!intersect) continue;
          if(!closest_intersect || intersect.param<closest_intersect.param){
            closest_intersect = intersect;
          }
        }
        if(!closest_intersect) continue;

        closest_intersect.angle = angle;
        intersects.push(closest_intersect);
      }

      intersects = intersects.sort((a,b) => a.angle - b.angle);

      raycast.moveTo(intersects[0].x, intersects[0].y).lineStyle(0.5, 0xffd900, 5);

      for (let i = 0; i < intersects.length; i++) {
        raycast.lineTo(intersects[i].x, intersects[i].y);
      }

      //const player_sprite = viewport.getChildByName('player');
      //const player_position = player_sprite.getGlobalPosition();

      //if(this.sprite.getChildByName('sight_line').containsPoint(player_position) && raycast.containsPoint(player_position)){
      //  this.action_on_seeing_player(player_sprite);
      //}

      //if(this.sprite.getChildByName('influence_box').containsPoint(player_position) && raycast.containsPoint(player_position)){
      //  this.action_on_hearing_player(player_sprite);
      //}
    });
    viewport.addChild(raycast);
  }
}

module.exports = {
  Character,
};



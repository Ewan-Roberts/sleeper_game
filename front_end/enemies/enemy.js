const PIXI = require('pixi.js');
const { get_angle_from_point_to_point, put_blood_splatter_under_sprite } = require('../utils/sprite_helper.js');
const { pathfind_from_enemy_to_player } = require('../pathfinding/pathfind_util.js')
const bow_helper = require('../weapons/bow/bow_helper.js');
const { createjs } = require('@createjs/tweenjs');

const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';

// this has to go
function init_enemies_container() {
  global.viewport.addChild(enemy_container);
}

function get_intersection(ray, segment){

	// RAY in parametric: Point + Delta*T1
	const r_px = ray.a.x;
	const r_py = ray.a.y;
	const r_dx = ray.b.x-ray.a.x;
	const r_dy = ray.b.y-ray.a.y;

	// SEGMENT in parametric: Point + Delta*T2
	const s_px = segment.a.x;
	const s_py = segment.a.y;
	const s_dx = segment.b.x-segment.a.x;
	const s_dy = segment.b.y-segment.a.y;

	// Are they parallel? If so, no intersect
	const r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
	const s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
	if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
		// Unit vectors are the same.
		return null;
	}

	const T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
	const T1 = (s_px+s_dx*T2-r_px)/r_dx;

	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;

	// Return the POINT OF INTERSECTION
	return {
		x: r_px+r_dx*T1,
		y: r_py+r_dy*T1,
		param: T1
	};
}

class Enemy {
  constructor() {
    const enemy_frames = this.create_knife_enemy_frames();

    this.sprite = new PIXI.extras.AnimatedSprite(enemy_frames);
    this.sprite.height /= 2;
    this.sprite.width /= 2;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.rotation = -0.5;
    this.sprite.play();
    this.sprite.tag = 'enemy';
  }

  set_position(x,y) {
    this.sprite.position.set(x, y);
  }

  create_knife_enemy_frames() {
    const enemy_frames = []
  
    for (let i = 0; i < 19; i++) {
      enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
    }
    return enemy_frames
  }

  add_vitals() {
    this.sprite.vitals = {
      health: 100,
      status: 'alive',
    }
  }

  add_sight_line() {
    const sight_line_box = PIXI.Sprite.fromFrame('black_dot');

    sight_line_box.name = 'sight_line';
    sight_line_box.width = 3000;
    sight_line_box.height = 600;
    sight_line_box.anchor.y = 0.5;
    sight_line_box.alpha = 0.2;
    
    if(global.is_development) {
      sight_line_box.alpha = 0.2;
    } else {
      sight_line_box.alpha = 0;
    }
    this.sprite.addChild(sight_line_box);
  }

  add_influence_box() {
    const influence_box = PIXI.Sprite.fromFrame('black_dot');

    influence_box.name = 'influence_box';
    influence_box.width = 2000;
    influence_box.height = 2000;
  
    if(global.is_development) {
      influence_box.alpha = 0.4;
    } else {
      influence_box.alpha = 0;
    }
    
    influence_box.anchor.set(0.5);
    this.sprite.addChild(influence_box);
  }

  stop_and_shoot_player(player_sprite) {
    this.path.paused = true;
    if(!shot) {
      bow_helper.arrow_shoot_from_sprite_to_sprite(this.sprite, player_sprite)
      shot = true;
    }
  }

  create_direction_line() {
    const direction_line = PIXI.Sprite.fromFrame('black_dot');

    direction_line.width = 200;
    direction_line.height = 15;
    direction_line.anchor.x =0
    direction_line.anchor.y =0.5

    this.sprite.addChild(direction_line);
  }

  create_light() {
    const light = PIXI.Sprite.fromFrame('light_gradient');
    light.name = 'light';

    light.anchor.set(0.5);
    light.width   = 6000;
    light.height  = 6000;
    light.alpha   = 0.2;

    this.sprite.addChild(light);
  }

  add_raycasting() {
    const raycast = new PIXI.Graphics()
    
    const points = [];
    global.segments.forEach(seg => points.push(seg.a,seg.b));

    if(global.is_development) {
      // things
    } else {
      const light = this.sprite.getChildByName('light');
      light.mask = raycast
      light._filters = [new PIXI.filters.BlurFilter(10)]; // test a filter
    }
    
    global.app.ticker.add(() => {
      const unique_angles = [];
      let intersects = [];
      
      raycast.clear()
      raycast.beginFill(0xfffffff, 0.05);
  
      points.forEach(elem => {
        const angle = Math.atan2(elem.y - this.sprite.y, elem.x - this.sprite.x);
        elem.angle = angle;
        unique_angles.push(angle - 0.00001, angle + 0.00001);
      })
  
      for(let k=0; k < unique_angles.length; k++){
        const angle = unique_angles[k];
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const ray = {
          a: {
            x: this.sprite.x, 
            y: this.sprite.y
          },
          b: {
            x: this.sprite.x + dx,
            y: this.sprite.y + dy
          }
        };
  
        let closest_intersect = null;
        for(let i=0; i < global.segments.length; i++){
          const intersect = get_intersection(ray, global.segments[i]);
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

      raycast.moveTo(intersects[0].x, intersects[0].y)
      .lineStyle(0.5, 0xffd900, 5);
      for (let i = 1; i < intersects.length; i++) {
        raycast.lineTo(intersects[i].x, intersects[i].y); 
      }
  
      // const player_sprite = global.Player.sprite;
      // const player_position = player_sprite.getGlobalPosition();
      // if(this.getChildByName('sight_line').containsPoint(player_position) && raycast.containsPoint(player_position)){
      //   action_on_seeing_player(this, player_sprite);
      //   player_seen = true;
      //   console.log(global.viewport)
      // } else {
      //   if(player_seen) {
      //     pathfind_from_enemy_to_player(this, player_sprite)
      //   }
      // }
    });
    global.viewport.addChild(raycast)
  }

  kill() {
    this.sprite.stop();

    const tween = createjs.Tween.get(this.sprite);
    tween.pause();

    this.vitals.status = 'dead';
    put_blood_splatter_under_sprite(enemy_sprite);
  }

  add_to_container() {
    enemy_container.addChild(this.sprite);
  }
}

let shot = false;
let player_seen = false;

function action_on_seeing_player(enemy_sprite, player_sprite) {
  player_seen = true;
  enemy_sprite.stop_and_shoot_player(player_sprite)

  // pathfind_from_enemy_to_player(enemy_sprite, player_sprite)
  enemy_sprite.rotation = Math.atan2(player_sprite.y - enemy_sprite.y, player_sprite.x - enemy_sprite.x);
  
}

function point_hits_enemy_in_container(point) {
  
  for (let i = 0; i < enemy_container.children.length; i++) {
    const enemy_in_container = enemy_container.children[i];

    if(enemy_in_container.containsPoint(point)){
      return enemy_in_container;
    }
  }
}

module.exports = {
  init_enemies_container,
  point_hits_enemy_in_container,
  Enemy,
}
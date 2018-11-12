const PIXI = require('pixi.js');
const { get_angle_from_point_to_point, put_blood_splatter_under_sprite } = require('../utils/sprite_helper.js');
const { pathfind_from_enemy_to_player } = require('../pathfinding/pathfind_util.js')
const bow_helper = require('../weapons/bow/bow_helper.js');
const { createjs } = require('@createjs/tweenjs');

const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';

module.exports.init_enemies_container = () => {
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

function create_enemy_sight_line(sprite) {
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

  sprite.addChild(sight_line_box);
}

function create_enemy_influence_box(sprite) {
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
  sprite.addChild(influence_box);
}

function create_knife_enemy_frames() {
  const enemy_frames = []

  for (let i = 0; i < 19; i++) {
    enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
  }
  return enemy_frames
}

module.exports.create_enemy_at_location = (x, y) => {

  const enemy_frames = create_knife_enemy_frames();

  const enemy_sprite = new PIXI.extras.AnimatedSprite(enemy_frames);
  enemy_sprite.height /= 2;
  enemy_sprite.width /= 2;
  enemy_sprite.anchor.set(0.5);
  enemy_sprite.position.set(x, y);
  enemy_sprite.animationSpeed = 0.4;
  enemy_sprite.rotation = -0.5;
  enemy_sprite.play();
  enemy_sprite.tag = 'enemy';

  enemy_sprite.vitals = {
    health: 100,
    status: 'alive',
  }

  // TODO make class 
  add_enemy_raycasting(enemy_sprite)
  create_enemy_sight_line(enemy_sprite)
  create_enemy_influence_box(enemy_sprite)
  enemy_container.addChild(enemy_sprite);

  return enemy_sprite;
};

function add_enemy_raycasting(enemy_sprite) {

  const raycast = new PIXI.Graphics()
  
  const points = (segments=>{
    const a = [];
    global.segments.forEach(seg=>a.push(seg.a,seg.b));
    return a;
  })(segments);

  const unique_points = (points=>{
    const set = {};
    return points.filter(p=>{
      const key = p.x+","+p.y;
      if(key in set){
        return false;
      }
      else{
        set[key]=true;
        return true;
      }
    });
  })(points);
  
  const light = PIXI.Sprite.fromFrame('light_gradient');
  light.anchor.set(0.5)
  light.width =6000
  light.height =6000

  light.alpha = 0.2
  if(global.is_development) {
    // things
  } else {
    light.mask = raycast
    light._filters = [new PIXI.filters.BlurFilter(10)]; // test a filter
  }
  
  enemy_sprite.addChild(light);
  
  global.app.ticker.add(delta => {
    
    const unique_angles = [];
    let intersects = [];
    PIXI.tweenManager.update();
    
    raycast.clear()
    raycast.beginFill(0xfffffff, 0.05);

    unique_points.forEach(elem => {
      const angle = Math.atan2(elem.y - enemy_sprite.y, elem.x - enemy_sprite.x);
      elem.angle = angle;
      unique_angles.push(angle-0.00001, angle-0.00001, angle+0.00001);
    })

    for(let k=0; k < unique_angles.length; k++){
      const angle = unique_angles[k];
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const ray = {
        a: {
          x: enemy_sprite.x, 
          y: enemy_sprite.y
        },
        b: {
          x: enemy_sprite.x + dx,
          y: enemy_sprite.y + dy
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
    raycast.moveTo(intersects[0].x, intersects[0].y);
    raycast.lineStyle(0.5, 0xffd900, 5);
    for (let i = 1; i < intersects.length; i++) {
      raycast.lineTo(intersects[i].x, intersects[i].y); 
    }

    const player_sprite = global.Player.sprite;
    const player_position = player_sprite.getGlobalPosition();

    if(enemy_sprite.getChildByName('sight_line').containsPoint(player_position) && raycast.containsPoint(player_position)){
      action_on_seeing_player(enemy_sprite, player_sprite);
    }
  });
  
  global.viewport.addChild(raycast)
}

function action_on_seeing_player(enemy_sprite, player_sprite) {
  bow_helper.arrow_shoot_from_sprite_to_sprite(enemy_sprite, player_sprite)
  pathfind_from_enemy_to_player(enemy_sprite, player_sprite)
  enemy_sprite.rotation = Math.atan2(player_sprite.y - enemy_sprite.y, player_sprite.x - enemy_sprite.x);
  
}

module.exports.tween_enemy_to_player = (enemy_sprite) => {
  const player =  global.Player.sprite;

  createjs.Tween.get(enemy_sprite)
  .to({
    x:player.x,
    y:player.y,
    rotation: get_angle_from_point_to_point(enemy_sprite, player),
  },2000)
  .wait(500)
}

module.exports.kill_enemy = (enemy_sprite) => {
  
  enemy_sprite.stop()
  enemy_sprite.path.paused = true;
  enemy_sprite.vitals.status = 'dead';
  put_blood_splatter_under_sprite(enemy_sprite);
}

module.exports.point_hits_enemy_in_container = (point) => {
  
  for (let i = 0; i < enemy_container.children.length; i++) {
    const enemy_in_container = enemy_container.children[i];

    if(enemy_in_container.containsPoint(point)){
      return enemy_in_container;
    }
  }
}

// TODO move to helper function
module.exports.get_first_enemy_in_container = () => {
  return enemy_container.children[0];
}
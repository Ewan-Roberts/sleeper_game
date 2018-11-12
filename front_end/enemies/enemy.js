
const PIXI = require('pixi.js');
const sprite_helper = require('../utils/sprite_helper.js');
const bow_helper = require('../weapons/bow/bow_helper.js');
const dialog_util = require('../dialog/dialog_util.js');
const { createjs } = require('@createjs/tweenjs');
const { move_sprite_on_path } = require('../pathfinding/pathfind_util');


global.enemy_container = new PIXI.Container();
global.enemy_container.name = 'enemy_container';

module.exports.init_enemies_container = () => {
  global.viewport.addChild(global.enemy_container);
}

function get_intersection(a,b){
  
  const c=a.a.x,
  d=a.a.y,
  e=a.b.x-a.a.x,
  f=a.b.y-a.a.y,
  g=b.a.x,
  h=b.a.y,
  i=b.b.x-b.a.x,
  j=b.b.y-b.a.y,
  k=Math.sqrt(e*e+f*f),
  l=Math.sqrt(i*i+j*j);
  if(e/k==i/l&&f/k==j/l)return null;
  const m=(e*(h-d)+f*(c-g))/(i*f-j*e),
  n=(g+i*m-c)/e;
  return 0>n||0>m||1<m?null:{x:c+e*n,y:d+f*n,param:n}
}

module.exports.create_enemy_at_location = (x, y) => {
  return new Promise (resolve => {

    const enemy_frames = []
    for (let i = 0; i < 19; i++) {
      enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
    }

    const enemy_sprite = new PIXI.extras.AnimatedSprite(enemy_frames);
    enemy_sprite.height /= 2;
    enemy_sprite.width /= 2;
    enemy_sprite.anchor.set(0.5);
    enemy_sprite.position.set(x, y);
    enemy_sprite.animationSpeed = 0.4;
    enemy_sprite.rotation = -0.5;
    enemy_sprite.play();
    enemy_sprite.tag = 'enemy';
    global.enemy_container.addChild(enemy_sprite);
    add_enemy_raycasting(enemy_sprite)
    
    resolve(enemy_sprite)
    
  })
};

module.exports.sight_line = (sprite) => {
  const sight_line_box = PIXI.Sprite.fromFrame('black_dot');

  sight_line_box.name = 'sight_line';
  sight_line_box.width = 3000;
  sight_line_box.height = 600;
  sight_line_box.anchor.y = 0.5;
  sight_line_box.alpha = 0.2;

  sprite.addChild(sight_line_box);
}

module.exports.influence_box = sprite => {
  const influence_box = PIXI.Sprite.fromFrame('black_dot');

  influence_box.name = 'influence_box';
  influence_box.width = 2000;
  influence_box.height = 2000;
  influence_box.alpha = 0.4;
  influence_box.anchor.set(0.5);

  sprite.addChild(influence_box);
}

// TODO put under the enemy sprite
module.exports.put_blood_splatter_on_ground = sprite => {
  const blood_stain = PIXI.Sprite.fromFrame('round_floor_stain');
  
  blood_stain.width /= 2;
  blood_stain.height /= 2;
  blood_stain.position.set(sprite.x, sprite.y);
  blood_stain.anchor.set(0.5);
  blood_stain.alpha = 0.4;

  global.viewport.addChild(blood_stain);
}

module.exports.pathing = (sprite, path_data) => {

  const formatted_path_array = [];

  //this is bad, feel bad
  for (let i = 0; i < path_data.objects[0].polyline.length; i++) {
    const element = path_data.objects[0].polyline[i];
    const path_data2 = {
      x: element.x + path_data.objects[0].x,
      y: element.y + path_data.objects[0].y,
    } 
    formatted_path_array.push(path_data2);
  }

  move_sprite_on_path(sprite, formatted_path_array, {});
}

function add_enemy_raycasting(enemy_sprite) {

  const aimingLine = new PIXI.Graphics();

  const raycast = new PIXI.Graphics()
  
  const points = (segments=>{
    const a = [];
    global.segments.forEach(seg=>a.push(seg.a,seg.b));
    return a;
  })(segments);

  const uniquePoints = (points=>{
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
  light.alpha = 0.1
  // for dev
  // light.mask = raycast

  // This TANKS the performance but is pretty 
  // light._filters = [new PIXI.filters.BlurFilter(10)]; // test a filter
  
  enemy_sprite.addChild(light);
  
  global.app.ticker.add(delta => {
    
    const uniqueAngles = [];
    let intersects = [];
    PIXI.tweenManager.update();
    
    raycast.clear()
    raycast.beginFill(0xfffffff, 0.05);

    uniquePoints.forEach(elem => {
      const angle = Math.atan2(elem.y - enemy_sprite.y, elem.x - enemy_sprite.x);
      elem.angle = angle;
      uniqueAngles.push(angle-0.00001, angle-0.00001, angle+0.00001);
    })

    for(let k=0; k < uniqueAngles.length; k++){
      const angle = uniqueAngles[k];
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

      let closestIntersect = null;

      for(let i=0; i < global.segments.length; i++){
        const intersect = get_intersection(ray, global.segments[i]);
        if(!intersect) continue;
        if(!closestIntersect || intersect.param<closestIntersect.param){
          closestIntersect = intersect;
        }
      }
      if(!closestIntersect) continue;

      closestIntersect.angle = angle;
      intersects.push(closestIntersect);
    }
    intersects = intersects.sort((a,b) => a.angle - b.angle);
    raycast.moveTo(intersects[0].x, intersects[0].y);
    raycast.lineStyle(0.5, 0xffd900, 5);
    for (let i = 1; i < intersects.length; i++) {
      raycast.lineTo(intersects[i].x, intersects[i].y); 
    }
    
    aimingLine.clear()

    // TODO: abstract
    const player_info = global.Player.sprite.getGlobalPosition()
    if(raycast.containsPoint(player_info)){  
      
      aimingLine.position.set(global.Player.sprite.position.x, global.Player.sprite.position.y);
      enemy_sprite.sees_player = true;
      const enemy_position_based_on_screen = enemy_sprite.getGlobalPosition()
      enemy_position_based_on_screen.x = enemy_position_based_on_screen.x-global.viewport.screenWidth/2;
      enemy_position_based_on_screen.y = enemy_position_based_on_screen.y-global.viewport.screenHeight/2;
  
      aimingLine.lineStyle(0, 0xffffff, 0.1)
        .moveTo(0, 0)
        .lineTo(enemy_position_based_on_screen.x, enemy_position_based_on_screen.y);
    } else {
      enemy_sprite.sees_player = false;
    }
  });
  
  global.viewport.addChild(aimingLine);
  global.viewport.addChild(raycast)
}

// walk towards player
module.exports.move_to_player = (enemy_sprite) => {
  const player =  global.Player.sprite;

  // global.viewport.addChild(path_to_player_visual_guide);

  createjs.Tween.get(enemy_sprite)
  .to({
    x:player.x,
    y:player.y,
    rotation: sprite_helper.angle(enemy_sprite, player),
  },2000)
  .wait(500)
}

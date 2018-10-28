
const PIXI = require('pixi.js');
const sprite_helper = require('../utils/sprite_helper.js');
const bow_helper = require('../weapons/bow/bow_helper.js');
const dialogUtil = require('../dialog/dialog_util.js');

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

module.exports.create_enemy = (x, y) => {
  return new Promise (resolve => {

    const enemy_frames = []
    for (let i = 0; i < 19; i++) {
      enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
    }

    const enemy_sprite = new PIXI.extras.AnimatedSprite(enemy_frames);
    enemy_sprite.height /= 3;
    enemy_sprite.width /= 3;
    enemy_sprite.anchor.set(0.5);
    enemy_sprite.position.set(x, y);
    enemy_sprite.animationSpeed = 0.4;
    enemy_sprite.rotation = -0.5;
    enemy_sprite.play();
    // enemy_sprite.on_hit = (arrow) => {
      
    //   const new_arrow = PIXI.Sprite.fromFrame('arrow');

    //   new_arrow.width *= 2;
    //   new_arrow.height *= 3;
      
    //   // new_arrow.rotation = arrow.rotation;
    //   new_arrow.position.x = arrow.x;
    //   new_arrow.position.y = arrow.y;
    //   new_arrow.name = 'new_arrow';
    //   enemy_sprite.addChild(new_arrow)
    //   console.log(enemy_sprite)
  
    //   // module.exports.put_blood_splatter_on_ground(enemy_sprite)
    // }
    global.enemy_container.addChild(enemy_sprite);
    add_enemy_raycasting(enemy_sprite)
    resolve(enemy_sprite)
    
  })
};

module.exports.sight_line = (sprite) => {
  const sight_line_box = PIXI.Sprite.fromFrame('black_dot');

  sight_line_box.name = 'sight_line';
  sight_line_box.width = 300;
  sight_line_box.height = 300;
  sight_line_box.rotation = -0.5;
  sight_line_box.alpha = 0.3;

  sprite.addChild(sight_line_box);
}

module.exports.influence_box = sprite => {
  const influence_box = PIXI.Sprite.fromFrame('black_dot');

  influence_box.name = 'influence_box';
  influence_box.width = 2000;
  influence_box.height = 2000;
  influence_box.alpha = 0.2
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

module.exports.create_path = (sprite, path_data) => {
  return new Promise(resolve => {
    const path = new PIXI.tween.TweenPath();

    path.moveTo(path_data[0].x, path_data[0].y);
    
    path_data.forEach(elem => path.lineTo(elem.x, elem.y));

    const path_visual_guide = new PIXI.Graphics()
      .lineStyle(5, 0xffffff, 0.8)
      .drawPath(path);

    global.viewport.addChild(path_visual_guide);
    resolve(path)
  })
}

module.exports.create_path_tween = (sprite, path) => {
  const enemy_tween = PIXI.tweenManager.createTween(sprite);

  enemy_tween.path = path;
  enemy_tween.rotation = sprite_helper.angle(sprite, path._tmpPoint);
  enemy_tween.time = 50000;
  enemy_tween.easing = PIXI.tween.Easing.linear();
  
  let curent_path_target ={
    x: 0,
    y: 0
  }

  enemy_tween.on('update', delta => {
    console.log(enemy_tween.path._tmpPoint.x)
    console.log(curent_path_target.x)
    if(curent_path_target.x != enemy_tween.path._tmpPoint.x &&
      curent_path_target.y != enemy_tween.path._tmpPoint.y) {
      curent_path_target.x = enemy_tween.path._tmpPoint.x;
      curent_path_target.y = enemy_tween.path._tmpPoint.y;
      
      enemy_tween.stop()
      setTimeout(()=> {enemy_tween.start()},2000)
      
    }
    const angle_to_turn_to = Math.abs(Math.round(sprite_helper.angle(sprite, path._tmpPoint) * 100) / 100);
    sprite.rotation = Math.round(sprite.rotation*100)/100;
    if(sprite.rotation !== angle_to_turn_to){
      sprite.rotation +=0.01;
    }
  })

  enemy_tween.start();
  enemy_tween.pingPong = true;

  return enemy_tween;
}

function add_enemy_raycasting(enemy_sprite) {

  const raycast = new PIXI.Graphics();
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

  global.app.ticker.add(delta => {

    const uniqueAngles = [];
    let intersects = [];
    PIXI.tweenManager.update();

    raycast.clear()
    raycast.beginFill(0xfffffff, 0.14);
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
    raycast.lineStyle(1, 0xffd900, 1);
    for (let i = 1; i < intersects.length; i++) {
      raycast.lineTo(intersects[i].x, intersects[i].y);
    }
  });

  global.viewport.addChild(raycast)
}

// walk towards player
module.exports.move_to_player = (enemy_sprite, previous_tween_path) => {
  const player =  global.Player.sprite;

  enemy_sprite.rotation = sprite_helper.angle(enemy_sprite, player);
  const path_to_player = new PIXI.tween.TweenPath()
    .moveTo(enemy_sprite.x, enemy_sprite.y)
    .lineTo(player.x, player.y);
  
  const path_to_player_visual_guide = new PIXI.Graphics()
    .lineStyle(1, 0xffffff, 1)
    .drawPath(path_to_player);

  global.viewport.addChild(path_to_player_visual_guide);

  const tween = module.exports.create_path_tween(enemy_sprite, path_to_player);
  tween.time = 5000;
  
  const sight_line = enemy_sprite.children[0];
  // console.log(tween)
  tween.on('update', () => {

    if(sight_line.containsPoint(player.getGlobalPosition())){  
      dialogUtil.renderText(enemy_sprite, 'sight line');
      tween.stop();
      enemy_sprite.rotation = sprite_helper.angle(enemy_sprite, player);
    }
  });
  
  //TODO
  setTimeout(()=>{
    tween.stop()
    dialogUtil.renderText(enemy_sprite, 'I am waiting');
    setTimeout(()=>{
      dialogUtil.renderText(enemy_sprite, 'back to original path');
      tween.start()
      tween.chain(previous_tween_path)
      setTimeout(()=>tween.remove(),2500)  
    },5000)
  },2500)
}

module.exports.enemy_logic_on_path = (enemy_sprite, tween, path) => {

  const player =  global.Player.sprite;
  const sight_line = enemy_sprite.children[0];
  const influence_box = enemy_sprite.children[1];

  tween.on('update', () => {    

    if(sight_line.containsPoint(player.getGlobalPosition())){
      dialogUtil.renderText(enemy_sprite, 'sight line');
      tween.stop();
      enemy_sprite.rotation = sprite_helper.angle(enemy_sprite, global.Player.sprite);
    }

    if(influence_box.containsPoint(player.getGlobalPosition())){
      dialogUtil.renderText(enemy_sprite, 'influence zone');
      module.exports.move_to_player(enemy_sprite, tween)
      tween.stop();
    }
  });
}
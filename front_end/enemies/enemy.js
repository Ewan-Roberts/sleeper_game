
const PIXI = require('pixi.js');
const spriteHelper = require('../utils/sprite_helper.js');
const bowHelper = require('../weapons/bow/bow_helper.js');
const dialogUtil = require('../dialog/dialogUtil.js');
const intersect = require('yy-intersects');

global.enemy_container = new PIXI.Container();
global.enemy_container.name = 'enemy_container';

module.exports.init_enemies_container = () => {
  global.viewport.addChild(global.enemy_container);
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
    enemy_sprite.on_hit = () => {
      module.exports.put_blood_splatter_on_ground(enemy_sprite)
    }
    global.enemy_container.addChild(enemy_sprite);
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

module.exports.crate_path = (sprite, path_data) => {
  return new Promise(resolve => {
    const path = new PIXI.tween.TweenPath();

    path.moveTo(path_data[0].x, path_data[0].y);

    for (let i = 1; i < path_data.length; i++) {
      path.lineTo(path_data[i].x, path_data[i].y);
    }

    const path_visual_guide = new PIXI.Graphics()
      .lineStyle(5, 0xffffff, 0.8)
      .drawPath(path);

    global.viewport.addChild(path_visual_guide);
    resolve(path)
  })
}

module.exports.crate_path_tween = (sprite, path) => {
  const enemy_tween = PIXI.tweenManager.createTween(sprite);

  enemy_tween.path = path;
  enemy_tween.rotation = spriteHelper.angle(sprite, path._tmpPoint2);
  enemy_tween.time = 30000;
  enemy_tween.easing = PIXI.tween.Easing.linear();
  enemy_tween.start();
  enemy_tween.pingPong = true;

  return enemy_tween;
}

// walk towards player
module.exports.move_to_player = (enemy_sprite, previous_tween_path) => {
  const player =  global.Player.sprite;

  enemy_sprite.rotation = spriteHelper.angle(enemy_sprite, player);
  const path_to_player = new PIXI.tween.TweenPath()
    .moveTo(enemy_sprite.x, enemy_sprite.y)
    .lineTo(player.x, player.y);
  
  const path_to_player_visual_guide = new PIXI.Graphics()
    .lineStyle(1, 0xffffff, 1)
    .drawPath(path_to_player);

  global.viewport.addChild(path_to_player_visual_guide);

  const tween = module.exports.crate_path_tween(enemy_sprite, path_to_player);
  tween.time = 5000;
  
  const sight_line = enemy_sprite.children[0];
  
  tween.on('update', () => {    

    if(sight_line.containsPoint(player.getGlobalPosition())){  
      dialogUtil.renderText(enemy_sprite, 'sight line');
      tween.stop();
      enemy_sprite.rotation = spriteHelper.angle(enemy_sprite, player);
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
      setTimeout(()=>tween.remove(),2600)  
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
      enemy_sprite.rotation = spriteHelper.angle(enemy_sprite, global.Player.sprite);
    }

    if(influence_box.containsPoint(player.getGlobalPosition())){
      dialogUtil.renderText(enemy_sprite, 'influence zone');
      module.exports.move_to_player(enemy_sprite, tween)
      tween.stop();
    }
  });
}
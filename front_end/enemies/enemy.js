const spriteHelper = require('../utils/spriteHelper.js'),
      bowHelper = require('../weapons/bow/bowHelper'),
      level_utils = require('../level/level_utils'),
      dialogUtil = require('../dialog/dialogUtil.js')

global.enemyContainer = new PIXI.Container();
global.enemyContainer.name = "enemyContainer"

const Enemy = {

  animation: {
    moving:     [],
    waiting:    []
  },
  sprite: {
    moving:     {},
    waiting:    {}
  }
}

module.exports.enemy_frames = () => new Promise((resolve,reject)=>{
  
  // global.loader.load((loader,res) => {
  //   console.log(loader)
  //   console.log(res)
    

  // }) 
  // console.log(PIXI)
  for (let i = 0; i < 19; i++) {
    
    Enemy.animation.moving.push(PIXI.Texture.fromFrame('survivor-move_knife_'+i));
  }
  resolve()
})

module.exports.enemy_path = path_data => {
  console.log(path_data)
  console.log("path_data")
  const path = level_utils.createEnemyPathFrom(path_data)
  spriteHelper.drawPathAndShow(path)

  const enemy_sprite = new PIXI.extras.AnimatedSprite(Enemy.animation.moving);
  enemy_sprite.height /= 3
  enemy_sprite.width /= 3
  enemy_sprite.anchor.set(0.5);
  enemy_sprite.animationSpeed = 0.4;
  enemy_sprite.rotation = -0.5
  enemy_sprite.play();
  
  const influence_box = PIXI.Sprite.fromFrame('black_dot')
  influence_box.width = 500;
  influence_box.height = 500;
  influence_box.rotation = -0.5
  influence_box.alpha = 0.3;

  const influence_box_tween = PIXI.tweenManager.createTween(influence_box);
  influence_box_tween.rotation = -0.5;
  influence_box_tween.path = path;
  influence_box_tween.time = 30000;
  influence_box_tween.easing = PIXI.tween.Easing.inOutQuad();
  influence_box_tween.start();
  influence_box_tween.pingPong = true;
  
  //Tween animation
  const animated_enemy_tween = PIXI.tweenManager.createTween(enemy_sprite);
  animated_enemy_tween.path = path;
  animated_enemy_tween.rotation = spriteHelper.angle(enemy_sprite, path._tmpPoint2);
  animated_enemy_tween.time = 30000;
  animated_enemy_tween.easing = PIXI.tween.Easing.inOutQuad();
  animated_enemy_tween.start();
  animated_enemy_tween.pingPong = true;

  influence_box_tween.on("update", function() {
    
    animated_enemy_tween.target.rotation = animated_enemy_tween.rotation+ spriteHelper.angle(enemy_sprite, path._tmpPoint2)
    influence_box_tween.target.rotation = influence_box_tween.rotation+ spriteHelper.angle(enemy_sprite, path._tmpPoint2)
    spriteHelper.hitBoxSpriteObj(influence_box, global.Player.sprite)
    .then(res => {

      console.log("enemy sees you")
      dialogUtil.renderText(enemy_sprite, dialogUtil.enemySurprised())
      animated_enemy_tween.stop()
      enemy_sprite.stop()
      enemy_sprite.rotation = spriteHelper.angle(enemy_sprite, global.Player.sprite)
      influence_box_tween.stop()
      bowHelper.arrowManagement(500, enemy_sprite, global.Player.sprite)

    })

  })
  
  global.enemyContainer.addChild(enemy_sprite,influence_box)
  global.viewport.addChild(global.enemyContainer)
}

module.exports.move = (start,finish) => {

  const path_one = new PIXI.tween.TweenPath()
  .moveTo(start.x, start.y)
  .lineTo(finish.x, finish.y)

  const path_one_visual_guide = new PIXI.Graphics()
  .lineStyle(1, 0xffffff, 1)
  .drawPath(path_one)
  global.viewport.addChild(path_one_visual_guide)

  const animated_enemy = new PIXI.extras.AnimatedSprite(Enemy.animation.moving);
  animated_enemy.height /= 3
  animated_enemy.width /= 3
  animated_enemy.texture.width = 100
  animated_enemy.texture.height = 100
  animated_enemy.anchor.set(0);
  animated_enemy.animationSpeed = 0.4;
  animated_enemy.play();

  const animated_enemy_tween = PIXI.tweenManager.createTween(animated_enemy);
  animated_enemy_tween.name = "tween"
  animated_enemy_tween.path = path_one;
  animated_enemy_tween.target.rotation = spriteHelper.angle(animated_enemy, path_one._tmpPoint2)
  animated_enemy_tween.time = 3000;
  animated_enemy_tween.easing = PIXI.tween.Easing.inOutQuad();
  animated_enemy_tween.name = "tween path"
  animated_enemy_tween.start()

  global.enemyContainer.addChild(animated_enemy)
  global.viewport.addChild(global.enemyContainer)

  Enemy.sprite.moving = animated_enemy;
}

module.exports.projectileAttack = (target) => {
  const enemy = new PIXI.extras.AnimatedSprite(Enemy.animation.moving);
  
  bowHelper.arrowManagement(500, enemy, target)
  
  global.viewport.addChild(enemy)
}
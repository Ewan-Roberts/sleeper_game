const spriteHelper = require('../utils/spriteHelper.js'),
  bowHelper = require('../weapons/bow/bowHelper')
  level_utils = require('../level/level_utils')
  bedroom_data = require('../level/bedroom/bedroom_data_4.json')


global.enemyContainer = new PIXI.Container();
global.enemyContainer.name = "enemyContainer"

const Enemy = {

  animation: {
    moving:     [],
    waiting:    [],
    eating:     []
  },

  sprite: {
    moving:     {},
    waiting:    {},
    eating:     {}
  },

  noise: new Audio('audio/rat_noise_edited.wav')

}

module.exports.enemy_frames = () => new Promise((resolve,reject)=>{

  PIXI.loader        
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_0.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_1.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_2.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_3.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_4.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_5.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_6.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_7.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_8.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_9.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_10.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_11.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_12.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_13.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_14.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_15.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_16.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_17.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_18.png')
  .add('images/Top_Down_Survivor/knife/move/survivor-move_knife_19.png')
  // .on("progress", loader=>{})
  .load(()=>resolve('enemy loaded'))

})
.then(image_load_confirmation=>{

  for (let i = 0; i < 19; i++) {
    Enemy.animation.waiting.push(PIXI.Texture.fromFrame('images/Top_Down_Survivor/knife/move/survivor-move_knife_' + i + '.png'));
  }

})

module.exports.enemy_path = path_data => {

  const path = level_utils.createEnemyPathFrom(path_data)

  spriteHelper.drawPathAndShow(path)

  const enemy_sprite = new PIXI.extras.AnimatedSprite(Enemy.animation.waiting);
  enemy_sprite.height /= 3
  enemy_sprite.width /= 3
  enemy_sprite.anchor.set(0.5);
  enemy_sprite.animationSpeed = 0.4;
  
  enemy_sprite.play();

  const influence_box = PIXI.Sprite.fromImage('images/black_dot.png')
  influence_box.width = 500;
  influence_box.height = 500;
  influence_box.anchor.set(0)
  influence_box.alpha = 0.3;

  const influence_box_tween = PIXI.tweenManager.createTween(influence_box);
  influence_box_tween.loop = true;
  influence_box_tween.path = path;
  influence_box_tween.time = 30000;
  influence_box_tween.easing = PIXI.tween.Easing.inOutQuad();
  influence_box_tween.start();

  influence_box_tween.on("update", function() {
      
    spriteHelper.hitBoxSpriteObj(influence_box, global.Player.sprite)
    .then(res => {
      console.log("enemy sees you")
      console.log(res)
      
      animated_enemy_tween.stop()
      enemy_sprite.stop()
      enemy_sprite.rotation = spriteHelper.angle(enemy_sprite, global.Player.sprite)
      influence_box_tween.stop()
    })

  })

  //Tween animation
  const animated_enemy_tween = PIXI.tweenManager.createTween(enemy_sprite);
  
  animated_enemy_tween.loop = true;
  animated_enemy_tween.path = path;
  animated_enemy_tween.target.rotation = spriteHelper.angle(enemy_sprite, path._tmpPoint2)
  animated_enemy_tween.time = 30000;
  animated_enemy_tween.easing = PIXI.tween.Easing.inOutQuad();
  animated_enemy_tween.start()
  
  animated_enemy_tween.on("end", function() {
      
    console.log('ending')

  })
  
  global.enemyContainer.addChild(enemy_sprite,influence_box)
  global.viewport.addChild(global.enemyContainer)

}

module.exports.move = (start,finish) => {

  //Create a custom path the graphic will follow
  const path_one = new PIXI.tween.TweenPath()
  .moveTo(start.x, start.y)
  .lineTo(finish.x, finish.y)

  //FOR TESTING
  //Create a custom path the graphic will follow
  const path_one_visual_guide = new PIXI.Graphics()
  .lineStyle(1, 0xffffff, 1)
  .drawPath(path_one)
  global.viewport.addChild(path_one_visual_guide)

  const animated_enemy = new PIXI.extras.AnimatedSprite(Enemy.animation.waiting);
  // animated_rat.x = 900;
  // animated_rat.y = 1000;
  
  animated_enemy.height /= 3
  animated_enemy.width /= 3
  animated_enemy.texture.width = 100
  animated_enemy.texture.height = 100
  animated_enemy.anchor.set(0);
  animated_enemy.animationSpeed = 0.4;
  animated_enemy.play();
  
  // animated_enemy.mouseDeathSound = mouseDeathSound;
  // animated_enemy.dead = PIXI.Texture.fromFrame('images/rat_35.png')

  //Tween animation
  const animated_enemy_tween = PIXI.tweenManager.createTween(animated_enemy);
  animated_enemy_tween.name = "tween"
  animated_enemy_tween.path = path_one;
  animated_enemy_tween.target.rotation = spriteHelper.angle(animated_enemy, path_one._tmpPoint2)
  animated_enemy_tween.time = 3000;
  animated_enemy_tween.easing = PIXI.tween.Easing.inOutQuad();
  animated_enemy_tween.name = "tween path"
  animated_enemy_tween.start()
  
  animated_enemy_tween.on("end", function() {
      
      // animated_rat.alpha = 0;
      // path_one_visual_guide.destroy()
      // resolve()

  })
  
  global.enemyContainer.addChild(animated_enemy)
  global.viewport.addChild(global.enemyContainer)

  Enemy.sprite.moving = animated_enemy;
}

module.exports.projectileAttack = (target) => {

  const enemy = new PIXI.extras.AnimatedSprite(Enemy.animation.waiting);
  
  bowHelper.arrowManagement(500, enemy, target)
  
  global.viewport.addChild(enemy)

}
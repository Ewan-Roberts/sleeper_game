const filters = require('pixi-filters'),
spriteHelper = require("../utils/spriteHelper.js");

module.exports.teleport = (x,y) => new Promise((resolve,reject)=>{

  global.Player.sprite.x = x;
  global.Player.sprite.y = y;

})

module.exports.clearScene = () => global.viewport.removeChildren();

module.exports.createPlayer = () =>{

  new PIXI.loaders.Loader()
  .load((loader, res) => {
    
    global.Player.sprite = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
    global.Player.sprite.anchor.set(0.5);
    global.Player.sprite.width /= 2
    global.Player.sprite.height /= 2
    global.Player.sprite.animationSpeed = 0.6;
    global.Player.sprite.play();
    global.Player.sprite.zIndex = -20;
  
  
    global.Player.sprite.walk = new PIXI.extras.AnimatedSprite(global.Player.animation.walk);
    global.Player.sprite.idle = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
    global.Player.sprite.ready = new PIXI.extras.AnimatedSprite(global.Player.animation.ready);

    global.viewport.addChild(global.Player.sprite); 
    
  })

}

module.exports.wakePlayer = () => {
  
  return new Promise((resolve,reject)=>{

    const animated_player = new PIXI.extras.AnimatedSprite(Player.animation.wake_up);



  })
}

module.exports.movePlayer = (start,finish) => {
    
  const path_one = new PIXI.tween.TweenPath()
  .moveTo(start.x, start.y)
  .lineTo(finish.x, finish.y)

  const path_one_visual_guide = new PIXI.Graphics()
  .lineStyle(1, 0xffffff, 1)
  .drawPath(path_one)
  global.viewport.addChild(path_one_visual_guide)

  const animated_player = new PIXI.extras.AnimatedSprite(Player.animation.idle);
  animated_player.x = start.x;
  animated_player.y = start.y;
  
  animated_player.height /= 3
  animated_player.width /= 3
  animated_player.texture.width = 100
  animated_player.texture.height = 100
  animated_player.anchor.set(0);
  animated_player.animationSpeed = 0.4;
  animated_player.play();
  
  // animated_enemy.mouseDeathSound = mouseDeathSound;
  // animated_enemy.dead = PIXI.Texture.fromFrame('images/rat_35.png')

  //Tween animation
  const animated_player_tween = PIXI.tweenManager.createTween(animated_player);
  animated_player_tween.name = "tween"
  animated_player_tween.path = path_one;
  animated_player_tween.target.rotation = spriteHelper.angle(animated_player, path_one._tmpPoint2)
  animated_player_tween.time = 3000;
  animated_player_tween.easing = PIXI.tween.Easing.inOutQuad();
  animated_player_tween.name = "tween path"
  animated_player_tween.start()
  
  animated_player_tween.on("end", function() {
      
      // animated_rat.alpha = 0;
      // path_one_visual_guide.destroy()
      // resolve()

  })
  
  global.viewport.addChild(animated_player)

}
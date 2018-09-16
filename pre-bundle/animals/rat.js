const spriteHelper = require('../utils/spriteHelper.js');

global.critterContainer = new PIXI.Container();



const Rat = {

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

  // noise: new Audio('audio/rat_noise_edited.wav')

}

module.exports.load_rat = () => new Promise((resolve,reject)=>{

  for (let i = 1; i < 15; i++) {
      let val = i < 10 ? '0' + i : i;
      console.log(PIXI.Texture.fromFrame('rat_' + val))
      console.log("rat")
      Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_' + val));
  }

  for (let i = 15; i > 0; i--) {
      let val = i < 10 ? '0' + i : i;
      Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_' + val));
  }

  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_48'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_49'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_50'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_49'));
  Rat.animation.moving.push(PIXI.Texture.fromFrame('rat_48'));

  Rat.animation.waiting = [
      
      PIXI.Texture.fromFrame('rat_36'),
      PIXI.Texture.fromFrame('rat_37'),
      PIXI.Texture.fromFrame('rat_38'),
      PIXI.Texture.fromFrame('rat_51'),
      PIXI.Texture.fromFrame('rat_37'),
      PIXI.Texture.fromFrame('rat_36'),
      PIXI.Texture.fromFrame('rat_01')
  ]

  Rat.animation.dead = PIXI.Texture.fromFrame('rat_35')

  Rat.animation.eating = [
      PIXI.Texture.fromFrame('rat_37'),
      PIXI.Texture.fromFrame('rat_38'),
      PIXI.Texture.fromFrame('rat_39'),
      PIXI.Texture.fromFrame('rat_40'),
      PIXI.Texture.fromFrame('rat_39'),
      PIXI.Texture.fromFrame('rat_40'),
      PIXI.Texture.fromFrame('rat_41'),
      PIXI.Texture.fromFrame('rat_40'),
      PIXI.Texture.fromFrame('rat_39'),
      PIXI.Texture.fromFrame('rat_38'),
      PIXI.Texture.fromFrame('rat_37')
  ]

  resolve()

})

// to and from



module.exports.mouseMove = (start,finish) => {
    
  // Rat.noise.volume = 0.5
  // Rat.noise.play();
  const mouseDeathSound = new Audio('audio/mouse_death_00.wav');

  //Create a custom path the graphic will follow
  const path_one = new PIXI.tween.TweenPath()
  .moveTo(start.x, start.y)
  .lineTo(finish.x, finish.y)

  spriteHelper.drawPathAndShow(path_one)

  const animated_rat = new PIXI.extras.AnimatedSprite(Rat.animation.moving);
  animated_rat.height = animated_rat.height/2
  animated_rat.width = animated_rat.width/2
  animated_rat.animationSpeed = 0.4;
  animated_rat.play();
  animated_rat.mouseDeathSound = mouseDeathSound;
  animated_rat.dead = PIXI.Texture.fromFrame('rat_35')

  const animated_rat_tween = PIXI.tweenManager.createTween(animated_rat);
  animated_rat_tween.name = "tween"
  animated_rat_tween.path = path_one;
  animated_rat_tween.target.rotation = spriteHelper.angle(animated_rat, path_one._tmpPoint2)
  animated_rat_tween.time = 3000;
  animated_rat_tween.easing = PIXI.tween.Easing.inOutQuad();
  animated_rat_tween.name = "tween path"
  animated_rat_tween.start()
          
  global.critterContainer.addChild(animated_rat)
  global.viewport.addChild(global.critterContainer)

  Rat.sprite.moving = animated_rat;

}

module.exports.mousePause = () => {

  return new Promise ((resolve,reject)=>{

    const path_waiting = new PIXI.tween.TweenPath()
    .moveTo(90,720)
    .lineTo(90, 721)

    const waiting_rat = new PIXI.extras.AnimatedSprite(Rat.animation.waiting);
    waiting_rat.alpha = 0;
    waiting_rat.rotation = 2.1
    waiting_rat.anchor.set(0.5);
    waiting_rat.height = waiting_rat.height/2
    waiting_rat.width = waiting_rat.width/2
    waiting_rat.animationSpeed = 0.1;
    waiting_rat.play();
    viewport.addChild(waiting_rat)

    const waiting_rat_tween = PIXI.tweenManager.createTween(waiting_rat);
    waiting_rat_tween.path = path_waiting;
    waiting_rat_tween.time = 1000
    waiting_rat_tween.easing = PIXI.tween.Easing.inOutQuad();
    waiting_rat_tween.start()
    
    waiting_rat_tween.on("start", ()=> waiting_rat.alpha = 1)

    waiting_rat_tween.on("end", ()=>{
        
        waiting_rat.destroy()
        Rat.sprite.moving.alpha = 1;
        resolve()

    })

    Rat.sprite.waiting = waiting_rat

  })

}

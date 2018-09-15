const spriteHelper = require('../utils/spriteHelper.js');

global.critterContainer = new PIXI.Container();
global.critterContainer.name = "critterContainer"

const mouseDeathSound = new Audio('audio/mouse_death_00.wav');

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

  noise: new Audio('audio/rat_noise_edited.wav')

}

module.exports.load_rat = () => new Promise((resolve,reject)=>{

    PIXI.loader        
        .add('images/rat_01.png')
        .add('images/rat_02.png')
        .add('images/rat_03.png')
        .add('images/rat_04.png')
        .add('images/rat_05.png')
        .add('images/rat_06.png')
        .add('images/rat_07.png')
        .add('images/rat_08.png')
        .add('images/rat_09.png')
        .add('images/rat_10.png')
        .add('images/rat_11.png')
        .add('images/rat_12.png')
        .add('images/rat_13.png')
        .add('images/rat_14.png')
        .add('images/rat_15.png')
        .add('images/rat_16.png')
        .add('images/rat_17.png')
        .add('images/rat_18.png') 
        .add('images/rat_19.png')
        .add('images/rat_20.png')
        .add('images/rat_21.png')
        .add('images/rat_22.png')
        .add('images/rat_23.png')
        .add('images/rat_24.png')
        .add('images/rat_25.png')
        .add('images/rat_26.png')
        .add('images/rat_27.png')
        .add('images/rat_28.png')
        .add('images/rat_29.png')
        .add('images/rat_30.png')
        .add('images/rat_31.png')
        .add('images/rat_32.png')
        .add('images/rat_33.png')
        .add('images/rat_34.png')
        .add('images/rat_35.png')
        .add('images/rat_36.png')
        .add('images/rat_37.png')
        .add('images/rat_38.png')
        .add('images/rat_39.png')
        .add('images/rat_40.png')
        .add('images/rat_41.png')
        .add('images/rat_42.png')
        .add('images/rat_43.png')
        .add('images/rat_44.png')
        .add('images/rat_45.png')
        .add('images/rat_46.png')
        .add('images/rat_47.png')
        .add('images/rat_48.png')
        .add('images/rat_49.png')
        .add('images/rat_50.png')
        .add('images/rat_51.png')
        // .on("progress", loader=>{})
        .load(()=>resolve('rat loaded'))

    })
    .then(image_load_confirmation=>{

        for (let i = 1; i < 15; i++) {
            let val = i < 10 ? '0' + i : i;
            Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_' + val + '.png'));
        }

        for (let i = 15; i > 0; i--) {
            let val = i < 10 ? '0' + i : i;
            Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_' + val + '.png'));
        }

        Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_48.png'));
        Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_49.png'));
        Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_50.png'));
        Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_49.png'));
        Rat.animation.moving.push(PIXI.Texture.fromFrame('images/rat_48.png'));

        Rat.animation.waiting = [
            
            PIXI.Texture.fromFrame('images/rat_36.png'),
            PIXI.Texture.fromFrame('images/rat_37.png'),
            PIXI.Texture.fromFrame('images/rat_38.png'),
            PIXI.Texture.fromFrame('images/rat_51.png'),
            PIXI.Texture.fromFrame('images/rat_37.png'),
            PIXI.Texture.fromFrame('images/rat_36.png'),
            PIXI.Texture.fromFrame('images/rat_01.png')
        ]

        Rat.animation.dead = PIXI.Texture.fromFrame('images/rat_35.png')

        Rat.animation.eating = [
            PIXI.Texture.fromFrame('images/rat_37.png'),
            PIXI.Texture.fromFrame('images/rat_38.png'),
            PIXI.Texture.fromFrame('images/rat_39.png'),
            PIXI.Texture.fromFrame('images/rat_40.png'),
            PIXI.Texture.fromFrame('images/rat_39.png'),
            PIXI.Texture.fromFrame('images/rat_40.png'),
            PIXI.Texture.fromFrame('images/rat_41.png'),
            PIXI.Texture.fromFrame('images/rat_40.png'),
            PIXI.Texture.fromFrame('images/rat_39.png'),
            PIXI.Texture.fromFrame('images/rat_38.png'),
            PIXI.Texture.fromFrame('images/rat_37.png')
        ]

    })

// to and from



module.exports.mouseMove = (start,finish) => {
    
  // Rat.noise.volume = 0.5
  // Rat.noise.play();

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
  animated_rat.dead = PIXI.Texture.fromFrame('images/rat_35.png')

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

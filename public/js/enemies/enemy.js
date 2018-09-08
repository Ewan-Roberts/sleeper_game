const spriteHelper = require('../utils/spriteHelper.js')
console.log("Enemy loaded")

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

        console.log(image_load_confirmation)

        for (let i = 0; i < 19; i++) {
        
            Enemy.animation.waiting.push(PIXI.Texture.fromFrame('images/Top_Down_Survivor/knife/move/survivor-move_knife_' + i + '.png'));
        }

    })
    // .then(frame_load_confirmation=>{

    //     return new Promise((resolve,reject)=>{

    //         console.log(frame_load_confirmation)
    //         // Enemy.noise.volume = 0.5
    //         // Enemy.noise.play();

    //         //Create a custom path the graphic will follow
    //         const path_one = new PIXI.tween.TweenPath()
    //         .moveTo(700, 710)
    //         .lineTo(90, 720)

    //         //FOR TESTING
    //         //Create a custom path the graphic will follow
    //         // const path_one_visual_guide = new PIXI.Graphics()
    //         // .lineStyle(1, 0xffffff, 1)
    //         // .drawPath(path_one)
    //         // viewport.addChild(path_one_visual_guide)

    //         const enemy_test = new PIXI.extras.AnimatedSprite(Enemy.animation.waiting);
    //         enemy_test.x = 900;
    //         enemy_test.y = 1000;
    //         // animated_rat.height = animated_rat.height/2
    //         // animated_rat.width = animated_rat.width/2
    //         enemy_test.anchor.set(0.5);
    //         enemy_test.animationSpeed = 0.5;
    //         enemy_test.time = 20000
    //         enemy_test.loop = true
    //         enemy_test.play();
    //         viewport.addChild(enemy_test)

    //         // //Tween animation
    //         // const animated_rat_tween = PIXI.tweenManager.createTween(animated_rat);
    //         // animated_rat_tween.path = path_one;
    //         // animated_rat_tween.target.rotation = -1.7
    //         // animated_rat_tween.time = 3000;
    //         // animated_rat_tween.easing = PIXI.tween.Easing.inOutQuad();
    //         // animated_rat_tween.start()

    //         // animated_rat_tween.on("end", function() {
                
    //         //     console.log("ended")            
    //         //     animated_rat.alpha = 0;
    //         //     path_one_visual_guide.destroy()
    //         //     resolve()

    //         // })

    //         // Rat.sprite.moving = animated_rat

    //     })

    // })

    module.exports.enemyMove = (start,finish) => {
    
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
        console.log(animated_enemy)
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

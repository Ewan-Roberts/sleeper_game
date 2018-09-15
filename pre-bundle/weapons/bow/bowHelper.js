'use strict';

const spriteHelper = require("../../utils/spriteHelper.js");
global.arrowContainer = new PIXI.Container();
global.arrowContainer.name = "arrow cont"

const arrowSounds = [
  new Audio('audio/arrow_hit_00.wav'),
  new Audio('audio/arrow_hit_01.wav'),
  new Audio('audio/arrow_hit_02.wav'),
  new Audio('audio/arrow_hit_03.wav'),
  new Audio('audio/arrow_hit_04.wav'),
  new Audio('audio/arrow_hit_05.wav'),
  new Audio('audio/arrow_hit_06.wav'),
  new Audio('audio/arrow_hit_07.wav')
];

// TODO arrow not rendering on first shot and pick up not working
module.exports.arrowManagement = (power, origin, target) => {

  const path_one = new PIXI.tween.TweenPath()
  .moveTo(origin.position.x, origin.position.y)
  .lineTo(target.x, target.y);

  // spriteHelper.drawPathAndShow(path_one)

  const arrow = PIXI.Sprite.fromImage('images/weapons/ammo/arrow.png')
        arrow.width /=2
        arrow.height /=3
        arrow.anchor.set(0.9)
        arrow.rotation = spriteHelper.angle(origin, target)

  const arrowTween = PIXI.tweenManager.createTween(arrow);
        arrowTween.path = path_one;
        arrowTween.time = power;
        arrowTween.easing = PIXI.tween.Easing.linear();
        arrowTween.start()
        arrowTween.on("end", () => arrow.pickup = true)

  arrowTween.on("update", function() {

    spriteHelper.hitBoxContainerObj(global.collisionItems.children, arrow)
    .then(res => {

      arrow.pickup = true;
      arrowSounds[Math.floor((Math.random() * 7) + 1)].play();  
      setTimeout(()=>arrowTween.stop(),15)
      
    })

    spriteHelper.hitBoxContainerObj(global.critterContainer.children, arrow)
    .then(critter => {

      arrow.pickup = true;
      arrowTween.stop()  
      critter.texture = critter.dead;
      critter.stop()
      critter.mouseDeathSound.play()
      PIXI.tweenManager.getTweensForTarget(critter)[0].active = false;
    
    })

    spriteHelper.hitBoxContainerObj(global.enemyContainer.children, arrow)
    .then(enemy => {

      arrow.pickup = true;
      arrowTween.stop()
      enemy.stop()
      PIXI.tweenManager.getTweensForTarget(enemy)[0].active = false;

    })

  })

  global.arrowContainer.addChild(arrow)
  global.viewport.addChild(global.arrowContainer)

}
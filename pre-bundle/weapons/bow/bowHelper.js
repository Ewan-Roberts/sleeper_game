
const spriteHelper = require("../../utils/spriteHelper.js"),
      PIXI        = require("pixi.js"),
      Intersects  = require('intersects'),
      b           = new Bump(PIXI);


const firedArrowGuide = new PIXI.Graphics();
const arrowContainer = new PIXI.Container();
      arrowContainer.name = "arrow container";

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

let arrow = PIXI.Sprite.fromImage('images/weapons/ammo/arrow.png');

module.exports.pickUpArrow = (Player) => {

  if(arrowContainer.children === 0) return

  b.hit(Player.sprite, arrowContainer.children,false,false,true,(collisionSprite, arrow)=>{

    if(arrow.pickup) {
      Player.ammo++;
      arrow.destroy();
    }

  })

}

module.exports.arrowManagement = (power, origin, target) => {

  const arrow_hit_register = spriteHelper.drawPolygon([0, 300, 805, 300, 805, 336, 0, 336]);

  const path_one = new PIXI.tween.TweenPath()
  .moveTo(origin.position.x, origin.position.y)
  .lineTo(target.x, target.y);

  firedArrowGuide.clear().lineStyle(3, 0xffffff,0.5).drawPath(path_one)

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
        arrowTween.on("end", function() {
          arrow.pickup = true;
        })

  arrowTween.on("update", function() {

    spriteHelper.hitBoxContainerObj(global.collisionItems.children, arrow)
    .then(res => {
        
      if(res){

        console.log("hitting")
        arrow_hit_register.tint = 0xf00000
        arrow.pickup = true;
        arrowSounds[Math.floor((Math.random() * 7) + 1)].play();
        
        setTimeout(()=>arrowTween.stop(),15)
      } else {
        arrow_hit_register.tint = 0x00ff00
      }
    })

    spriteHelper.hitBoxContainerObj(global.critterContainer.children, arrow)
    .then(critter => {
      
      if(critter){

        arrow_hit_register.tint = 0xf00000
        arrow.pickup = true;
        arrowTween.stop()
        
        critter.texture = critter.dead;
        critter.stop()
        critter.mouseDeathSound.play()
        PIXI.tweenManager.getTweensForTarget(critter)[0].active = false;

      } else {
        arrow_hit_register.tint = 0x00ff00
      }
    
    })

    spriteHelper.hitBoxContainerObj(global.enemyContainer.children, arrow)
    .then(enemy => {
      console.log(enemy)
      if(enemy){

        arrow_hit_register.tint = 0xf00000
        arrow.pickup = true;
        arrowTween.stop()
        
        enemy.stop()
        PIXI.tweenManager.getTweensForTarget(enemy)[0].active = false;

      } else {
        arrow_hit_register.tint = 0x00ff00
      }
    })

  })

  // Player.ammo--
  arrowContainer.addChild(arrow)
  global.viewport.addChild(firedArrowGuide, arrowContainer)

}

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

let arrow = PIXI.Sprite.fromImage('images/weapons/ammo/arrow.png')


module.exports.pickUpArrow = (Player) => {

  if(arrowContainer.children === 0) return

  b.hit(Player.sprite, arrowContainer.children,false,false,true,(collisionSprite, arrow)=>{

    if(arrow.pickup) {
      Player.ammo++;
      arrow.destroy();
    }

  })

}

module.exports.arrowManagement = (Player, mousePosition) => {

  const arrow_hit_register = spriteHelper.drawPolygon([0, 300, 805, 300, 805, 336, 0, 336]);

  const path_one = new PIXI.tween.TweenPath()
  .moveTo(Player.sprite.position.x, Player.sprite.position.y)
  .lineTo(mousePosition.x,mousePosition.y)

  firedArrowGuide.clear().lineStyle(3, 0xffffff,0).drawPath(path_one)

  const arrow = PIXI.Sprite.fromImage('images/weapons/ammo/arrow.png')
        arrow.anchor.set(0.5)
        arrow.width /=3
        arrow.height /=3
        arrow.rotation = spriteHelper.angle(Player.sprite, mousePosition)

  const arrowTween = PIXI.tweenManager.createTween(arrow);
        arrowTween.path = path_one;
        arrowTween.time = Player.power;
        arrowTween.easing = PIXI.tween.Easing.linear();
        arrowTween.start()
        arrowTween.on("end", function() {
          arrow.pickup = true;
        })

  arrowTween.on("update", function() {

    let trimmedData = []

    for (let i = 0; i < global.collisionItems.children[0].vertexData.length; i++) {

      if(i % 2 === 0){
        trimmedData.push(global.collisionItems.children[0].vertexData[i]-global.collisionItems.children[0].gx)
      } else {
        trimmedData.push(global.collisionItems.children[0].vertexData[i]-global.collisionItems.children[0].gy)
      }

    }

    if (Intersects.pointPolygon(arrow.x, arrow.y, trimmedData)) {
      console.log("hitting")
      arrow_hit_register.tint = 0xf00000
      arrow.pickup = true;
      arrowTween.stop();
      arrowSounds[Math.floor((Math.random() * 7) + 1)].play();

    } else {
      arrow_hit_register.tint = 0x00ff00
    }

    b.hit(arrow, global.critterContainer.children,false,false,false,()=>{
      arrow_hit_register.tint = 0xf00000
      arrow.pickup = true;
      arrowTween.stop()
      
      global.critterContainer.children[0].texture = global.critterContainer.children[0].dead;
      global.critterContainer.children[0].stop()
      global.critterContainer.children[0].mouseDeathSound.play()
      console.log(PIXI.tweenManager.getTweensForTarget( global.critterContainer.children[0])[0])
      PIXI.tweenManager.getTweensForTarget( global.critterContainer.children[0])[0].active = false;

    })

  })

  Player.ammo--
  arrowContainer.addChild(arrow)
  global.viewport.addChild(firedArrowGuide, arrowContainer)

}
const PIXI        = require("pixi.js"),
      Intersects  = require('intersects'),
      b           = new Bump(PIXI),
      rat         = require("../animals/rat.js"),
      spriteHelper = require("../utils/spriteHelper.js"),
      bowHelper   = require("../weapons/bow/bowHelper.js"),
      documentHelper = require("../utils/documentHelper.js");

global.Player = {

  animation: {
    walk:         [],
    idle:         [],
    pullback:     [],
    ready:        []
  },

  sprite: {  
    moving:       {},
    idle:         {},
    walk:         {},
    pullback:     {},
    eating:       {}
  },

  movement_speed: 20,
  weapon:         "bow",
  moveable:       true,
  power:          1000,
  ammo:           10,
  inventory:      []

}

const aimingLine = new PIXI.Graphics();

function countDown() {

  global.Player.sprite._textures = global.Player.sprite.ready._textures

  if(global.Player.power > 650) {
    global.Player.allowShoot = false
  }
  else {
    global.Player.allowShoot = true
  }

  if(global.Player.power > 400){
    global.Player.power -= 10;
  } 
  if(global.Player.power < 410) {
    global.Player.sprite.gotoAndStop(34);
  }
  
}

function mouseUp () {
    
  global.viewport.on('mouseup', event => {

    global.Player.sprite._textures = global.Player.sprite.idle._textures;

    global.Player.moveable = true;

    global.Player.sprite.play()

    global.app.ticker.remove(countDown);

    if (global.Player.weapon === "bow" && global.Player.ammo > 0 && global.Player.allowShoot) {

      const mousePosition = documentHelper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, global.viewport);

      bowHelper.arrowManagement(global.Player, mousePosition);
        
    }

  })

}

function mouseMove () {

  global.viewport.on('mousemove', event => {
    
    if (global.Player.weapon === "bow" && global.Player.ammo > 0) {

      const mousePosition = documentHelper.mousePositionFromScreen(event.data.global, global.viewport)

      const mousePositionPlayer = documentHelper.mousePositionFromPlayer(event.data.global, global.Player.sprite , global.viewport)

      aimingLine.clear()
      aimingLine.position.set(global.Player.sprite.position.x, global.Player.sprite.position.y)
      aimingLine.lineStyle(3, 0xffffff, 0)
      .moveTo(0, 0)
      .lineTo(mousePosition.x, mousePosition.y);  
      global.Player.sprite.rotation = spriteHelper.angle(global.Player.sprite, mousePositionPlayer)

    }

  })

}

function mouseDown () {
    
  global.viewport.on('mousedown', event => {
    
    global.Player.power = 1000
    global.Player.moveable = false;

    global.app.ticker.add(countDown);
    
    if (global.Player.weapon === "bow" && global.Player.ammo > 0) {
      
      const mousePosition = documentHelper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, global.viewport)  
    
      global.Player.sprite._textures = global.Player.sprite.ready._textures
      global.Player.sprite.rotation = spriteHelper.angle(global.Player.sprite, mousePosition)
      global.Player.sprite.gotoAndPlay(0);
  
    }

  })

}



function add_player_controls() {

  document.addEventListener("keyup", e=> {

      global.Player.sprite._textures = global.Player.sprite.idle._textures
  })

  document.addEventListener("keydown", e=> {

    let trimmedDoorData = []

    let currentDirection = undefined

    if(!global.Player.moveable) return;

    let poo = b.rectangleCollision(global.movableItems.children[0],global.Player.sprite,true,true,false)

    let foo = undefined;
    
    console.log(global.collisionItems.children)
    const elem = global.collisionItems.children
    for (let a = 0; a < elem.length; a++) {
      const element = elem[a];

      element.vertexTrimmedData = []

      for (let i = 0; i < element.vertexData.length; i++) {

        if(i % 2 === 0){
          element.vertexTrimmedData.push(element.vertexData[i]-element.vertexData[0]+element.x)
        } else {
          element.vertexTrimmedData.push(element.vertexData[i]-element.vertexData[1]+element.y)
        }
    
      }

      
      if (Intersects.pointPolygon(global.Player.sprite.x, global.Player.sprite.y, element.vertexTrimmedData)) {
        console.log("hitting with player")
        
      }
      
    }


    
    for (let i = 0; i < global.doors.children[0].vertexData.length; i++) {

      if(i % 2 === 0){
        trimmedDoorData.push(global.doors.children[0].vertexData[i]-global.doors.children[0].vertexData[0]+global.doors.children[0].x)
      } else {
        trimmedDoorData.push(global.doors.children[0].vertexData[i]-global.doors.children[0].vertexData[1]+global.doors.children[0].y)
      }
  
    }

    const food = Intersects.pointPolygon(global.Player.sprite.x, global.Player.sprite.y, trimmedDoorData);

    console.log(food)
    console.log("food")

    if (food === "top") {
      console.log("hitting1")
      global.doors.children[0].rotation += 0.2
    } 
    if (food === "bottom") {
      console.log("hitting1")
      global.doors.children[0].rotation -= 0.2
    } 
    if (food === "exception") {
      global.doors.children[0].rotation -= 0.2
    }

    // b.hit(global.Player.sprite, global.collisionItems.children,true,true,false,()=>console.log('hit1'))

    b.hit(global.Player.sprite, global.critterContainer.children,true,true,false,(collisionSprite, critter)=>{
      
      global.Player.inventory.push(critter)
      PIXI.tweenManager.getTweensForTarget(critter)[0].clear()
      critter.destroy();

    })

    b.hit(global.movableItems.children[0], global.collisionItems.children,true,true,false,()=>{
      console.log('hit')
      foo = "shit"
    })

    if(poo) {
      global.Player.movement_speed = 10
      if(foo && (currentDirection !== poo)) {
        currentDirection = poo
        global.Player.movement_speed = 0
        global.Player.sprite.y -= 20
      }
    } else{
      global.Player.movement_speed = 20
    }

    let key = documentHelper.getDirection(e.key)

    if(key === "up"){
      global.Player.sprite.y -= global.Player.movement_speed; 
      global.Player.sprite.rotation = -2
      global.Player.sprite._textures = global.Player.sprite.walk._textures
    }

    if(key === "down"){
      global.Player.sprite.y += global.Player.movement_speed; 
      global.Player.sprite.rotation = 2
      global.Player.sprite._textures = global.Player.sprite.walk._textures
    }

    if(key === "left"){
      global.Player.sprite.x -= global.Player.movement_speed; 
      global.Player.sprite.rotation = -3
      global.Player.sprite._textures = global.Player.sprite.walk._textures
    }

    if(key === "right"){
      global.Player.sprite.x += global.Player.movement_speed;
      global.Player.sprite.rotation = 0
      global.Player.sprite._textures = global.Player.sprite.walk._textures
    }



    bowHelper.pickUpArrow(global.Player)

  });

  global.viewport.addChild(aimingLine);

}

module.exports.add_player = () => {

  new PIXI.loaders.Loader()
  // .add("knife",'images/Top_Down_Survivor/knife/move/sprites.json')
  .add('idle','images/Top_Down_Survivor/bow/idle/survivor-bow-idle.json')
  .add('walk','images/Top_Down_Survivor/bow/walk/survivor-walk_bow.json')
  .add('ready','images/Top_Down_Survivor/bow/ready/survivor-ready_bow.json')
  .load((loader, res) => {
      
    let sheet = loader.resources.ready;

    for (var i = 0; i < loader.resources.idle.spritesheet._frameKeys.length; i++) {
      global.Player.animation.idle.push(PIXI.Texture.fromFrame(loader.resources.idle.spritesheet._frameKeys[i]));
    }
    for (var i = 0; i < loader.resources.walk.spritesheet._frameKeys.length; i++) {
      global.Player.animation.walk.push(PIXI.Texture.fromFrame(loader.resources.walk.spritesheet._frameKeys[i]));
    }

    for (var i = 0; i < loader.resources.ready.spritesheet._frameKeys.length; i++) {
      global.Player.animation.ready.push(PIXI.Texture.fromFrame(loader.resources.ready.spritesheet._frameKeys[i]));
    }
    
    global.Player.sprite = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
    global.Player.sprite.anchor.set(0.5);
    global.Player.sprite.width /= 2
    global.Player.sprite.height /= 2
    global.Player.sprite.animationSpeed = 0.5;
    global.Player.sprite.play();

    global.Player.sprite.walk = new PIXI.extras.AnimatedSprite(global.Player.animation.walk);
    global.Player.sprite.idle = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
    global.Player.sprite.ready = new PIXI.extras.AnimatedSprite(global.Player.animation.ready);

    global.viewport.follow(global.Player.sprite)
    global.viewport.addChild(global.Player.sprite);

    add_player_controls()
    mouseMove()
    mouseDown()
    mouseUp()
    
  })

}

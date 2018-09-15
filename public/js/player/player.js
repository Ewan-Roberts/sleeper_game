const PIXI        = require("pixi.js"),
      Intersects  = require('intersects'),
      b           = new Bump(PIXI),
      rat         = require("../animals/rat.js"),
      spriteHelper = require("../utils/spriteHelper.js"),
      doorHelper = require("../utils/doorHelper.js"),
      bowHelper   = require("../weapons/bow/bowHelper.js"),
      documentHelper = require("../utils/documentHelper.js"),
      uuidv4 = require('uuid/v4');


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
  power:          900,
  ammo:           10,
  inventory:      [],
  network_data: {
    x: 0,
    y: 0
  }

}

global.Player.player_id = uuidv4()


const aimingLine = new PIXI.Graphics();

function countDown() {

  global.Player.sprite._textures = global.Player.sprite.ready._textures

  if(global.Player.power > 750) {
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

      bowHelper.arrowManagement(global.Player.power,global.Player.sprite, mousePosition);

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
    
    global.Player.power = 900
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
  },true)

  document.addEventListener("keydown", e => {

    let currentDirection = undefined;

    let key = documentHelper.getDirection(e.key)
    
    if(!global.Player.moveable) return;

    const network_info = {
      key: key,
      player_id: global.Player.player_id
    }


    global.socket.emit('keystroke', network_info)

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

    doorHelper.hit(global.Player.sprite, global.doors.children[0])

    spriteHelper.hitBoxContainerObj(global.collisionItems.children, global.Player.sprite)
    .then(hit => {
        
      if(key === "up") global.Player.sprite.y +=global.Player.movement_speed
      if(key === "down") global.Player.sprite.y -=global.Player.movement_speed
      if(key === "left") global.Player.sprite.x +=global.Player.movement_speed
      if(key === "right") global.Player.sprite.x -=global.Player.movement_speed
      
    })
    

    spriteHelper.hitBoxContainerObj(global.eventTriggers.children, global.Player.sprite)
    .then(pad => {
      pad.action()
    })

    // spriteHelper.hitBoxContainerObj(global.enemyContainer.children, global.Player.sprite)
    // .then(enemy => {
    //   console.log("enemy")
    //   console.log(enemy)
    //   // PIXI.tweenManager.getTweensForTarget(enemy).active = false;
      
    //   console.log("enemy")
    //   // console.log(global.enemyContainer)
      
    // })

    spriteHelper.hitBoxContainerObj(global.critterContainer.children, global.Player.sprite)
    .then(critter => {
      global.Player.inventory.push(critter)
      PIXI.tweenManager.getTweensForTarget(critter)[0].clear()
      critter.destroy();
    })

    spriteHelper.hitBoxContainerObj(global.movableItems.children, global.Player.sprite)
    .then(item => {

      if(key === "up") {
        global.Player.sprite.y +=global.Player.movement_speed -item.weight
        item.y-=item.weight
      }
      if(key === "down") {
        
        global.Player.sprite.y -=global.Player.movement_speed-item.weight
        item.y+=item.weight
      
      }
      if(key === "left") {
        global.Player.sprite.x +=global.Player.movement_speed-item.weight
        item.x-=item.weight
      }
      if(key === "right") {
        global.Player.sprite.x -=global.Player.movement_speed-item.weight
        item.x+=item.weight
      }
      return item;
    })
    .then(a=>{
      
      // const b =global.movableItems.children[0]
      // if(spriteHelper.boxBox(a.x,a.y,a.width,a.height,b.x,b.y,b.width,b.height)){
      //   console.log('herer');
      // }

    })

    bowHelper.pickUpArrow(global.Player);

    global.Player.network_data.x = global.Player.sprite.x
    global.Player.network_data.y = global.Player.sprite.y

    // global.socket.emit('post_player_data', global.Player.network_data)
    
  },true);

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
    global.bunny = PIXI.Sprite.fromImage('images/bunny.png')
    global.Player.sprite = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
    global.Player.sprite.anchor.set(0.5);
    global.Player.sprite.width /= 2
    global.Player.sprite.height /= 2
    global.Player.sprite.animationSpeed = 0.6;
    global.Player.sprite.play();
    global.Player.sprite.zIndex = -20;

    // global.socket.on('player_move', data => {

    //   console.log(data)

    //   global.bunny.x = data.x
    //   global.bunny.y = data.y
    //   global.bunny.rotation = data.rotation

    // })


    global.Player.sprite.walk = new PIXI.extras.AnimatedSprite(global.Player.animation.walk);
    global.Player.sprite.idle = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
    global.Player.sprite.ready = new PIXI.extras.AnimatedSprite(global.Player.animation.ready);

    global.viewport.follow(global.Player.sprite)
    global.viewport.addChild(global.Player.sprite, global.bunny);
    global.viewport.updateLayersOrder();

    add_player_controls()
    mouseMove()
    mouseDown()
    mouseUp()
    
  })

}

module.exports.remove_controls = () =>{

  document.removeEventListener("keyup", e=> {});

  document.removeEventListener("keydown", e=> {});
}

const PIXI = require('pixi.js');
const sprite_helper = require('../utils/sprite_helper.js');
const door_helper = require('../utils/door_helper.js');
const bow_helper = require('../weapons/bow/bow_helper.js');
const document_helper = require('../utils/document_helper.js');
const ticker = require('../engine/ticker');
const viewport = require('../engine/viewport.js');


class Player {
  constructor() {
    const bow_frames = this.create_bow_frames();

    this.sprite = new PIXI.extras.AnimatedSprite(bow_frames);

    this.sprite.anchor.set(0.5);
    this.sprite.width /= 2;
    this.sprite.height /= 2;
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.zIndex = -20;
    this.sprite.tag = 'player';
    this.weapon = 'bow';
    this.ammo = 4;
    this.power = 0;
    this.allow_shoot = true;
    this.movement_speed = 15;

    viewport.follow(this.sprite);
    viewport.addChild(this.sprite);

  }

  create_bow_frames() {
    const bow_frames = [];
  
    for (let i = 0; i <= 21; i += 1) {
      let name = `survivor-bow-idle-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-idle-${i}`;
      }
      bow_frames.push(PIXI.Texture.fromFrame(name));
    }

    return bow_frames;
  }

  create_idle_frames() {
    const bow_frames = [];
  
    for (let i = 0; i <= 21; i += 1) {
      let name = `survivor-bow-idle-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-idle-${i}`;
      }
      bow_frames.push(PIXI.Texture.fromFrame(name));
    }

    this.animation.idle = bow_frames;
  }


  create_ready_frames() {
    const ready_frames = [];
  
    for (let i = 0; i <= 38; i += 1) {
      let name = `survivor-bow-pull-0${i}`;
  
      if (i >= 10) name = `survivor-bow-pull-${i}`;
  
      ready_frames.push(PIXI.Texture.fromFrame(name));
    }

    this.animation.ready = ready_frames;
  }

  create_walk_frames() {
    const walk_frames = [];

    for (let i = 0; i <= 20; i += 1) {
      let name = `survivor-walk_bow_0${i}`;
  
      if (i >= 10) name = `survivor-walk_bow_${i}`;
      
      walk_frames.push(PIXI.Texture.fromFrame(name));
    }

    this.animation.walk = walk_frames;
  }

  set_position(x,y) {
    this.sprite.position.set(x, y);
  }

  mouse_move() {
    const aimingLine = new PIXI.Graphics();

    viewport.on('mousemove', (event) => {
      if (this.weapon === 'bow' && this.ammo > 0) {

        const mouse_position = ({
          x: event.data.global.x - viewport.screenWidth / 2,
          y: event.data.global.y - viewport.screenHeight / 2,
        })

        const mouse_position_player = ({
          x: event.data.global.x + this.sprite.x - viewport.screenWidth / 2,
          y: event.data.global.y + this.sprite.y - viewport.screenHeight / 2,
        });

        aimingLine.clear();
        aimingLine.position.set(this.sprite.position.x, this.sprite.position.y);
        aimingLine.lineStyle(3, 0xffffff, 1).moveTo(0, 0).lineTo(mouse_position.x, mouse_position.y);
        viewport.addChild(aimingLine);
        this.sprite.rotation = sprite_helper.get_angle_from_point_to_point(this.sprite, mouse_position_player);
      }
    }); 
  }

  count_down() {

    // this.sprite._textures = this.sprite.ready._textures;

    if (this.power > 750) {
      this.allow_shoot = false;
    }
    else {
      this.allow_shoot = true;
    }
  
    if (this.power > 400) {
      this.power -= 10;
    }
  
    if (this.power < 410) {
      this.sprite.gotoAndStop(34);
    }

  }

  mouse_down() {

    viewport.on('mousedown', (event) => {
      this.power = 900;
      this.moveable = false;
      
      ticker.add(this.count_down);
  
      if (this.weapon === 'bow' && this.ammo > 0) {
        
        const mouse_position_player = ({
          x: event.data.global.x + this.sprite.x - viewport.screenWidth / 2,
          y: event.data.global.y + this.sprite.y - viewport.screenHeight / 2,
        });
  
        // global.Player.sprite._textures = global.Player.sprite.ready._textures;
        global.Player.sprite.rotation = sprite_helper.get_angle_from_point_to_point(global.Player.sprite, mouse_position_player);
        global.Player.sprite.gotoAndPlay(0);
      }
    });
  }

  mouse_up() {

    viewport.on('mouseup', (event) => {
      // global.Player.sprite._textures = global.Player.sprite.idle._textures;
      this.moveable = true;
      this.sprite.play();
  
      ticker.remove(this.count_down);
  
      if (this.weapon === 'bow' && this.ammo > 0 && this.allow_shoot) {
        const mouse_position_player = ({
          x: event.data.global.x + this.sprite.x - viewport.screenWidth / 2,
          y: event.data.global.y + this.sprite.y - viewport.screenHeight / 2,
        });
  
        bow_helper.arrow_management(this.power, this.sprite, mouse_position_player);
      }
    });
  }
  
  add_controls() {
  
    global.document.addEventListener('keydown', (e) => {
      const key = document_helper.getDirection(e.key);
  
      if (!this.moveable) return;
  
      if (key === 'up') {
        this.sprite.y -= this.movement_speed;
        this.sprite.rotation = -2;
        // this.sprite._textures = this.sprite.walk._textures;
      }
  
      if (key === 'down') {
        this.sprite.y += this.movement_speed;
        this.sprite.rotation = 2;
        // this.sprite._textures = global.Player.sprite.walk._textures;
      }
  
      if (key === 'left') {
        this.sprite.x -= this.movement_speed;
        this.sprite.rotation = -3;
        // this.sprite._textures = global.Player.sprite.walk._textures;
      }
  
      if (key === 'right') {
        this.sprite.x += this.movement_speed;
        this.sprite.rotation = 0;
        // this.sprite._textures = global.Player.sprite.walk._textures;
      }
    })
      // door_helper.hit(global.Player.sprite, global.doors.children[0]);
  
      // sprite_helper.hitBoxContainerObj(global.arrowContainer.children, global.Player.sprite)
      //   .then((arrow) => {
      //     if (arrow.pickup) {
      //       global.Player.ammo += 1;
      //       arrow.destroy();
      //     }
      //   });
  
    //   sprite_helper.hitBoxContainerObj(global.collisionItems.children, global.Player.sprite)
    //     .then(() => {
    //       if (key === 'up') global.Player.sprite.y += global.Player.movement_speed;
    //       if (key === 'down') global.Player.sprite.y -= global.Player.movement_speed;
    //       if (key === 'left') global.Player.sprite.x += global.Player.movement_speed;
    //       if (key === 'right') global.Player.sprite.x -= global.Player.movement_speed;
    //     });
  
    //   sprite_helper.hitBoxContainerObj(global.eventTriggers.children, global.Player.sprite)
    //     .then(pad => pad.action());
  
    //   sprite_helper.hitBoxContainerObj(global.critterContainer.children, global.Player.sprite)
    //     .then((critter) => {
    //       global.Player.inventory.push(critter);
  
    //       PIXI.tweenManager.getTweensForTarget(critter)[0].clear();
  
    //       critter.destroy();
    //     });
  
    //   sprite_helper.hitBoxContainerObj(global.movableItems.children, global.Player.sprite)
    //     .then((item) => {
    //       if (key === 'up') {
    //         global.Player.sprite.y += global.Player.movement_speed - item.weight;
    //         item.y -= item.weight;
    //       }
    //       if (key === 'down') {
    //         global.Player.sprite.y -= global.Player.movement_speed - item.weight;
    //         item.y += item.weight;
    //       }
    //       if (key === 'left') {
    //         global.Player.sprite.x += global.Player.movement_speed - item.weight;
    //         item.x -= item.weight;
    //       }
    //       if (key === 'right') {
    //         global.Player.sprite.x -= global.Player.movement_speed - item.weight;
    //         item.x += item.weight;
    //       }
    //     });
    // }, true);
  
    // viewport.addChild(aimingLine);

  }

}


global.Player = {

  animation: {
    walk: [],
    idle: [],
    pullback: [],
    ready: [],
  },

  sprite: {
    moving: {},
    idle: {},
    walk: {},
    pullback: {},
  },
  movement_speed: 15,
  weapon: 'bow',
  moveable: true,
  power: 900,
  ammo: 10,
  inventory: [],
  vitals: {
    health: 100,
    status: 'alive',
  }
};

// const aimingLine = new PIXI.Graphics();

// function countDown() {
//   global.Player.sprite._textures = global.Player.sprite.ready._textures;

//   if (global.Player.power > 750) global.Player.allowShoot = false;
//   else global.Player.allowShoot = true;

//   if (global.Player.power > 400)global.Player.power -= 10;

//   if (global.Player.power < 410) global.Player.sprite.gotoAndStop(34);
// }

// function mouseUp() {
//   viewport.on('mouseup', (event) => {
//     global.Player.sprite._textures = global.Player.sprite.idle._textures;
//     global.Player.moveable = true;
//     global.Player.sprite.play();

//     ticker.remove(countDown);

//     if (global.Player.weapon === 'bow' && global.Player.ammo > 0 && global.Player.allowShoot) {
//       const mousePosition = document_helper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, viewport);

//       bow_helper.arrow_management(global.Player.power, global.Player.sprite, mousePosition);
//     }
//   });
// }



// function mouseDown() {
//   viewport.on('mousedown', (event) => {
//     global.Player.power = 900;
//     global.Player.moveable = false;
//     ticker.add(countDown);

//     if (global.Player.weapon === 'bow' && global.Player.ammo > 0) {
//       const mousePosition = document_helper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, viewport);

//       global.Player.sprite._textures = global.Player.sprite.ready._textures;
//       global.Player.sprite.rotation = sprite_helper.get_angle_from_point_to_point(global.Player.sprite, mousePosition);
//       global.Player.sprite.gotoAndPlay(0);
//     }
//   });
// }

function addPlayerControls() {

}

module.exports.add_player_with_position = (x,y) => {

  global.Player = new Player()
  // global.viewport.addChild(global.Player.sprite.idle)
  // global.viewport.updateLayersOrder();
  
  // addPlayerControls();
  global.Player.mouse_move();
  global.Player.mouse_down()
  global.Player.mouse_up()
  global.Player.add_controls()
  // mouseDown();
  // mouseUp();
};

module.exports.remove_controls = () => {
  global.document.removeEventListener('keyup', () => {});

  global.document.removeEventListener('keydown', () => {});
};


module.exports.move_player_to = (x,y)=>{

  global.Player.sprite.position.set(x,y)
}
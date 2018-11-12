const PIXI = require('pixi.js');
const sprite_helper = require('../utils/sprite_helper.js');
const door_helper = require('../utils/door_helper.js');
const bow_helper = require('../weapons/bow/bow_helper.js');
const document_helper = require('../utils/document_helper.js');

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

const aimingLine = new PIXI.Graphics();

function countDown() {
  global.Player.sprite._textures = global.Player.sprite.ready._textures;

  if (global.Player.power > 750) global.Player.allowShoot = false;
  else global.Player.allowShoot = true;

  if (global.Player.power > 400)global.Player.power -= 10;

  if (global.Player.power < 410) global.Player.sprite.gotoAndStop(34);
}

function mouseUp() {
  global.viewport.on('mouseup', (event) => {
    global.Player.sprite._textures = global.Player.sprite.idle._textures;
    global.Player.moveable = true;
    global.Player.sprite.play();

    global.app.ticker.remove(countDown);

    if (global.Player.weapon === 'bow' && global.Player.ammo > 0 && global.Player.allowShoot) {
      const mousePosition = document_helper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, global.viewport);

      bow_helper.arrow_management(global.Player.power, global.Player.sprite, mousePosition);
    }
  });
}

function mouseMove() {
  global.viewport.on('mousemove', (event) => {
    if (global.Player.weapon === 'bow' && global.Player.ammo > 0) {
      const mousePosition = document_helper.mousePositionFromScreen(event.data.global, global.viewport);
      const mousePositionPlayer = document_helper.mousePositionFromPlayer(event.data.global, global.Player.sprite, global.viewport);

      aimingLine.clear();
      aimingLine.position.set(global.Player.sprite.position.x, global.Player.sprite.position.y);
      aimingLine.lineStyle(3, 0xffffff, 0)
        .moveTo(0, 0)
        .lineTo(mousePosition.x, mousePosition.y);
      global.Player.sprite.rotation = sprite_helper.get_angle_from_point_to_point(global.Player.sprite, mousePositionPlayer);
    }
  });
}

function mouseDown() {
  global.viewport.on('mousedown', (event) => {
    global.Player.power = 900;
    global.Player.moveable = false;
    global.app.ticker.add(countDown);

    if (global.Player.weapon === 'bow' && global.Player.ammo > 0) {
      const mousePosition = document_helper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, global.viewport);

      global.Player.sprite._textures = global.Player.sprite.ready._textures;
      global.Player.sprite.rotation = sprite_helper.get_angle_from_point_to_point(global.Player.sprite, mousePosition);
      global.Player.sprite.gotoAndPlay(0);
    }
  });
}

function addPlayerControls() {
  global.document.addEventListener('keyup', () => {
    global.Player.sprite._textures = global.Player.sprite.idle._textures;
  }, true);

  global.document.addEventListener('keydown', (e) => {
    const key = document_helper.getDirection(e.key);

    if (!global.Player.moveable) return;

    if (key === 'up') {
      global.Player.sprite.y -= global.Player.movement_speed;
      global.Player.sprite.rotation = -2;
      global.Player.sprite._textures = global.Player.sprite.walk._textures;
    }

    if (key === 'down') {
      global.Player.sprite.y += global.Player.movement_speed;
      global.Player.sprite.rotation = 2;
      global.Player.sprite._textures = global.Player.sprite.walk._textures;
    }

    if (key === 'left') {
      global.Player.sprite.x -= global.Player.movement_speed;
      global.Player.sprite.rotation = -3;
      global.Player.sprite._textures = global.Player.sprite.walk._textures;
    }

    if (key === 'right') {
      global.Player.sprite.x += global.Player.movement_speed;
      global.Player.sprite.rotation = 0;
      global.Player.sprite._textures = global.Player.sprite.walk._textures;
    }

    door_helper.hit(global.Player.sprite, global.doors.children[0]);

    // sprite_helper.hitBoxContainerObj(global.arrowContainer.children, global.Player.sprite)
    //   .then((arrow) => {
    //     if (arrow.pickup) {
    //       global.Player.ammo += 1;
    //       arrow.destroy();
    //     }
    //   });

    sprite_helper.hitBoxContainerObj(global.collisionItems.children, global.Player.sprite)
      .then(() => {
        if (key === 'up') global.Player.sprite.y += global.Player.movement_speed;
        if (key === 'down') global.Player.sprite.y -= global.Player.movement_speed;
        if (key === 'left') global.Player.sprite.x += global.Player.movement_speed;
        if (key === 'right') global.Player.sprite.x -= global.Player.movement_speed;
      });

    sprite_helper.hitBoxContainerObj(global.eventTriggers.children, global.Player.sprite)
      .then(pad => pad.action());

    sprite_helper.hitBoxContainerObj(global.critterContainer.children, global.Player.sprite)
      .then((critter) => {
        global.Player.inventory.push(critter);

        PIXI.tweenManager.getTweensForTarget(critter)[0].clear();

        critter.destroy();
      });

    sprite_helper.hitBoxContainerObj(global.movableItems.children, global.Player.sprite)
      .then((item) => {
        if (key === 'up') {
          global.Player.sprite.y += global.Player.movement_speed - item.weight;
          item.y -= item.weight;
        }
        if (key === 'down') {
          global.Player.sprite.y -= global.Player.movement_speed - item.weight;
          item.y += item.weight;
        }
        if (key === 'left') {
          global.Player.sprite.x += global.Player.movement_speed - item.weight;
          item.x -= item.weight;
        }
        if (key === 'right') {
          global.Player.sprite.x -= global.Player.movement_speed - item.weight;
          item.x += item.weight;
        }
      });
  }, true);

  global.viewport.addChild(aimingLine);
}

module.exports.add_player_with_position = (x,y) => {
  for (let i = 0; i <= 21; i += 1) {
    let name = `survivor-bow-idle-0${i}`;

    if (i >= 10) name = `survivor-bow-idle-${i}`;

    global.Player.animation.idle.push(PIXI.Texture.fromFrame(name));
  }

  for (let i = 0; i <= 20; i += 1) {
    let name = `survivor-walk_bow_0${i}`;

    if (i >= 10) name = `survivor-walk_bow_${i}`;

    global.Player.animation.walk.push(PIXI.Texture.fromFrame(name));
  }

  for (let i = 0; i <= 38; i += 1) {
    let name = `survivor-bow-pull-0${i}`;

    if (i >= 10) name = `survivor-bow-pull-${i}`;

    global.Player.animation.ready.push(PIXI.Texture.fromFrame(name));
  }

  global.Player.sprite = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
  global.Player.sprite.anchor.set(0.5);
  global.Player.sprite.width /= 2;
  global.Player.sprite.height /= 2;
  global.Player.sprite.animationSpeed = 0.4;
  global.Player.sprite.play();
  global.Player.sprite.zIndex = -20;
  global.Player.sprite.tag = 'player';
  global.Player.sprite.position.set(x,y)

  global.Player.sprite.walk = new PIXI.extras.AnimatedSprite(global.Player.animation.walk);
  global.Player.sprite.idle = new PIXI.extras.AnimatedSprite(global.Player.animation.idle);
  global.Player.sprite.ready = new PIXI.extras.AnimatedSprite(global.Player.animation.ready);
  global.Player.sprite._textures = global.Player.sprite.idle._textures;

  global.viewport.follow(global.Player.sprite);
  global.viewport.addChild(global.Player.sprite);
  // global.viewport.addChild(global.Player.sprite.idle)
  // global.viewport.updateLayersOrder();

  addPlayerControls();
  mouseMove();
  mouseDown();
  mouseUp();
};

module.exports.remove_controls = () => {
  global.document.removeEventListener('keyup', () => {});

  global.document.removeEventListener('keydown', () => {});
};


module.exports.move_player_to = (x,y)=>{

  global.Player.sprite.position.set(x,y)
}
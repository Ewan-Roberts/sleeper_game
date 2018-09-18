const PIXI = require('pixi.js');
// const Intersects = require('intersects');
// const rat = require('../animals/rat.js');
const spriteHelper = require('../utils/spriteHelper.js');
const doorHelper = require('../utils/doorHelper.js');
const bowHelper = require('../weapons/bow/bowHelper.js');
const documentHelper = require('../utils/documentHelper.js');
// uuidv4 = require('uuid/v4');

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
  movement_speed: 20,
  weapon: 'bow',
  moveable: true,
  power: 900,
  ammo: 10,
  inventory: [],

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
      const mousePosition = documentHelper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, global.viewport);

      bowHelper.arrowManagement(global.Player.power, global.Player.sprite, mousePosition);
    }
  });
}

function mouseMove() {
  global.viewport.on('mousemove', (event) => {
    if (global.Player.weapon === 'bow' && global.Player.ammo > 0) {
      const mousePosition = documentHelper.mousePositionFromScreen(event.data.global, global.viewport);
      const mousePositionPlayer = documentHelper.mousePositionFromPlayer(event.data.global, global.Player.sprite, global.viewport);

      aimingLine.clear();
      aimingLine.position.set(global.Player.sprite.position.x, global.Player.sprite.position.y);
      aimingLine.lineStyle(3, 0xffffff, 0)
        .moveTo(0, 0)
        .lineTo(mousePosition.x, mousePosition.y);
      global.Player.sprite.rotation = spriteHelper.angle(global.Player.sprite, mousePositionPlayer);
    }
  });
}

function mouseDown() {
  global.viewport.on('mousedown', (event) => {
    global.Player.power = 900;
    global.Player.moveable = false;
    global.app.ticker.add(countDown);

    if (global.Player.weapon === 'bow' && global.Player.ammo > 0) {
      const mousePosition = documentHelper.mousePositionFromPlayer(event.data.global, global.Player.sprite.position, global.viewport);

      global.Player.sprite._textures = global.Player.sprite.ready._textures;
      global.Player.sprite.rotation = spriteHelper.angle(global.Player.sprite, mousePosition);
      global.Player.sprite.gotoAndPlay(0);
    }
  });
}

function addPlayerControls() {
  global.document.addEventListener('keyup', () => {
    global.Player.sprite._textures = global.Player.sprite.idle._textures;
  }, true);

  global.document.addEventListener('keydown', (e) => {
    const key = documentHelper.getDirection(e.key);

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

    doorHelper.hit(global.Player.sprite, global.doors.children[0]);

    spriteHelper.hitBoxContainerObj(global.arrowContainer.children, global.Player.sprite)
      .then((arrow) => {
        if (arrow.pickup) {
          global.Player.ammo += 1;
          arrow.destroy();
        }
      });

    spriteHelper.hitBoxContainerObj(global.collisionItems.children, global.Player.sprite)
      .then(() => {
        if (key === 'up') global.Player.sprite.y += global.Player.movement_speed;
        if (key === 'down') global.Player.sprite.y -= global.Player.movement_speed;
        if (key === 'left') global.Player.sprite.x += global.Player.movement_speed;
        if (key === 'right') global.Player.sprite.x -= global.Player.movement_speed;
      });

    spriteHelper.hitBoxContainerObj(global.eventTriggers.children, global.Player.sprite)
      .then(pad => pad.action());

    spriteHelper.hitBoxContainerObj(global.critterContainer.children, global.Player.sprite)
      .then((critter) => {
        global.Player.inventory.push(critter);

        PIXI.tweenManager.getTweensForTarget(critter)[0].clear();

        critter.destroy();
      });

    spriteHelper.hitBoxContainerObj(global.movableItems.children, global.Player.sprite)
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

module.exports.add_player = () => {
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
  global.Player.sprite.animationSpeed = 0.6;
  global.Player.sprite.play();
  global.Player.sprite.zIndex = -20;

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

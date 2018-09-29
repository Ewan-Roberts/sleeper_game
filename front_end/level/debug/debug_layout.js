
const PIXI = require('pixi.js');
const player = require('../../player/player.js');
const enemy = require('../../enemies/enemy.js');
const items = require('./debug_items.js');
// const doorHelper = require('../../utils/doorHelper.js');
const levelUtils = require('../level_utils.js');
const filterUtil = require('../../visual_effects/filterUtils.js');
const dialogUtil = require('../../dialog/dialogUtil.js');
const networkPlayers = require('../../network/network_players.js');
const spriteAnimations = require('../../visual_effects/sprite_animations.js');
const rain = require('../../weather/rain.js');
const cutsceneIntro = require('../../cutscene/cutscene_intro.js');
const rat = require('../../animals/rat.js');
const cutsceneUtils = require('../../cutscene/cutsceneUtils.js');
const generateObject = require('../../construction/generateObject.js');


global.collisionItems = new PIXI.Container();
global.eventTriggers = new PIXI.Container();

function createPad(x, y) {
  const pad = PIXI.Sprite.fromFrame('black_wall');

  pad.width = 200;
  pad.height = 100;
  pad.position.set(x, y);

  return pad;
}

module.exports.add_floor = () => {
  const slantedWall = PIXI.Sprite.fromFrame('black_wall');
  slantedWall.rotation = 0.4;
  slantedWall.position.set(100, 100);

  const collisionWall = PIXI.Sprite.fromFrame('black_wall');
  collisionWall.position.set(100, 600);

  const door = PIXI.Sprite.fromFrame('black_wall');
  door.width /= 2;
  door.position.set(-100, -200);

  const ratPad = createPad(-700, 200);
  ratPad.alpha = 0.4;
  ratPad.fired = false;
  ratPad.action = () => {
    if (!ratPad.fired) {
      ratPad.fired = true;
      rat.load_rat().then(() => rat.mouseMove({ x: 100, y: 300 }, { x: 0, y: 400 }));
    }
  };

  const enemyPad = createPad(-950, 200);
  enemyPad.alpha = 0.2;
  enemyPad.fired = false;
  enemyPad.action = () => {
    if (!enemyPad.fired) {
      enemyPad.fired = true;
      enemy.enemy_frames().then(() => enemy.projectileAttack(global.Player.sprite));
    }
  };

  const levelLoadPad = createPad(-450, 200);
  levelLoadPad.alpha = 0.6;
  levelLoadPad.fired = false;
  levelLoadPad.action = () => {
    if (!levelLoadPad.fired) {
      levelLoadPad.fired = true;
      levelUtils.importBedroomData();
    }
  };

  const glitchPad = createPad(-700, 50);
  glitchPad.alpha = 0.4;
  glitchPad.fired = false;
  glitchPad.action = () => {
    if (!glitchPad.fired) {
      glitchPad.fired = true;
      filterUtil.glitch();
    } else filterUtil.clear();
  };

  const dialogPad = createPad(-450, 50);
  dialogPad.alpha = 0.6;
  dialogPad.fired = false;
  dialogPad.action = () => {
    if (!dialogPad.fired) {
      dialogPad.fired = true;
      dialogUtil.renderText(global.Player.sprite, 'I am some dialog');
    } else rain.start_rain(0, 3400, 400, 850);
  };

  const effectPad = createPad(-200, 200);
  effectPad.fired = false;
  effectPad.alpha = 0.8;
  effectPad.action = () => {
    if (!effectPad.fired) {
      effectPad.fired = true;
      filterUtil.fade_in_black();
    } else filterUtil.fade_out_black();
  };

  const animationPad = createPad(-700, -100);
  animationPad.fired = false;
  animationPad.alpha = 0.6;
  animationPad.interactive = true;
  animationPad.on('click', ()=>{
    animationPad.fired = true;
    console.log('fwefew')
    generateObject.renderItem(200, 100)
    // levelUtils.importStreetApartmentData();
    // cutsceneUtils.teleport(1500, 1500);
  });

  const loadParkPad = createPad(-950, -100);
  loadParkPad.fired = false;
  loadParkPad.alpha = 0.4;
  loadParkPad.interactive = true;
  loadParkPad.on('click', ()=>{
    loadParkPad.fired = true;
    levelUtils.importParkData();
    cutsceneUtils.teleport(1500, 1500);
    enemy.enemy_frames()
      .then(() => {
        const levelPathData = levelUtils.importEnemyPathData();
        enemy.enemy_path(levelPathData);
      });
  })
  loadParkPad.action = () => {
    if (!loadParkPad.fired) {
      loadParkPad.fired = true;
      levelUtils.importParkData();
      cutsceneUtils.teleport(1500, 1500);
      enemy.enemy_frames()
        .then(() => {
          const levelPathData = levelUtils.importEnemyPathData();
          enemy.enemy_path(levelPathData);
        });
    }
  };

  const networkPad = createPad(-450, -100);
  networkPad.fired = false;
  networkPad.alpha = 0.8;
  networkPad.action = () => {
    if (!networkPad.fired) {
      networkPad.fired = true;
      networkPlayers.load_network_sprite();
    }
  };

  const enemyPathing = createPad(-200, -200);
  enemyPathing.fired = false;
  enemyPathing.alpha = 0.8;
  enemyPathing.action = () => {
    if (!enemyPathing.fired) {
      enemyPathing.fired = true;
      enemy.enemy_frames()
        .then(() => {
          const levelPathData = levelUtils.importEnemyPathData();
          enemy.enemy_path(levelPathData);
        });
    }
  };

  const clearPad = createPad(-200, 50);
  clearPad.fired = false;
  clearPad.alpha = 0.8;
  clearPad.action = () => {
    if (!clearPad.fired) {
      clearPad.fired = true;

      cutsceneIntro.start();
    } else filterUtil.clear();
  };

  global.eventTriggers.addChild(
    ratPad,
    enemyPad,
    levelLoadPad,
    effectPad,
    clearPad,
    glitchPad,
    dialogPad,
    networkPad,
    animationPad,
    loadParkPad,
    enemyPathing,
  );

  global.doors.addChild(door);

  global.viewport.updateLayersOrder = () => {
    global.viewport.children.sort((a, b) => {
      a.zIndex = a.zIndex || 0;
      b.zIndex = b.zIndex || 0;
      return b.zIndex - a.zIndex;
    });
  };

  global.viewport.addChild(global.eventTriggers);
  global.collisionItems.zIndex = 1;
  global.collisionItems.addChild(slantedWall, collisionWall);
  global.viewport.updateLayersOrder();

  player.add_player();
  items.add_items();
};


const PIXI = require('pixi.js');
const { Player } = require('../../player/player.js');
const enemy = require('../../enemies/enemy.js');
const items = require('./debug_items.js');
const filterUtil = require('../../visual_effects/filter_utils.js');
const dialogUtil = require('../../dialog/dialog_util.js');
const networkPlayers = require('../../network/network_players.js');
const rain = require('../../weather/rain.js');
const cutsceneIntro = require('../../cutscene/cutscene_intro.js');
const rat = require('../../animals/rat.js');
const cutsceneUtils = require('../../cutscene/cutscene_utils.js');
const generateObject = require('../../construction/generate_object.js');
const bedroomUtil = require('../bedroom/bedroom_util.js');
const parkUtil = require('../park/park_util.js');
const pathfinding_util = require('../../pathfinding/pathfind_util.js');
const level_util = require('../level_utils.js');
const viewport = require('../../engine/viewport');


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

  const collisionWall = PIXI.Sprite.fromFrame('black_wall');
  collisionWall.position.set(100, 600);

  const door = PIXI.Sprite.fromFrame('black_wall');
  door.width /= 2;
  door.position.set(-100, -200);

  console.log(Player)

  const character = new Player()
  character.set_position(1000,1000)
  character.mouse_move();
  character.mouse_down()
  character.mouse_up()
  character.add_controls()
  character.follow_player()

  level_util.load_bedroom_map()
  const create_grid = createPad(-500, -200);
  create_grid.interactive = true;
  create_grid.alpha = 0.8;

  global.eventTriggers.addChild(
    create_grid,
  );

  global.doors.addChild(door);

  viewport.updateLayersOrder = () => {
    viewport.children.sort((a, b) => {
      a.zIndex = a.zIndex || 0;
      b.zIndex = b.zIndex || 0;
      return b.zIndex - a.zIndex;
    });
  };

  viewport.addChild(global.eventTriggers);
  global.collisionItems.zIndex = 1;
  global.collisionItems.addChild( /* slantedWall */ collisionWall);
  viewport.updateLayersOrder();

  items.add_items();
};


const PIXI = require('pixi.js');
const player = require('../../player/player.js');
const enemy = require('../../enemies/enemy.js');
const items = require('./debug_items.js');
const filterUtil = require('../../visual_effects/filterUtils.js');
const dialogUtil = require('../../dialog/dialogUtil.js');
const networkPlayers = require('../../network/network_players.js');
const rain = require('../../weather/rain.js');
const cutsceneIntro = require('../../cutscene/cutscene_intro.js');
const rat = require('../../animals/rat.js');
const cutsceneUtils = require('../../cutscene/cutsceneUtils.js');
const generateObject = require('../../construction/generateObject.js');
const bedroomUtil = require('../bedroom/bedroomUtil.js');
const parkUtil = require('../park/parkUtil.js');
const pathfinding_util = require('../../pathfinding/pathfind_util.js');
const level_util = require('../level_utils.js');

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

  const enemy_pathing = createPad(-200, -200);
  enemy_pathing.interactive = true;
  enemy_pathing.alpha = 0.8;
  enemy_pathing.on('click', () => {
    enemy.init_enemies_container()
    enemy.create_enemy(200, -200)
      .then( sprite => {
        enemy.sight_line(sprite);
        enemy.influence_box(sprite);
        enemy.crate_path(sprite, [
          {x: 200, y:-200},
          {x: 200,y: -200},
          {x: 300,y:-600},
          {x: 800,y:-600},
          {x: 400,y:-100},
          {x: 200,y:-100},
          {x: 100,y:-100},
          {x: 200, y:-200},
        ])
        .then(path => {
          const enemy_tween = enemy.crate_path_tween(sprite, path);
          enemy.enemy_logic_on_path(sprite, enemy_tween, path)
        })
      })
  });

  const create_grid = createPad(-500, -200);
  create_grid.interactive = true;
  create_grid.alpha = 0.8;
  create_grid.on('click', () => {
    
    level_util.load_debug_room_from_tiled()
      .then(pathfinding_path => {
        enemy.init_enemies_container()
        enemy.create_enemy(200, -200)
          .then(sprite => {
            enemy.sight_line(sprite);
            enemy.influence_box(sprite);
            enemy.crate_path(sprite, pathfinding_path)
            .then(path => {
              const enemy_tween = enemy.crate_path_tween(sprite, path);
              enemy.enemy_logic_on_path(sprite, enemy_tween, path)
            })
          })
      })
    // pathfinding_util.lay_down_grid()
  });


  global.eventTriggers.addChild(
    create_grid,
    enemy_pathing,
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
  global.collisionItems.addChild( /* slantedWall */ collisionWall);
  global.viewport.updateLayersOrder();

  player.add_player();
  items.add_items();
};

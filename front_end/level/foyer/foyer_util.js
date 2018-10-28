const PIXI = require('pixi.js');
const foyerData = require('./foyer_data.json');
const levelUtil = require('../level_utils.js');
const parkUtil = require('../park/park_util.js');
const cutsceneUtils = require('../../cutscene/cutscene_utils');

module.exports.load = () => {
  levelUtil.clearViewport();
  levelUtil.clearCollision();
  levelUtil.clearEventTriggers()
  // console.log(global.viewport);
  const flatBackground = PIXI.Sprite.fromFrame('ground_floor');
  flatBackground.zIndex = 1;
  flatBackground.height = foyerData.tileheight;
  flatBackground.width = foyerData.tilewidth;

  global.collisionItems.zIndex = -1;
  console.log(foyerData.tiles[1].objectgroup.objects)
  levelUtil.renderWall(foyerData.tiles[0].objectgroup.objects);
  levelUtil.eventPad(foyerData.tiles[1].objectgroup.objects, () => {
    cutsceneUtils.teleport(2000, 4100);
    parkUtil.load();
  });
  // levelUtil.hitAreas(bedroomData.tiles[2].objectgroup.objects);
  global.viewport.addChild(flatBackground);
  global.viewport.updateLayersOrder();
};

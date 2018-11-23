const PIXI = require('pixi.js');
const bedroomData = require('./bedroom_data_5.json');
const levelUtil = require('../level_utils.js');
const foyerUtil = require('../foyer/foyer_util.js');
const cutsceneUtils = require('../../cutscene/cutscene_utils');
const viewport = require('../../engine/viewport');

module.exports.load = () => {
  levelUtil.clearViewport();
  levelUtil.clearCollision();
  levelUtil.clearEventTriggers()
  const flatBackground = PIXI.Sprite.fromFrame('flat_floor2');
  flatBackground.zIndex = 1;
  flatBackground.height = bedroomData.tileheight;
  flatBackground.width = bedroomData.tilewidth;

  global.collisionItems.zIndex = -1;

  levelUtil.renderWall(bedroomData.tiles[0].objectgroup.objects);
  levelUtil.eventPad(bedroomData.tiles[1].objectgroup.objects, () => {
    cutsceneUtils.teleport(2000, 4100);
    foyerUtil.load();
  });
  // levelUtil.hitAreas(bedroomData.tiles[2].objectgroup.objects);
  viewport.addChild(flatBackground);

  viewport.updateLayersOrder();
};

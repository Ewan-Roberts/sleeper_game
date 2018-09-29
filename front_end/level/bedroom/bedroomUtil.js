const PIXI = require('pixi.js');
const bedroomData = require('./bedroom_data_4.json');
const levelUtil = require('../level_utils.js');

module.exports.load = () => {
  const flatBackground = PIXI.Sprite.fromFrame('flat_floor');
  flatBackground.zIndex = 1;
  flatBackground.height = bedroomData.tileheight;
  flatBackground.width = bedroomData.tilewidth;

  global.collisionItems.zIndex = -1;

  levelUtil.renderWall(bedroomData.tiles[1].objectgroup.objects);
  levelUtil.hitAreas(bedroomData.tiles[2].objectgroup.objects);
  global.viewport.addChild(flatBackground);

  global.viewport.updateLayersOrder();
};

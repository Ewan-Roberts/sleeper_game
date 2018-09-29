const PIXI = require('pixi.js');
const parkData = require('./park_5.json');
const levelUtil = require('../level_utils.js');

module.exports.load = () => {
  const parkBackground = PIXI.Sprite.fromFrame('park_bottom');
  const parkTopground = PIXI.Sprite.fromFrame('park_top');
  parkBackground.interactive = true;
  parkBackground.zIndex = 1;
  parkTopground.zIndex = -200;
  parkTopground.alpha = 0.95;
  parkTopground.height = parkData.tileheight;
  parkTopground.width = parkData.tilewidth;

  levelUtil.hitAreas(parkData.tiles[3].objectgroup.objects);

  global.viewport.addChild(parkTopground, parkBackground);
  global.viewport.updateLayersOrder();
};

module.exports.importEnemyPathData = () => {
  const importedParkData = parkData.tiles[3].objectgroup.objects[10].polyline;
  return importedParkData;
};

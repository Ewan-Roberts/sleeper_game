const PIXI = require('pixi.js');
const parkData = require('./park_data.json');
const levelUtil = require('../level_utils.js');

module.exports.load = () => {
  levelUtil.clearViewport();
  levelUtil.clearCollision();
  levelUtil.clearEventTriggers()
  // const parkBackground = PIXI.Sprite.fromFrame('park');
  // const parkTopground = PIXI.Sprite.fromFrame('park_top');
  parkBackground.interactive = true;
  parkBackground.zIndex = 1;
  // parkTopground.zIndex = -200;
  // parkTopground.alpha = 0.95;
  // parkTopground.height = parkData.tileheight;
  // parkTopground.width = parkData.tilewidth;
  parkBackground.height = parkData.tileheight;
  parkBackground.width = parkData.tilewidth;

  levelUtil.renderWall(parkData.tiles[0].objectgroup.objects);

  global.viewport.addChild(parkBackground);
  global.viewport.updateLayersOrder();
};

module.exports.importEnemyPathData = () => {
  const importedParkData = parkData.tiles[3].objectgroup.objects[10].polyline;
  return importedParkData;
};

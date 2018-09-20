const PIXI = require('pixi.js');
const bedroomData = require('./bedroom/bedroom_data_4.json');
const parkData = require('./park/park_4.json');

module.exports.clearViewport = () => {
  for (let i = global.viewport.children.length - 1; i >= 0; i -= 1) {
    global.viewport.removeChild(global.viewport.children[i]);
  }
};

module.exports.clearCollision = () => {
  for (let i = global.collisionItems.children.length - 1; i >= 0; i -= 1) {
    global.collisionItems.removeChild(global.collisionItems.children[i]);
  }
};

// const addToSegments = (item) => {
//   global.collisionItems.push(
//     { a: { x: item.x, y: item.y + item.height }, b: { x: item.x, y: item.y } },
//     { a: { x: item.x, y: item.y }, b: { x: item.x + item.width, y: item.y } },
//     { a: { x: item.x + item.width, y: item.y + item.height }, b: { x: item.x, y: item.y + item.height } },
//     { a: { x: item.x + item.width, y: item.y + item.height }, b: { x: item.x + item.width, y: item.y } },
//   );
// };

module.exports.importBedroomData = () => {
  const flatBackground = PIXI.Sprite.fromFrame('flat_floor');
  flatBackground.interactive = true;
  flatBackground.zIndex = 1;
  flatBackground.height = bedroomData.tileheight;
  flatBackground.width = bedroomData.tilewidth;

  global.collisionItems.zIndex = -1;

  this.renderWall(bedroomData.tiles[1].objectgroup.objects);
  this.hitAreas(bedroomData.tiles[2].objectgroup.objects);
  global.viewport.addChild(flatBackground);

  global.viewport.updateLayersOrder();
};


module.exports.renderWall = (wallArray) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');
    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;

    global.collisionItems.addChild(wall);
  });
};

module.exports.importEnemyPathData = () => {
  const importedParkData = parkData.tiles[2].objectgroup.objects[24].polyline;
  return importedParkData;
};

module.exports.createEnemyPathFrom = (levelData) => {
  const path = new PIXI.tween.TweenPath();

  path.moveTo(levelData[0].x, levelData[0].y+1388);

  for (let i = 1; i < levelData.length; i += 1) path.lineTo(levelData[i].x, levelData[i].y+1388);

  return path;
};

module.exports.importParkData = () => {
  const parkBackground = PIXI.Sprite.fromFrame('park_bottom');
  const parkTopground = PIXI.Sprite.fromFrame('park_top');
  parkBackground.interactive = true;
  parkBackground.zIndex = 1;
  parkTopground.zIndex = -200;
  parkTopground.alpha = 0.95;
  parkBackground.height = parkData.tileheight;
  parkBackground.width = parkData.tilewidth;
  parkTopground.height = parkData.tileheight;
  parkTopground.width = parkData.tilewidth;
  // parkBackground.width = 10000
  // parkBackground.height = 6000

  for (let i = 0; i < parkData.tiles[2].objectgroup.objects.length; i += 1) {
    this.hitAreas(parkData.tiles[2].objectgroup.objects);
  }

  global.viewport.addChild(parkTopground, parkBackground);
  global.viewport.updateLayersOrder();
};

module.exports.renderWall = (wallArray) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;

    global.collisionItems.addChild(wall);
  });
};

module.exports.hitAreas = (wallArray) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    wall.alpha = 0.01;

    global.collisionItems.addChild(wall);
  });
};

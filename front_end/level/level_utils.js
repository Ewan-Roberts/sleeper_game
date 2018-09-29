const PIXI = require('pixi.js');

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

// Solid Black wall
module.exports.renderWall = (wallArray) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x, wallData.y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    global.collisionItems.addChild(wall);
  });
};

// hit area that is transparent, kept a little tint for testing
module.exports.hitAreas = (wallArray, x, y) => {
  wallArray.forEach((wallData) => {
    const wall = PIXI.Sprite.fromFrame('black_dot');

    wall.position.set(wallData.x + x, wallData.y + y);
    wall.width = wallData.width;
    wall.height = wallData.height;
    wall.alpha = 0.01;

    global.collisionItems.addChild(wall);
  });
};

// Load event pads
module.exports.eventPad = (details, callback) => {
  const pad = PIXI.Sprite.fromFrame('black_dot');

  pad.position.set(details.x, details.y);
  pad.width = details.width;
  pad.height = details.height;
  pad.alpha = details.alpha;
  pad.action = callback;
  pad.fired = false;
  pad.alpha = 0.5;
  global.eventTriggers.addChild(pad);
};

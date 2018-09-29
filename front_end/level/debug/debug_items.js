
const PIXI = require('pixi.js');

module.exports.add_items = () => {
  const boxFull = PIXI.Sprite.fromFrame('chest_full');
  boxFull.position.set(-1200, 0);
  boxFull.width *= 2;
  boxFull.height *= 2;
  boxFull.rotation = 0.06;
  boxFull.interactive = true;
  boxFull.buttonMode = true;
  boxFull.id = 35;
  boxFull.on('pointerdown', () => {
    boxFull.texture = PIXI.Sprite.fromFrame('chest_empty');

    global.socket.emit('get_container_contents', boxFull.id);
  });

  const movableBox = PIXI.Sprite.fromFrame('chest_full');
  movableBox.position.set(-600, 400);
  movableBox.width *= 2;
  movableBox.height *= 2;
  movableBox.rotation = 0.06;
  movableBox.interactive = true;
  movableBox.buttonMode = true;
  movableBox.weight = 10;

  global.movableItems.addChild(movableBox);
  global.collisionItems.addChild(boxFull);
  global.viewport.addChild(global.collisionItems);
};

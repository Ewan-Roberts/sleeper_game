
const PIXI = require('pixi.js');
// const documentHelper = require('../utils/document_helper.js');

function onDragStart(event) {
  this.alpha = 0.5;
  this.dragging = true;
  this.data = event.data;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }
}

module.exports.renderItem = (x, y) => {

  const item = PIXI.Sprite.fromFrame('cupboard');
  item.interactive = true;
  item.buttonMode = true;
  // global.viewport.addChild(item);
  global.collisionItems.addChild(item);
  item.position.set(x, y);
  item
    .on('mousedown', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('mousemove', onDragMove);

};

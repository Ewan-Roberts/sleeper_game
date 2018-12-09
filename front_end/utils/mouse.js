'use strict';

const keymap = {
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right',
  j: 'down',
  k: 'up',
  h: 'left',
  l: 'right',
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowDown: 'down',
  ArrowRight: 'right',
};

module.exports.getDirection = key => keymap[key];

module.exports.mousePositionFromPlayer = (event, player, viewport) => ({
  x: event.x + player.x - viewport.screenWidth / 2,
  y: event.y + player.y - viewport.screenHeight / 2,
});

module.exports.mousePositionFromScreen = (event, viewport) => ({
  x: event.x - viewport.screenWidth / 2,
  y: event.y - viewport.screenHeight / 2,
});

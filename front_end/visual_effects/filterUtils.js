
const filters = require('pixi-filters');
const PIXI = require('pixi.js');

const padding = 100;
let overlay = {};

function countUp() {
  if (overlay.alpha <= 1) {
    overlay.alpha += 0.01;
  } else {
    global.app.ticker.remove(countUp);
    overlay.alpha = 1;
  }
}

function countDown() {
  if (overlay.alpha >= 0) {
    overlay.alpha -= 0.01;
  } else {
    global.app.ticker.remove(countDown);
    overlay.alpha = 0;
    global.viewport.removeChild(overlay);
  }
}

module.exports.fade_in_black = () => {
  overlay = PIXI.Sprite.fromFrame('black_dot');
  overlay.zIndex = -3;
  overlay.anchor.set(0.5);

  overlay.alpha = 0;
  overlay.width = global.viewport.worldWidth + padding;
  overlay.height = global.viewport.worldHeight + padding;
  overlay.position.set(global.viewport.center.x, global.viewport.center.y);
  global.app.ticker.add(countUp);
  global.viewport.addChild(overlay);
};

module.exports.fade_out_black = () => {
  overlay = PIXI.Sprite.fromFrame('black_dot');
  overlay.zIndex = -3;
  overlay.anchor.set(0.5);
  overlay.alpha = 1;
  overlay.width = global.viewport.worldWidth + padding;
  overlay.height = global.viewport.worldHeight + padding;
  overlay.position.set(global.viewport.center.x, global.viewport.center.y);
  global.app.ticker.add(countDown);
};

module.exports.glitch = () => {
  global.viewport.filters = [new filters.GlitchFilter()];
};

module.exports.godray = (x, y) => new Promise((resolve) => {
  this.clear();
  const godray = new filters.GodrayFilter();
  godray.parallel = false;
  godray.center = [x, y];
  godray.gain = 0.4;
  godray.time = 20.5;
  global.viewport.filters = [godray];

  function godrayAnimation() {
    if (godray.time <= 100) godray.time += 0.005;
  }
  global.app.ticker.add(godrayAnimation);
  resolve();
});

module.exports.clear = () => {
  global.viewport.filters = [];
};

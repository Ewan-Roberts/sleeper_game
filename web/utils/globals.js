const PIXI = require('pixi.js');

const { visuals  } = require('../engine/pixi_containers');
const { renderer } = require('../engine/app');

// Very loose function to just place a bunny (useful for testing)
global.place_bunny = ({ x = 0, y = 0 } = {}) => {
  const bunny = new PIXI.Sprite.fromFrame('bunny');
  bunny.position.set(x, y);
  bunny.anchor.set(0.5);
  bunny.width  = 100;
  bunny.height = 100;

  visuals.addChild(bunny);
  return bunny;
};

global.env = 'prod';
global.dev = () => {
  renderer.backgroundColor = 0x0066CC;
  global.env = 'dev';
};

// AUTO-REFRESH WINDOW
// For dev auto refesh
// let blurred = false;
// global.window.onblur = function() { blurred = true; };
// global.window.onfocus = function() { blurred && (global.location.reload()); };
// 20/ 29;

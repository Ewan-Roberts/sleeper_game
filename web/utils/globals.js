const PIXI = require('pixi.js');
global.window.PIXI.default = PIXI;

const { visuals  } = require('../engine/pixi_containers');
const { Vitals   } = require('../character/attributes/vitals');

// Very loose function to just place a bunny (useful for testing)
global.place_bunny = ({
  x = 0,
  y = 0,
  width,
  height,
} = {}, place_in_container) => {
  const bunny = new PIXI.Sprite.fromFrame('bunny');
  bunny.position.copy({ x, y });
  // bunny.anchor.set(0.5);
  bunny.width  = width || 100;
  bunny.height = height || 100;
  bunny.vitals = new Vitals();

  if(place_in_container) {
    visuals.addChild(bunny);
  }
  return bunny;
};

// AUTO-REFRESH WINDOW
// For dev auto refesh
// let blurred = false;
// global.window.onblur = function() { blurred = true; };
// global.window.onfocus = function() { blurred && (global.location.reload()); };
// 20/ 29;

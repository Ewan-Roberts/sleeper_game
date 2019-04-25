'use strict';
const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

/* ***************************************************************
 *                                                               *
 *  This file should stay very empty and disabled in production  *
 *                                                               *
 *************************************************************** */

// LIGHTING
// This global is for testing lighting anywhere in the code base
global.set_light_level = amount => {
  PIXI.shadows.filter.ambientLight = amount;
};

// QUICK POINT CHECKING
global.place_bunny = ({ x, y }, light) => {
  const texture = PIXI.Texture.fromImage('bunny');
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const bunny = new PIXI.Sprite.fromFrame('bunny');
  bunny.position.set(x, y);
  bunny.anchor.set(0.5);
  bunny.width = 200;
  bunny.height = 200;

  visual_effects_container.addChild(bunny);
  if(light) {
    const shade = new PIXI.Sprite(texture);
    shade.parentGroup = PIXI.shadows.casterGroup;
    shade.position.copy(bunny);
    visual_effects_container.addChild(shade);
  }

  return bunny;
};
// AUTO-REFRESH WINDOW
// For dev auto refesh
// let blurred = false;
// global.window.onblur = function() { blurred = true; };
// global.window.onfocus = function() { blurred && (global.location.reload()); };
// 20/ 29

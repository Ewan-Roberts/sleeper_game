'use strict';
const PIXI = require('pixi.js');

const { gui_container } = require('./pixi_containers.js');

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
global.place_bunny = (x, y) => {
  const texture = PIXI.Texture.fromImage('bunny');
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const bunny = new PIXI.Sprite.fromFrame(texture);
  bunny.position.set(x, y);
  bunny.anchor.set(0.5);

  const shade = new PIXI.Sprite(texture);
  shade.parentGroup = PIXI.shadows.casterGroup;
  shade.position.copy(bunny);

  gui_container.addChild(bunny);

  return bunny;
};

// AUTO-REFRESH WINDOW
// For dev auto refesh
// let blurred = false;
// global.window.onblur = function() { blurred = true; };
// global.window.onfocus = function() { blurred && (global.location.reload()); };


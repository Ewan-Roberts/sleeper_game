'use strict';

const PIXI = require('pixi.js');

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

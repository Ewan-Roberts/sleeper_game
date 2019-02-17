
'use strict';

const PIXI = require('pixi.js');

require('pixi-layers');
require('pixi-shadows');

const app = require('./app');

function createShadowSprite(texture, shadowTexture) {
  const container = new PIXI.Container(); // This represents your final 'sprite'

  // Things that create shadows
  if (shadowTexture) {
    const shadowCastingSprite = new PIXI.Sprite(shadowTexture);
    shadowCastingSprite.parentGroup = PIXI.shadows.casterGroup;
    container.addChild(shadowCastingSprite);
  }

  // The things themselves (their texture)
  const sprite = new PIXI.Sprite(texture);
  container.addChild(sprite);

  return container;
}


const world = PIXI.shadows.init(app);
// Create a light that casts shadows
// const shadow = new PIXI.shadows.Shadow(700, 1);
// shadow.position.set(450, 150);
// world.addChild(shadow);


world.updateLayersOrder = function () {
  world.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return b.zIndex - a.zIndex;
  });
};

world.interactive = true;

const shadow = new PIXI.shadows.Shadow(900, 1);
shadow.pointCount = 1;
shadow.overlayLightLength = 1000;
shadow.intensity = 3;
// shadow.position.set(450, 150);
world.addChild(shadow);


// Create some shadow casting demons
// const demonTexture = PIXI.Texture.fromImage('bunny');
// demonTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; //For pixelated scaling

// const demon1 = createShadowSprite(demonTexture, demonTexture);
// demon1.position.set(100, 100);
// demon1.scale.set(3);
// world.addChild(demon1);

// const demon2 = createShadowSprite(demonTexture, demonTexture);
// demon2.position.set(500, 100);
// demon2.scale.set(3);
// world.addChild(demon2);

// const demon3 = createShadowSprite(demonTexture, demonTexture);
// demon3.position.set(300, 200);
// demon3.scale.set(3);
// world.addChild(demon3);

// // Make the light track your mouse
// world.interactive = true;
// world.on("mousemove", function(event) {
//   shadow.position.copy(event.data.global);
// });

// // Create a light point on click
// world.on("pointerdown", function(event) {
//   var shadow = new PIXI.shadows.Shadow(700, 0.7);
//   shadow.position.copy(event.data.global);
//   world.addChild(shadow);
// });

module.exports = {
  world,
  shadow,
};







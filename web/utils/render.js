'use strict';
const { Sprite  } = require('pixi.js');
const { visuals } = require('../engine/pixi_containers');

function visual({x,y,width,height, properties = {}}) {
  let image_name = 'black_dot';

  if(properties.image_name) {
    image_name = properties.image_name;
  }
  const sprite = new Sprite.fromFrame(image_name);
  sprite.position.set(x, y);
  sprite.anchor.set(0.5);
  sprite.width  = width;
  sprite.height = height;

  visuals.addChild(sprite);

  return { sprite };
}

module.exports = {
  visual,
};

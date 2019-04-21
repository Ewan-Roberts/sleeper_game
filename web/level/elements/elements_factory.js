'use strict';

const { Chest     } = require('./chest');
const { Roof      } = require('./ceiling');
const { Shroud    } = require('./shroud');
const { CollisionItem } = require('./collision_object');
const { BackgroundVisualItem } = require('./visual_object');

//TODO This is not a Factory make it one and abstract this
class Element_Factory {
  static generate(type, options) {
    switch(type) {
      case 'item':      return new Chest(options);
      case 'roof':      return new Roof(options);
      case 'collision': return new CollisionItem(options);
      case 'floor':     return new BackgroundVisualItem(options);
      case 'shroud':    return new Shroud(options);
    }
  }

  static generate_tiled(level, data) {
    const generated = this.generate(level, data.properties);

    generated.set_position(data);
    //TODO flip
    generated.width = data.height;
    generated.height = data.width;
    generated.rotation = ((data.rotation+90) * (Math.PI/180));
    generated.sprite.anchor.y = 1;
    generated.sprite.anchor.x = 0;
    generated.sprite.id = data.id;

    return generated;
  }
}

module.exports = {
  Element_Factory,
};

'use strict';

const { Chest     } = require('./chest');
const { Tree      } = require('./tree');
const { Roof      } = require('./ceiling');
const { Phone     } = require('./phone');
// const { Candle    } = require('../../light/types/candle');
const { CollisionItem } = require('./collision_object');
const { BackgroundVisualItem } = require('./visual_object');

//TODO This is not a Factory make it one and abstract this
class Element_Factory {
  static generate(type, options) {
    switch(type) {
      case 'chest':     return new Chest(options);
      //TODO spelling
      case 'tree':      return new Tree(options);
      case 'roof':      return new Roof(options);
      case 'collision': return new CollisionItem(options);
      case 'floor_visual': return new BackgroundVisualItem(options);
      case 'phone':        return new Phone(options);
      // case 'candle':    return new Candle(options);
    }
  }

  static generate_tiled(data) {
    let generated;
    console.log(data);
    if(data.properties) {
      generated = this.generate(data.name, data.properties);
    } else {
      generated = this.generate(data.name);
    }
    generated.set_position(data);
    //TODO flip
    generated.width = data.height;
    generated.height = data.width;
    generated.rotation = ((data.rotation +90) * (Math.PI/180));
    generated.sprite.anchor.y = 1;
    generated.sprite.anchor.x = 0;
    generated.sprite.id = data.id;

    return generated;
  }
}

module.exports = {
  Element_Factory,
};

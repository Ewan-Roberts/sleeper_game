'use strict';

const { Chest     } = require('./chest');
const { Chair     } = require('./chair');
const { Backpack  } = require('./back_pack');
const { Matress   } = require('./dirty_matress');
const { Campfire  } = require('./fire_place');
const { Hay       } = require('./hay_bale');
const { Note      } = require('./note');
const { Workbench } = require('./workbench');
const { Tree      } = require('./tree');
const { Roof      } = require('./ceiling');

//TODO This is not a Factory make it one and abstract this
class Element_Factory {
  static generate(type, name) {
    switch(type) {
      case 'chest':     return new Chest();
      //TODO spelling
      case 'matress':   return new Matress();
      case 'mattress':  return new Matress();
      case 'backpack':  return new Backpack();
      case 'campfire':  return new Campfire();
      case 'hay':       return new Hay();
      case 'note':      return new Note();
      case 'workbench': return new Workbench();
      case 'chair':     return new Chair();
      case 'tree':      return new Tree(name);
      case 'roof':      return new Roof(name);
    }
  }

  static generate_tiled(data) {
    let generated;

    if(data.properties) {
      generated = this.generate(data.name, data.properties.image_name);
    } else {
      generated = this.generate(data.name);
    }

    generated.set_position(data);
    //TODO flip
    console.log(data);
    generated.width = data.height;
    generated.height = data.width;
    generated.rotation = ((data.rotation +90) * (Math.PI/180));
    generated.sprite.anchor.y = 1;
    generated.sprite.anchor.x = 0;

    return generated;
  }
}

module.exports = {
  Element_Factory,
};

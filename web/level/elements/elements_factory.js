'use strict';

const { Chest     } = require('./chest');
const { Chair     } = require('./chair');
const { Backpack  } = require('./back_pack');
const { Matress   } = require('./dirty_matress');
const { Campfire  } = require('./fire_place');
const { Hay       } = require('./hay_bale');
const { Note      } = require('./note');
const { Workbench } = require('./workbench');

//TODO This is not a Factory make it one and abstract this
class Element_Factory {
  static generate(name) {
    switch(name) {
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
    }
  }

  static generate_tiled(data) {
    const generated = this.generate(data.name);
    generated.set_position(data);
    //TODO flip
    generated.width = data.height;
    generated.height = data.width;
    generated.rotation = data.rotation += 1.57;
    generated.sprite.anchor.y = 1;
    generated.sprite.anchor.x = 0;

    return generated;
  }
}

module.exports = {
  Element_Factory,
};

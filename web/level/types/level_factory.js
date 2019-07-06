const { clear_level_containers } = require('../../engine/pixi_containers');
const { tweenManager } = require('pixi.js');

const { Camera      } = require('../../engine/camera');
const { Wall        } = require('../elements/wall');
const { Decal       } = require('../elements/decals');
const { Background  } = require('../elements/background');
const { Chest       } = require('../elements/chest');
const { Door        } = require('../elements/door');
const { Roof        } = require('../elements/ceiling');
const { Shroud      } = require('../elements/shroud');
const { Collision   } = require('../elements/collision');
const { Floor       } = require('../elements/floor');

class Level_Factory {
  static create(level_name) {
    this.clear();

    const { Intro           } = require('./intro');
    const { Items_Room      } = require('./item_room');
    const { Street          } = require('./street');
    const { Transition_Room } = require('./transition_room');
    const { Defend_Room     } = require('./defend_room');
    const { Park_Room       } = require('./park_room');
    const { Start_Room      } = require('./start');
    const { Simple_Room     } = require('./simple_room');
    const { Ranbir_Room     } = require('./ranbir_room');

    switch(level_name) {
      case 'intro'     : return new Intro();
      case 'item'      : return new Items_Room();
      case 'street'    : return new Street();
      case 'transition': return new Transition_Room();
      case 'defend'    : return new Defend_Room();
      case 'start'     : return new Start_Room();
      case 'park'      : return new Park_Room();
      case 'ranbir'    : return new Ranbir_Room();
      default: new Simple_Room(level_name);
    }
  }

  static generate({
    walls,
    door,
    shroud,
    item,
    roof,
    floor,
    decal,
    background,
    collision,
    player,
    slow_pad,
  }
  ) {

    const { Trigger_Pad } = require('../elements');
    try {
      if(player) Camera.set_center(player[0]);

      background.forEach(data => new Background(data));
      decal.forEach(data => new Decal(data));
      floor.forEach(data => new Floor(data));
      roof.forEach(data => new Roof(data));
      walls.forEach(data => new Wall(data));
      collision.forEach(data => new Collision(data));
      item.forEach(data => new Chest(data));
      door.forEach(data => new Door(data));
      shroud.forEach(data => new Shroud(data));
      if(slow_pad) slow_pad.forEach(data => new Trigger_Pad(data));

    } catch (error) {
      console.error(error);
    }
  }

  static clear() {
    console.log('clear');
    tweenManager.tweens.forEach(tween =>{
      if(tween.target.name === 'zombie') tween.target.remove();
    });
    clear_level_containers();
  }
}

module.exports = {
  Level_Factory,
};

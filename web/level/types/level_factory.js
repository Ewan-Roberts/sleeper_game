'use strict';
const { clear_level_containers } = require('../../engine/pixi_containers');
const { tweenManager    } = require('pixi.js');

const { Camera        } = require('../../engine/camera');
const { Wall          } = require('../elements/wall');
const { Decal         } = require('../elements/decals');
const { Background    } = require('../elements/background');
const { Chest         } = require('../elements/chest');
const { Door          } = require('../elements/door');
const { Roof          } = require('../elements/ceiling');
const { Shroud        } = require('../elements/shroud');
const { Collision     } = require('../elements/collision');
const { Floor         } = require('../elements/floor');

class Level_Factory {
  static create(data, player) {
    if(player) {
      player.destroy();
      this.clear();
    }

    const { properties } = data;

    const { Intro           } = require('./intro');
    const { Items_Room      } = require('./item_room');
    const { Street          } = require('./street');
    const { Simple_Room     } = require('./simple');
    const { Transition_Room } = require('./transition_room');
    const { Defend_Room     } = require('./defend_room');
    const { Park_Room       } = require('./park_room');
    const { Start_Room      } = require('./start');

    switch(properties.level_name) {
      case 'intro'     : return new Intro(properties);
      case 'item'      : return new Items_Room();
      case 'street'    : return new Street();
      case 'transition': return new Transition_Room();
      case 'defend'    : return new Defend_Room();
      case 'start'     : return new Start_Room();
      case 'park'      : return new Park_Room();
      default          : return new Simple_Room(properties);
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
  }
  ) {
    try {
      Camera.set_center(player[0]);

      decal.forEach(data => new Decal(data));
      floor.forEach(data => new Floor(data));
      roof.forEach(data => new Roof(data));
      shroud.forEach(data => new Shroud(data));
      background.forEach(data => new Background(data));
      walls.forEach(data => new Wall(data));
      collision.forEach(data => new Collision(data));
      item.forEach(data => new Chest(data));
      door.forEach(data => new Door(data));

    } catch (error) {
      console.error(error);
    }
  }

  static clear() {
    tweenManager.tweens.forEach(tween =>{
      if(tween.target.name === 'zombie') tween.target.remove();
    });
    clear_level_containers();
  }
}

module.exports = {
  Level_Factory,
};

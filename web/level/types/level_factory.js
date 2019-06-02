'use strict';
const { clear_level_containers } = require('../../engine/pixi_containers');

const { Intro         } = require('./intro');
const { Camera        } = require('../../engine/camera');
const { Wall          } = require('../elements/wall');
const { Background    } = require('../elements/background');
const { Chest         } = require('../elements/chest');
const { Door          } = require('../elements/door');
const { Roof          } = require('../elements/ceiling');
const { Shroud        } = require('../elements/shroud');
const { CollisionItem } = require('../elements/collision_object');
const { BackgroundVisualItem } = require('../elements/visual_object');

class Level_Factory {
  static create(data, player) {
    const {properties} = data;
    player.destroy();
    this.clear();

    const { Items_Room      } = require('./item_room');
    const { Street          } = require('./street');
    const { Simple          } = require('./simple');
    const { Transition_Room } = require('./transition_room');
    const { Defend_Room     } = require('./defend_room');
    const { Park_Room       } = require('./park_room');

    switch(properties.level_name) {
      case 'intro'     : return new Intro(data);
      case 'item'      : return new Items_Room();
      case 'street'    : return new Street();
      case 'transition': return new Transition_Room();
      case 'defend'    : return new Defend_Room();
      case 'park'      : return new Park_Room();
      default          : return new Simple(properties);
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

      shroud.forEach(data => new Shroud(data));
      background.forEach(data => new Background(data, true));
      floor.forEach(data => new BackgroundVisualItem(data));
      decal.forEach(data => new BackgroundVisualItem(data));
      walls.forEach(data => new Wall(data));
      collision.forEach(data => new CollisionItem(data));
      item.forEach(data => new Chest(data));
      door.forEach(data => new Door(data));
      roof.forEach(data => new Roof(data));

    } catch (error) {
      console.error(error);
    }
  }

  static clear() {
    clear_level_containers();
  }
}

module.exports = {
  Level_Factory,
};

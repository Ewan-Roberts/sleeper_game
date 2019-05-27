'use strict';
const { clear_non_players } = require('../../engine/pixi_containers');

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
    this.clear();
    const { Items_Room  } = require('./item_room');
    const { Street } = require('./street');
    const { Simple } = require('./simple');
    const { Transition_Room } = require('./transition_room');
    const { Defend_Room } = require('./defend_room');
    const { Park_Room } = require('./park_room');

    switch(properties.level_name) {
      case 'intro'     : return new Intro(player, data);
      case 'item'      : return new Items_Room(player);
      case 'street'    : return new Street(player);
      case 'transition': return new Transition_Room(player);
      case 'defend'    : return new Defend_Room(player);
      case 'park'      : return new Park_Room(player);
      default          : return new Simple(player, properties);
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
    clear_non_players();
  }
}

module.exports = {
  Level_Factory,
};

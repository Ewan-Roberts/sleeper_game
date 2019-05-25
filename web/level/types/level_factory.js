'use strict';
const { clear_non_players } = require('../../engine/pixi_containers');

const { Intro         } = require('./intro');
const { Camera        } = require('../../engine/camera');
const { Bright_Light  } = require('../../light/types/bright_light');
const { Wall          } = require('../elements/wall');
const { Background    } = require('../elements/background');
const { Chest         } = require('../elements/chest');
const { Door          } = require('../elements/door');
const { Roof          } = require('../elements/ceiling');
const { Shroud        } = require('../elements/shroud');
const { CollisionItem } = require('../elements/collision_object');
const { BackgroundVisualItem } = require('../elements/visual_object');

const camera = new Camera();

class Level_Factory {
  static create(properties, player) {
    this.clear();
    const { Archer_Room } = require('./archer_room');
    const { School_Room } = require('./school_room');
    const { Items_Room  } = require('./item_room');
    const { Items_Room_level_2  } = require('./intro_level_02');
    const { Street } = require('./street');
    const { Simple } = require('./simple');
    const { Transition_Room } = require('./transition_room');
    const { Defend_Room } = require('./defend_room');

    switch(properties.level_name) {
      case 'archer'    : return new Archer_Room(player);
      case 'intro'     : return new Intro(player, properties);
      case 'intro_level_02' : return new Items_Room_level_2(player);
      case 'school'    : return new School_Room(player);
      case 'item'      : return new Items_Room(player);
      case 'street'    : return new Street(player);
      case 'transition': return new Transition_Room(player);
      case 'defend'    : return new Defend_Room(player);
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
    lights,
    player,
  }
  ) {
    try {
      camera.set_center(player[0]);

      shroud.forEach(data => new Shroud(data));
      background.forEach(data => new Background(data, true));
      floor.forEach(data => new BackgroundVisualItem(data));
      decal.forEach(data => new BackgroundVisualItem(data));
      walls.forEach(data => new Wall(data));
      collision.forEach(data => new CollisionItem(data));
      item.forEach(data => new Chest(data));
      door.forEach(data => new Door(data));
      lights.forEach(data => new Bright_Light(data));
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

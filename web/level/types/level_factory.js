'use strict';

const { Intro       } = require('./intro');
const { Camera      } = require('../../engine/camera');
const { Wall        } = require('../elements/wall');
//const { Candle      } = require('../../light/types/candle');
const { Bright_Light } = require('../../light/types/bright_light');
const { Background  } = require('../elements/background');
const { Element_Factory } = require('../elements/elements_factory');

const { clear_non_player_containers } = require('../../engine/pixi_containers');

//TODO This is not a Factory make it one and abstract this
class Level_Factory {
  static create(properties, player) {
    const { Archer_Room } = require('./archer_room');
    const { School_Room } = require('./school_room');
    const { Items_Room  } = require('./item_room');
    const { Items_Room_level_2  } = require('./intro_level_02');
    const { Street } = require('./street');
    const { Simple } = require('./simple');
    const { Transition_Room } = require('./transition_room');

    switch(properties.level_name) {
      case 'archer'    : return new Archer_Room(player);
      case 'intro'     : return new Intro(player, properties);
      case 'intro_level_02' : return new Items_Room_level_2(player);
      case 'school'    : return new School_Room(player);
      case 'item'      : return new Items_Room(player);
      case 'street'    : return new Street(player);
      case 'transition': return new Transition_Room(player);
      default          : return new Simple(player, properties);
    }
  }

  static generate(
    player_sprite,
    {
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
      new Background(background, true);

      player_sprite.set_position(player);

      const camera = new Camera();
      camera.set_center(player);

      walls.forEach(data => {
        const wall  = new Wall(data.options);
        wall.height = data.height;
        wall.width  = data.width;
        wall.rotation = (data.rotation * (Math.PI/180));

        wall.set_position(data);
      });

      const level_collision = collision.map(data => Element_Factory.generate_tiled('collision', data));
      const level_items = item.map(data => Element_Factory.generate_tiled('item', data));
      floor.forEach(data => Element_Factory.generate_tiled('floor', data));
      door.forEach(data => Element_Factory.generate_tiled('door', data));
      shroud.forEach(data => Element_Factory.generate_tiled('shroud', data));
      decal.forEach(data => Element_Factory.generate_tiled('decal', data));
      roof.forEach(data => Element_Factory.generate_tiled('roof', data));

      const level_lights = lights.map(function(data) {
        const light  = new Bright_Light();
        light.set_position(data);
        light.id = data.id;

        const point = global.place_bunny(data);
        point.height = 20;
        point.width  = 20;
        return light;
      });

      return {
        level_items,
        level_lights,
        level_collision,
      };
    } catch (error) {
      console.log(error);
    }
  }

  static clear() {
    clear_non_player_containers();
  }
}

module.exports = {
  Level_Factory,
};

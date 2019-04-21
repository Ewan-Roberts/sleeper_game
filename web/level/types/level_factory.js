'use strict';

const { Intro       } = require('./intro');
const { Camera      } = require('../../engine/camera');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Background  } = require('../elements/background');
const { Element_Factory } = require('../elements/elements_factory');

const { clear_non_player_containers } = require('../../engine/pixi_containers');

//TODO This is not a Factory make it one and abstract this
class Level_Factory {
  static create(type, player) {
    const { Archer_Room } = require('./archer_room');
    const { School_Room } = require('./school_room');
    const { Items_Room  } = require('./item_room');
    const { Items_Room_level_2  } = require('./intro_level_02');

    switch(type) {
      case 'archer': return new Archer_Room(player);
      case 'intro' : return new Intro(player);
      case 'intro_level_02' : return new Items_Room_level_2(player);
      case 'school': return new School_Room(player);
      case 'item'  : return new Items_Room(player);
      default      : console.log(`error... missing level ${type}`);
    }
  }

  static generate(player_sprite, {walls, item, roof, floor, background, collision, lights, player}) {
    try {
      new Background(background, true);

      player_sprite.set_position(player);

      const camera = new Camera();
      camera.set_center(player);

      walls.forEach(data => {
        const wall  = new Wall();
        wall.shadow = true;
        wall.height = data.height;
        wall.width  = data.width;
        wall.anchor = 0;
        wall.rotation = (data.rotation * (Math.PI/180));

        wall.set_position(data);
      });

      collision.forEach(data => Element_Factory.generate_tiled('collision', data));
      item.forEach(data => Element_Factory.generate_tiled('item',data));
      floor.forEach(data => Element_Factory.generate_tiled('floor',data));

      roof.forEach(data => Element_Factory.generate_tiled('roof', data));
      lights.forEach(async data => {
        const light = new Candle();
        light.height = data.height;
        light.width  = data.width;
        light.set_position(data);
        light.start_flickering();
      });

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

'use strict';

const { Level           } = require('../level_model');
const { Background      } = require('../elements/background');
const { Tiled_Data      } = require('../attributes/parse_tiled_data');
const { Randomise       } = require('../attributes/randomise');
const { Wall            } = require('../elements/wall');
const { Bright_Light    } = require('../../light/types/bright_light');
const { Element_Factory } = require('../elements/elements_factory');
// const level_data       = require('../data/homestead_tiled.json');

class Tiled_Homestead extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_homestead_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('farmstead');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    const background_data = this.elements.background;
    console.log(this.elements);
    console.log(this.player);

    this.background.alpha = 0.2;
    this.background.sprite.anchor.set(0);
    this.background.set_position({x: 0, y: 0});
    this.background.width  = background_data.width;
    this.background.height = background_data.height;

    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    this.elements.lights.forEach(data => {
      const light = new Bright_Light();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    this.elements.item_areas.forEach(data => {
      const area = new Randomise();
      // area.anchor = 0;
      area.height = data.height;
      area.width  = data.width;
      area.alpha = 0.02;
      area.set_position(data);
      area.random_items(true);
    });

    this.elements.chairs.forEach(data => {
      const chair = Element_Factory.generate('chair');

      chair.set_position(data);
    });
  }
}

module.exports = {
  Tiled_Homestead,
};

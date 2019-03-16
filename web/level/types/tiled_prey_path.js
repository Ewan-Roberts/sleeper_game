'use strict';

const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Candle     } = require('../../light/types/candle');
// const { Rat        } = require('../../character/archetypes/rat');
const { Cat        } = require('../../character/archetypes/cat');
const level_data  = require('../data/tiled_room.json');
const level_tiled = require('../data/tiled_room_tiled.json');

class Tiled_Prey_Path extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');

    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();

    console.log(this.elements);
    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    const { entity } = this.elements.cat;
    const { route  } = this.elements;

    const cat = new Cat();
    cat.sprite.width = 50;
    cat.sprite.height = 100;

    cat.tween.path_smoothness = 100;
    cat.tween.add_path(route[0].path);
    cat.tween.time = 1000;
    cat.tween.show = true;
    cat.tween.chain(route[1].path);
    cat.tween.chain(route[2].path);
    cat.tween.start();
    // cat.route.route_path(route[2].path);

    cat.logic_start();
    cat.set_position(entity);

    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    this.elements.lights.forEach(data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });
  }
}

module.exports = {
  Tiled_Prey_Path,
};

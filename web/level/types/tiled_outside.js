'use strict';

const { Level        } = require('../level_model');
const { Tiled_Data   } = require('../attributes/parse_tiled_data');
const { Background   } = require('../elements/background');
const { Wall         } = require('../elements/wall');
const { Candle       } = require('../../light/types/candle');
const { Deer         } = require('../../character/archetypes/deer');
const { Scripted_NPC } = require('../../character/archetypes/neutral');

const { Element_Factory } = require('../elements/elements_factory');

const level_data  = require('../data/outside_room.json');
const level_tiled = require('../data/outside_room_tiled.json');

class Outside_Map extends Level {
  constructor(player) {
    super();
    this.name       = 'outside_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');
    this.background.tile('grass_tile');
    this.old_man    = new Scripted_NPC();

    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();
    this.player.set_position({x:700, y:600});

    this.background.set_position({x: 0, y:0});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    this.elements.furnishing.forEach(data => {
      Element_Factory.generate_tiled(data);
    });

    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.rotation = (data.rotation * (Math.PI/180));

      wall.set_position(data);
    });

    this.elements.prey.forEach(data => {
      const prey = new Deer();
      prey.enemy(this.player);
      prey.logic_start();
      prey.set_position(data);
    });

    this.elements.lights.forEach(data => {
      const light  = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });
  }
}

module.exports = {
  Outside_Map,
};

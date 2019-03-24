'use strict';

const { Level       } = require('../level_model');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Trigger_Pad } = require('../elements/pad');
const { Background  } = require('../elements/background');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Scavenger   } = require('../../character/archetypes/scavenger');

const { Element_Factory } = require('../elements/elements_factory');

const level_data  = require('../data/old_man_room.json');
const level_tiled = require('../data/old_man_room_tiled.json');

class Old_Man_Room extends Level {
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
    this.player.set_position({x:700, y:600});

    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    const { exit_point } = this.elements.cat;
    const cat = new Scavenger();
    cat.set_position({x: 400, y:500});
    console.log(this.item_pool);

    cat.sprite.width  = 50;
    cat.sprite.width  = 50;
    cat.sprite.height = 100;
    cat.route.exit = exit_point;
    cat.set_enemy(this.player);

    cat.scavenge.load_pool(this.item_pool);

    this.elements.furnishing.forEach(data => {
      Element_Factory.generate_tiled(data);

      console.log(data);
    });

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

    this.elements.exit_pad.forEach(data => {
      const pad = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
    });

    cat.logic_start();

  }
}

module.exports = {
  Old_Man_Room,
};

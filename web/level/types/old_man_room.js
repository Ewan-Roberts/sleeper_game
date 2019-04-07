'use strict';

const { Level        } = require('../level_model');
const { Tiled_Data   } = require('../attributes/parse_tiled_data');
const { Trigger_Pad  } = require('../elements/pad');
const { Background   } = require('../elements/background');
const { Wall         } = require('../elements/wall');
const { Candle       } = require('../../light/types/candle');
const { Scripted_NPC } = require('../../character/archetypes/neutral');

const { Element_Factory } = require('../elements/elements_factory');

const level_data  = require('../data/old_man_room.json');

class Old_Man_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');
    this.old_man    = new Scripted_NPC();

    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();
    this.player.set_position({x:700, y:600});

    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);

    const { exit_point } = this.elements.cat;
    const { prey       } = this.elements;
    const old_man_data = prey[0];

    this.old_man.set_position(old_man_data);
    this.old_man.sprite.width  = 50;
    this.old_man.sprite.width  = 50;
    this.old_man.sprite.height = 100;
    this.old_man.route.exit = exit_point;
    this.old_man.set_enemy(this.player);

    this.old_man.scavenge.load_pool(this.item_pool);

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
      const light  = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    this.elements.exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
    });

    this.create_grid();
    this.old_man.logic_start();
  }
}

module.exports = {
  Old_Man_Room,
};

'use strict';

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Rat           } = require('../../character/archetypes/rat');
const { Phone         } = require('../elements/phone');
const { Level_Factory } = require('./level_factory');

const level_data = require('../data/school_room.json');

class School_Room extends Level  {
  constructor(player) {
    super();
    this.name     = 'school_room';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    const {prey, exit_pad, grid} = this.elements;
    global.set_light_level(0.4);

    Level_Factory.generate(this.player, this.elements);

    const mouse = new Rat();
    mouse.enemy(this.player);
    mouse.set_position(prey[0]);

    const phone = new Phone({image_name: 'phone_00'});
    phone.set_position({x: 800, y: 810});
    phone.width = 200;
    phone.height= 200;

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
      if(data.properties) {
        pad.area.events.once('trigger', () => {
          Level_Factory.clear();

          Level_Factory.create(data.properties, this.player);
        });
        return;
      }

      // Fire once (event) to load in enemies
      pad.area.events.once('trigger', () => {
        mouse.logic_start();
      });
    });

    this.create_grid(grid);
  }
}

module.exports = {
  School_Room,
};

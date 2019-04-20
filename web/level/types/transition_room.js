'use strict';

const { Level      } = require('../level_model');
const { Background  } = require('../elements/background');
const { Camera      } = require('../../engine/camera');

const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Lighter     } = require('../../light/types/lighter');
const { Element_Factory } = require('../elements/elements_factory');
const { Trigger_Pad  } = require('../elements/pad');
const level_data  = require('../data/transition_room.json');
const { Level_Factory } = require('./level_factory');

class Transition_Room extends Level  {
  constructor(player) {
    super();
    this.name         = 'school_room';

    this.player       = player;
    this.elements     = new Tiled_Data(level_data);
    this.lighter      = new Lighter();
    this.camera       = new Camera();

    this._set_elements();
  }

  _set_elements() {
    const {walls, exit_pad, background, furnishing, lights, player} = this.elements;

    global.set_light_level(0.9);

    this.background = new Background(background, true);

    this.player.set_position(player);
    this.camera.set_center(player);

    walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.rotation = (data.rotation * (Math.PI/180));

      wall.set_position(data);
    });

    furnishing.forEach(data => {
      Element_Factory.generate_tiled(data);
    });

    lights.forEach(async data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
      light.start_flickering();
    });

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
      pad.area.events.on('trigger', () => {
        Level_Factory.clear();
        Level_Factory.generate(data.properties.level_name, this.player);
      });
    });
  }
}

module.exports = {
  Transition_Room,
};


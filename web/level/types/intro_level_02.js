'use strict';

const { Background  } = require('../elements/background');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Wall        } = require('../elements/wall');
const { Camera      } = require('../../engine/camera');
const { Candle      } = require('../../light/types/candle');
const { Element_Factory } = require('../elements/elements_factory');
const { Trigger_Pad  } = require('../elements/pad');
const level_data  = require('../data/intro_room_level_2.json');

class Items_Room_level_2  {
  constructor(player) {
    this.name         = 'intro';
    this.player       = player;
    this.elements     = new Tiled_Data(level_data);
    this.camera       = new Camera();

    this._set_elements();
  }

  _set_elements() {
    const {walls, exit_pad, player,background, furnishing, lights } = this.elements;
    global.set_light_level(0.9);

    this.player.set_position(player);
    this.camera.set_center(player);
    this.background = new Background(background,true);

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
        const { Level_Factory } = require('./level_factory');
        Level_Factory.clear();
        Level_Factory.generate(data.properties.level_name, this.player);
      });
    });

  }
}

module.exports = {
  Items_Room_level_2,
};

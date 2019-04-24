'use strict';
const { visual_effects_container } = require('../../engine/pixi_containers');

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

class Simple extends Level  {
  constructor(player, properties) {
    super();
    this.name = properties.level_name;

    global.set_light_level(0.9);

    let level_data;
    // TODO manage this dynamically
    if(properties.level_name === 'truck') {
      level_data = require('../data/truck.json');
    }

    if(properties.level_name === 'apartment') {
      level_data = require('../data/apartment.json');
    }

    if(properties.level_name === 'light') {
      level_data = require('../data/lights_room.json');

      player.light.candle.set_position(player);
      player.light.candle.start_flickering();
      // TODO wheb you clear a level it removes the light
      // this is a shit hack to put it back in
      // think about moving the player light into
      // the player container
      visual_effects_container.addChild(player.light.candle.sprite);
      visual_effects_container.addChild(player.light.candle.shadow);

      global.set_light_level(0.5);
    }

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {

    const {exit_pad} = this.elements;

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);

      // Fire once (event) to load in enemies
      pad.area.events.once('trigger', () => {
        Level_Factory.clear();
        Level_Factory.create(data.properties, this.player);
      });
    });

    Level_Factory.generate(this.player, this.elements);
  }
}

module.exports = {
  Simple,
};

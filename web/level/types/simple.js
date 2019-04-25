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

    let level_data;
    // TODO manage this dynamically
    if(properties.level_name === 'apartment') {
      level_data = require('../data/apartment.json');
    }

    if(properties.level_name === 'light') {
      level_data = require('../data/lights_room.json');
      visual_effects_container.addChild(player.light.candle.sprite);
      visual_effects_container.addChild(player.light.candle.shadow);
      global.set_light_level(0.5);
    }

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.9);
    const {exit_pad, player} = this.elements;
    this.player.set_position(player[0]);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);
      pad.area.events.once('trigger', () => {
        Level_Factory.create(data.properties, this.player);
      });
    });

    Level_Factory.generate(this.player, this.elements);
  }
}

module.exports = {
  Simple,
};

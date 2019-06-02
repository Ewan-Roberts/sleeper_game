'use strict';
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');

class Simple {
  constructor(properties) {
    this.name = properties.level_name;
    console.log('no simple maps');
    this.level_data;
    // if(properties.level_name === 'apartment') {
    //   this.level_data = require('../data/apartment.json');
    // }

    this._set_elements();
  }

  _set_elements() {
    const elements = new Tiled_Data(this.level_data);
    const { exit_pad, player } = elements;

    const player_character= new Player();
    player_character.set_position(player[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, player_character));

    Level_Factory.generate(elements);
  }
}

module.exports = {
  Simple,
};

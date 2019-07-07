const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');
const { Camera        } = require('../../engine/camera');
const { Trigger_Pad   } = require('../elements');
const { Floor         } = require('../elements');

class Simple_Room {
  constructor(level_name) {
    this.name   = 'simple_room';
    this.player = new Player();
    //const name  = `../data/${level_name}.json`;
    //TODO

    if(level_name === 'ranbir_flat_0'){
      this.data = require('../data/ranbir_flat_0.json');
    }

    if(level_name === 'ranbir_flat_1'){
      this.data = require('../data/ranbir_flat_1.json');
    }

    if(level_name === 'ranbir_flat_2'){
      this.data = require('../data/ranbir_flat_2.json');
    }

    if(level_name === 'ranbir_flat'){
      this.data = require('../data/ranbir_flat.json');
    }


    this._set_elements();
    if(global.env === 'dev') this._set_dev_settings();
  }

  _set_elements() {
    Level_Factory.generate(this.data);

    this.player.position.copy(this.data.player_spawn[0]);
    Camera.set_center(this.data.player_spawn[0]);
    this.data.exit_pad.forEach(data => new Trigger_Pad(data, this.player));
  }

  _set_dev_settings() {
    this.player.vitals.speed = 30;
  }
}

module.exports = {
  Simple_Room,
};


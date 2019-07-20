const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');
const { Viewport    } = require('pixi-viewport');
const { Trigger_Pad   } = require('../elements');
const { env           } = require('../../../config');

class Simple_Room {
  constructor() {
    this.name   = 'simple_room';
    this.player = new Player();
    //const name  = `../data/${level_name}.json`;
    //TODO
    this._set_elements();
    if(env.dev) this._set_dev_settings();
  }

  _set_elements() {
    Level_Factory.generate(this.data);

    this.player.position.copy(this.data.player_spawn[0]);
    Viewport.moveCenter(this.data.player_spawn[0]);
    this.data.exit_pad.forEach(data => new Trigger_Pad(data, this.player));
  }

  _set_dev_settings() {
  }
}

module.exports = {
  Simple_Room,
};


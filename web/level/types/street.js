'use strict';

const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Background    } = require('../../view/overlay_object');
const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');
const { Trigger_Pad   } = require('../elements/pad');
const level_data        = require('../data/home_street.json');

class Street {
  constructor() {
    this.name     = 'home_street';
    this.player   = new Player();
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);

    const { exit_pad, player, prey } = this.elements;

    const background = new Background(player[0]);
    background.fade_out(500);

    this.player.set_position(player[0]);

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ path, time: 20000, turn: true});
      }

      return new Crow({path});
    });
    characters.forEach(({tween}) => tween.start());

    exit_pad.forEach(pad => new Trigger_Pad(pad, this.player));
  }
}

module.exports = {
  Street,
};

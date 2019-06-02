'use strict';

const { collisions    } = require('../../engine/pixi_containers');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Background    } = require('../../view/overlay_object');
const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');

class Street {
  constructor() {
    this.name   = 'home_street';

    this._set_elements();
  }

  _set_elements() {
    const player_character= new Player();

    const level_data = require('../data/home_street.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    console.log(level_data);
    const { Trigger_Pad } = require('../elements/pad');
    const { exit_pad, player, prey } = elements;

    const background = new Background();
    background.set_position(player[0]);
    background.fade_out(500);

    player_character.set_position(player[0]);

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ path, time: 20000, turn: true});
      }

      return new Crow({path});
    });
    characters.forEach(({tween}) => tween.start());

    const dumpster = collisions.children.find(item => item.id === 460);
    dumpster.tint = 0xd3d3d3;

    exit_pad.forEach(data => new Trigger_Pad(data, player_character));
  }
}

module.exports = {
  Street,
};

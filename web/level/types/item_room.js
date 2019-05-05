'use strict';

const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Click_Pad     } = require('../elements/click_pad');

class Items_Room {
  constructor(player) {
    this.name   = 'item_room';
    this.player = player;

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);
    const level_data = require('../data/items_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, click_pad, player } = elements;

    this.player.set_position(player[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ path, time: 20000, turn: true});
      }

      return new Crow({path});
    });

    click_pad.forEach(data => {
      const pad  = new Click_Pad(data);

      if(data.id === 200) {
        pad.click = () => characters.forEach(({tween}) => tween.start());
      }

      if(data.id === 184) {
        pad.click = async () => {
          //const lamp_light = level_lights.find(elems => elems.id === 188);
          //lamp_light.intensity = 5;
          //await lamp_light.strike.fast();
        };
      }
    });
  }
}

module.exports = {
  Items_Room,
};

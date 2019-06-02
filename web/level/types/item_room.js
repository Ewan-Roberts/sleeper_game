'use strict';

const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Click_Pad     } = require('../elements/click_pad');
const { Shrine        } = require('../elements/shrine');
const { Player        } = require('../../character/archetypes/player');

class Items_Room {
  constructor() {
    this.name   = 'item_room';

    this._set_elements();
  }

  _set_elements() {
    const player_character = new Player();

    const level_data = require('../data/items_room.json');
    const elements = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { prey, exit_pad, click_pad, player } = elements;

    player_character.set_position(player[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, player_character));

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ id: npc.id = 200, path, time: 20000, turn: true});
      }

      return new Crow({path});
    });
    const areas = click_pad.map(data => new Click_Pad(data));

    const button_left = areas.find(({id}) => id === 200);
    button_left.click = () => characters.forEach(({tween}) => tween.start());

    const furnace = new Shrine(click_pad[0]);
    furnace.click = () => {
      const result = player_character.inventory.take_items('blood');
      furnace.give_blood(...result);
      if(furnace.enough_blood) {
        characters.forEach(({tween}) => tween.start());
      }
    };

    const button_right = areas.find(({id}) => id === 217);
    button_right.click = () => {
      // const result = this.player.inventory.take_items('blood');
      // if(result.length > 1) console.log('ppoppp');
      // console.log(this.player);
      // console.log(result);
    };

  }
}

module.exports = {
  Items_Room,
};

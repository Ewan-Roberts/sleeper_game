'use strict';

const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Click_Pad     } = require('../elements/click_pad');
const { Shrine        } = require('../elements/shrine');
const { Player        } = require('../../character/archetypes/player');
const level_data        = require('../data/items_room.json');

class Items_Room {
  constructor() {
    this.name     = 'item_room';
    this.player   = new Player();
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);
    const { prey, exit_pad, click_pad, player } = this.elements;

    this.player.position.copy(player[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));

    const characters = prey.map(npc => {
      const path = npc.polyline.map(({x,y})=>({x:npc.x+x, y:npc.y+y}));

      if(npc.name === 'zombie') {
        return new Lurcher({ id: npc.id = 200, path, time: 20000, turn: true});
      }

      return new Crow({path});
    });
    const areas = click_pad.map(data => new Click_Pad(data));

    const button_left = areas.find(({id}) => id === 200);
    button_left.click = () => {

      const crow = new Lurcher(prey[0]);
      crow.path = prey[0].polyline.map(({x,y})=>({x:prey[0].x+x, y:prey[0].y+y}));
      crow.turn = true;
      crow.draw();
      crow.start();
    };

    const furnace = new Shrine(click_pad[0]);
    furnace.click = () => {
      const result = this.player.inventory.take_items('blood');
      furnace.give_blood(...result);
      if(furnace.enough_blood) {
        characters.forEach(({tween}) => tween.start());
      }
    };
  }
}

module.exports = {
  Items_Room,
};

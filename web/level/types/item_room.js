'use strict';

//const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Click_Pad     } = require('../elements/click_pad');
const { Shrine        } = require('../elements/shrine');
const { Player        } = require('../../character/archetypes/player');

class Items_Room {
  constructor() {
    this.name     = 'item_room';
    this.player   = new Player();
    this.elements = require('../data/items_room.json');

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);
    const { prey, exit_pad, click_pad, player } = this.elements;

    this.player.position.copy(player[0]);

    exit_pad.forEach(data => new Trigger_Pad(data, this.player));

    const areas = click_pad.map(data => new Click_Pad(data));

    const button_left = areas.find(({id}) => id === 200);

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

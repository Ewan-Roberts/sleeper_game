const { Level_Factory } = require('./level_factory');
const { Player        } = require('../../character/archetypes/player');

class ItemsRoom {
  constructor() {
    this.name     = 'item_room';
    this.player   = new Player();
    this.elements = require('../data/items_room.json');

    this._set_elements();
  }

  _set_elements() {
    Level_Factory.generate(this.elements);
  }
}

module.exports = {
  ItemsRoom,
};

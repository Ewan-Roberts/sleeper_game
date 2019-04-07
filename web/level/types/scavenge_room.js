'use strict';

const { Level       } = require('../level_model');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Item_Pool   } = require('../attributes/item_pool');
const { Trigger_Pad } = require('../elements/pad');
const { Background  } = require('../elements/background');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Scavenger   } = require('../../character/archetypes/scavenger');

const { Element_Factory } = require('../elements/elements_factory');

const level_data  = require('../data/tiled_room.json');

class Scavenge_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');
    this.item_pool  = new Item_Pool();

    this.chest      = Element_Factory.generate('chest');
    this.chest1     = Element_Factory.generate('chest');
    this.chest2     = Element_Factory.generate('chest');

    this.cat       = new Scavenger();
    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();

    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);

    this.chest.set_position({x: 1400, y: 300});
    this.chest.loot.populate();

    this.chest1.set_position({x: 1500, y: 700});
    this.chest1.loot.populate();

    this.chest2.set_position({x: 800, y: 900});
    this.chest2.loot.populate();

    this.item_pool.load(this.chest1);
    this.item_pool.load(this.chest2);
    this.item_pool.load(this.chest);

    const { exit_point } = this.elements.cat;
    this.cat.set_position({x: 400, y:500});

    this.cat.sprite.width  = 50;
    this.cat.sprite.height = 100;
    this.cat.route.exit = exit_point;
    this.cat.set_enemy(this.player);
    this.cat.scavenge.load_pool(this.item_pool);
    this.elements.walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.set_position(data);
    });

    this.elements.lights.forEach(data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
    });

    this.elements.exit_pad.forEach(data => {
      const pad = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);
    });

    this.create_grid();
    cat.logic_start();
  }
}

module.exports = {
  Scavenge_Room,
};

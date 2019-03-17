'use strict';

const { Level      } = require('../level_model');
const { Tiled_Data } = require('../attributes/parse_tiled_data');
const { Item_Pool  } = require('../attributes/item_pool');
const { Trigger_Pad } = require('../elements/pad');
const { Background } = require('../elements/background');
const { Wall       } = require('../elements/wall');
const { Chest      } = require('../elements/chest');
const { Candle     } = require('../../light/types/candle');
const { Cat        } = require('../../character/archetypes/cat');
const level_data  = require('../data/tiled_room.json');
const level_tiled = require('../data/tiled_room_tiled.json');

class Scavenge_Room extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');
    this.item_pool  = new Item_Pool();

    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();

    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    this.chest = new Chest();
    this.chest.set_position({x: 1400, y: 300});
    this.chest.loot.populate();

    this.chest1 = new Chest();
    this.chest1.set_position({x: 1500, y: 700});
    this.chest1.loot.populate();

    this.chest2 = new Chest();
    this.chest2.set_position({x: 800, y: 900});
    this.chest2.loot.populate();

    this.item_pool.load(this.chest1);
    this.item_pool.load(this.chest2);
    this.item_pool.load(this.chest);

    const { exit_point } = this.elements.cat;
    const cat = new Cat();
    cat.set_position({x: 400, y:500});

    this.item_pool.shortest_by_distance_to(cat.sprite);

    // const foo = this.item_pool.closest_item_to(cat.sprite);
    // console.log(foo);
    // this.item_pool.load(foo);

    cat.sprite.width  = 50;
    cat.sprite.width  = 50;
    cat.sprite.height = 100;
    cat.route.exit = exit_point;
    cat.set_enemy(this.player);
    cat.scavenge.load_pool(this.item_pool);
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

    cat.logic_start();

  }
}

module.exports = {
  Scavenge_Room,
};

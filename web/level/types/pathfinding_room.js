'use strict';

const { Level       } = require('../level_model');

const { Level_Utils } = require('../level_utils');

const { Player      } = require('../../character/types/player');
const { Rat         } = require('../../character/archetypes/rat');
const { Archer      } = require('../../character/archetypes/archer');
const { Background  } = require('../../level/attributes/background');

class Pathfind_Room extends Level {
  constructor() {
    super();
    this.name        = 'pathfinding_room';

    this.player      = new Player();
    this.rat         = new Rat();
    this.archer      = new Archer();

    this.background  = new Background('debug_room');
    this.tiled_data  = require('../data/debug_map_output.json');
    this.tiled_tiles = require('../data/debug_map_tiles.json');

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(1);

    this.player.set_position({ x: 1000, y: 400});
    this.player.inventory.add_ranged_weapon_by_name('dev_bow');
    this.player.inventory.add_melee_weapon_by_name('rusty_knife');
    this.player.inventory.equip_weapon_by_name('dev_bow');

    this.background.alpha = 0.2;
    this.background.set_position({ x: 1000, y: 800});
    this.background.width  = this.tiled_tiles.imagewidth;
    this.background.height = this.tiled_tiles.imageheight;

    //TODO this needs to be abstracted
    const debug_room = new Level_Utils();
    debug_room.add_to_segments(this.background.sprite);
    debug_room.render_walls(this.tiled_data.layers[1].objects);
    debug_room.create_grid(this.tiled_tiles);

    this.rat.set_position({x: 900, y: 1100});
    this.rat.animation.switch('move');
    this.rat.enemy(this.player);
    this.rat.logic_start();

    this.archer.set_position({x: 1400, y: 1100});
    this.archer.enemy(this.rat);
    this.archer.logic_start();
  }
}

module.exports = {
  Pathfind_Room,
};

'use strict';

const { Level       } = require('../level_model');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Trigger_Pad } = require('../elements/pad');
const { Background  } = require('../elements/background');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Scavenger   } = require('../../character/archetypes/scavenger');

const { Element_Factory } = require('../elements/elements_factory');
const level_data  = require('../data/tiled_room.json');
const level_tiled = require('../data/tiled_room_tiled.json');

class Tiled_Prey_Path extends Level {
  constructor(player) {
    super();
    this.name       = 'tiled_room';

    this.player     = player;
    this.elements   = new Tiled_Data(level_data);
    this.background = new Background('grid_floor');
    this.chest      = Element_Factory.generate('chest');

    this._set_elements();
  }

  async _set_elements() {
    global.set_light_level(1);
    this.player.light.hide();

    console.log(this.elements);
    this.background.set_position({x: 1100, y: 800});
    this.background.alpha = 0.5;

    this.add_to_segments(this.background.sprite);
    this.create_grid(level_tiled);

    this.chest.set_position({x: 1400, y: 300});
    this.chest.loot.populate();
    this.chest.loot.show();
    const chest_items = this.chest.loot.items;

    //TODO Rename cat to scavener
    const { entity, exit_point, route } = this.elements.cat;
    const cat = new Scavenger();
    cat.sprite.width  = 50;
    cat.sprite.height = 100;
    cat.route.exit = exit_point;
    cat.set_enemy(this.player);

    cat.tween.path_smoothness = 100;
    cat.tween.add_path(route[0].path);
    cat.tween.time = 2000;
    cat.tween.delay = 2000;
    cat.tween.show = true;
    cat.tween.draw_path();

    cat.tween.movement.on('end', () => {
      cat.tween.add_path(route[1].path);
      cat.tween.chain();

      cat.tween.time  = 1000;
      cat.tween.delay = 1000;
      cat.loot.take_items(chest_items);
    });

    cat.tween.movement.on('end', () => {
      cat.tween.add_path(route[2].path);
      cat.tween.chain();

      cat.tween.time  = 1000;
      cat.tween.delay = 1000;
    });

    cat.tween.movement.on('end', () => {
      cat.tween.add_path(route[1].path);
      cat.tween.chain();

      cat.tween.time  = 1000;
      cat.tween.delay = 1000;
    });

    cat.tween.start();
    cat.logic_start();
    cat.set_position(entity);

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
  }
}

module.exports = {
  Tiled_Prey_Path,
};
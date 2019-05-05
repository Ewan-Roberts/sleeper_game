'use strict';
const { visual_effects_container } = require('../../engine/pixi_containers');
const { Text          } = require('pixi.js');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

class Transition_Room {
  constructor(player) {
    this.name   = 'transition_room';
    this.player = player;

    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.8);
    const level_data = require('../data/transition_room.json');
    const elements   = new Tiled_Data(level_data);
    Level_Factory.generate(elements);

    const { exit_pad, player } = elements;
    this.player.set_position(player[0]);

    exit_pad.forEach(data => {
      new Trigger_Pad(data, this.player);
      const {properties, x, y, width, height} = data;

      const level_names = new Text(
        properties.level_name,{fontSize: 40, fill: 'grey'}
      );

      level_names.x = x + width/4;
      level_names.y = y + height/2;

      visual_effects_container.addChild(level_names);
    });

    const level_text = new Text(
      'THE HUB',
      {
        fontSize: 100,
        fill:     'grey',
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 8,
        dropShadowDistance: 10,
      }
    );

    level_text.x = player[0].x -150;
    level_text.y = player[0].y -50;

    visual_effects_container.addChild(level_text);
  }
}

module.exports = {
  Transition_Room,
};


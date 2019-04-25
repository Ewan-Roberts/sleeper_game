'use strict';
const PIXI = require('pixi.js');

const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');

const { visual_effects_container } = require('../../engine/pixi_containers');
const level_data = require('../data/transition_room.json');

class Transition_Room extends Level  {
  constructor(player) {
    super();
    this.name     = 'transition_room';
    this.player   = player;
    this.elements = new Tiled_Data(level_data);
    this._set_elements();
  }

  _set_elements() {
    global.set_light_level(0.9);
    const {exit_pad, player} = this.elements;

    Level_Factory.generate(this.player, this.elements);
    this.player.set_position(player[0]);

    exit_pad.forEach(data => {
      const pad = new Trigger_Pad(data);
      const {properties} = data;
      pad.area.events.once('trigger', () => {
        Level_Factory.create(properties, this.player);
      });

      const level_names = new PIXI.Text(
        properties.level_name,{fontSize: 40, fill: 'grey'}
      );

      level_names.x = data.x + data.width/4;
      level_names.y = data.y + data.height/2;

      visual_effects_container.addChild(level_names);
    });

    const level_text = new PIXI.Text(
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


'use strict';

const { Tween         } = require('../../engine/tween');
const { generate_crow } = require('../../effects/click_events');
const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Click_Pad     } = require('../elements/click_pad');

const level_data  = require('../data/items_room.json');

class Items_Room extends Level {
  constructor(player) {
    super();
    this.name     = 'item_room';

    this.player   = player;
    this.elements = new Tiled_Data(level_data);

    this._set_elements();
  }

  _set_elements() {
    const {exit_pad, click_pad, player} = this.elements;
    global.set_light_level(0.9);

    const { level_lights, level_collision } = Level_Factory.generate(this.player, this.elements);

    this.player.set_position(player[0]);
    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad(data);
      pad.area.events.once('trigger', () => {
        Level_Factory.create(data.properties, this.player);
      });
    });
    click_pad.forEach(data => {
      const pad  = new Click_Pad(data);
      if(data.id === 200) {
        pad.click = () => generate_crow({
          from: {x: 2000, y: 1800},
          to:   {x: 3000, y: 1000},
        });
      }

      if(data.id === 184) {
        pad.click = async () => {
          // TODO Abstract and move to click events
          global.set_light_level(0.3);
          const lamp_light = level_lights.find(elems => elems.id === 188);
          lamp_light.intensity = 5;
          await lamp_light.strike.fast();

          const dumpster = level_collision.find(elems => elems.id === 199);

          const sprite_tween = new Tween(dumpster.sprite);
          const shadow_tween = new Tween(dumpster.shade);
          sprite_tween.from(dumpster.sprite);
          shadow_tween.from(dumpster.sprite);
          sprite_tween.to({
            x: dumpster.sprite.x-400,
            y: dumpster.sprite.y-200,
            rotation: 2,
          });

          shadow_tween.to({
            x: dumpster.sprite.x-400,
            y: dumpster.sprite.y-200,
            rotation: 2,
          });

          sprite_tween.time = 944000;
          shadow_tween.time = 944000;
          sprite_tween.start();
          shadow_tween.start();
        };
      }
    });
  }
}

module.exports = {
  Items_Room,
};

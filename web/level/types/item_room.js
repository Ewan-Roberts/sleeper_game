'use strict';

const { Tween         } = require('../../engine/tween');
const { Level         } = require('../level_model');
const { Tiled_Data    } = require('../attributes/parse_tiled_data');
const { Trigger_Pad   } = require('../elements/pad');
const { Level_Factory } = require('./level_factory');
const { Crow        } = require('../../character/archetypes/crow');
//const { Candle      } = require('../../light/types/candle');
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
    const {exit_pad, click_pad} = this.elements;
    global.set_light_level(0.9);

    const { level_lights, level_collision } = Level_Factory.generate(this.player, this.elements);

    exit_pad.forEach(data => {
      const pad  = new Trigger_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);

      // Fire once (event) to load in enemies
      pad.area.events.once('trigger', () => {
        Level_Factory.clear();

        Level_Factory.create(data.properties, this.player);
      });
    });
    click_pad.forEach(data => {
      const pad  = new Click_Pad();
      pad.height = data.height;
      pad.width  = data.width;
      pad.anchor = 0;
      pad.set_position(data);


      console.log('wrwr');
      console.log(data);
      if(data.id === 200) {
        pad.click = () => {

          console.log('ifwfwfwe');
          const bird = new Crow();
          bird.animation.move();
          bird.animation.sprite.play();
          bird.tween.from({x: 2000, y: 1800});
          bird.tween.to({x: 3000, y: 1000});
          bird.tween.time = 10000;
          bird.tween.start();

        };

      }

      if(data.id === 184) {
        pad.click = async () => {
          global.set_light_level(0.3);
          const lamp_light = level_lights.find(elems => elems.id === 188);

          lamp_light.intensity = 5;
          await lamp_light.strike.fast();
          console.log(level_collision);
          const dumpster = level_collision.find(elems => elems.id === 199);
          const tween_it = new Tween(dumpster.sprite, dumpster.shade);
          tween_it.no_path_from(dumpster.sprite);
          tween_it.no_path_to({
            x: dumpster.sprite.x - 400,
            y:dumpster.sprite.y-200,
            rotation: 2,
          });
          tween_it.no_path_time = 944000;
          tween_it.no_path_start();

        };
      }


    });

  }
}

module.exports = {
  Items_Room,
};

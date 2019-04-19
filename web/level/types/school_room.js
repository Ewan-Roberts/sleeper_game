'use strict';

const { Level      } = require('../level_model');
const { Background  } = require('../elements/background');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Lighter     } = require('../../light/types/lighter');
const { Element_Factory } = require('../elements/elements_factory');
const { Rat        } = require('../../character/archetypes/rat');
const level_data  = require('../data/school_room.json');

class School_Room extends Level  {
  constructor(player) {
    super();
    this.name         = 'school_room';

    this.player       = player;
    this.elements     = new Tiled_Data(level_data);
    this.lighter      = new Lighter();

    this._set_elements();
  }

  _set_elements() {
  }

  async start() {

    const {prey, walls, background, furnishing, lights} = this.elements;
    global.set_light_level(0.9);

    this.background = new Background(background, true);

    this.player.set_position({x: 600, y: 500});

    walls.forEach(data => {
      const wall  = new Wall();
      wall.shadow = true;
      wall.height = data.height;
      wall.width  = data.width;
      wall.anchor = 0;
      wall.rotation = (data.rotation * (Math.PI/180));

      wall.set_position(data);
    });

    furnishing.forEach(data => {
      Element_Factory.generate_tiled(data);
    });

    prey.forEach(data => {
      const prey = new Rat();
      prey.enemy(this.player);
      prey.logic_start();
      prey.set_position(data);
    });

    lights.forEach(async data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
      light.start_flickering();
    });


    this.create_grid(background);
  }
}

module.exports = {
  School_Room,
};

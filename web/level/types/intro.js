'use strict';

const { sleep       } = require('../../utils/time');
const { Background  } = require('../elements/background');
const { Tiled_Data  } = require('../attributes/parse_tiled_data');
const { Camera      } = require('../../engine/camera');
const { Wall        } = require('../elements/wall');
const { Candle      } = require('../../light/types/candle');
const { Lighter     } = require('../../light/types/lighter');
const { Lantern    } = require('../../light/types/lantern');
const { Element_Factory } = require('../elements/elements_factory');
const level_data  = require('../data/intro_room.json');

class Intro  {
  constructor(player) {
    this.name         = 'intro';
    this.player       = player;
    this.elements     = new Tiled_Data(level_data);
    this.lighter      = new Lighter();

    this.camera       = new Camera();
    this.lantern      = new Lantern();

    this._set_elements();
  }

  _set_elements() {
    this.player.tween.from({ x: 1000, y: 400 });
    this.player.tween.to({ x: 1080, y: 410 });
    this.player.tween.smooth();

    this.lantern.set_position(800, 100);
    this.lantern.tween.add_path([
      {x: 1000, y: 100},
      {x: 1250, y: 140},
      {x: 1450, y: 100},
      {x: 1650, y: 120},
      {x: 1951, y: 110},
      {x: 2551, y: 110},
    ]);
    this.lantern.range = 700;

    this.lighter.set_position({ x: 1115, y: 410 });
  }
  async start() {

    const {walls, background, furnishing, lights} = this.elements;
    global.set_light_level(0.9);
    this.camera.tween.from({ x: -120, y: -150 });
    this.camera.tween.to({ x: -100,  y: -120 });
    this.camera.tween.to({ x: -600, y: 200 });
    this.camera.tween.smooth();

    this.player.keyboard.disable();

    this.background = new Background(background,true);

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

    lights.forEach(async data => {
      const light = new Candle();
      light.height = data.height;
      light.width  = data.width;
      light.set_position(data);
      light.start_flickering();
    });

    this.lighter.hide();

    this.camera.tween.time = 1000;
    this.camera.tween.start();

    this.lantern.tween.time = 10000;
    this.lantern.tween.start();
    this.lantern.tween.movement.on('end', () => {
      this.lantern.remove();
    });

    this.player.tween.time = 1000;
    this.player.tween.start();

    this.player.tween.movement.on('update', () => {
      this.player.light.set_position(this.player.sprite);
    });

    this.player.keyboard.enable();
    this.lighter.strike.start();
  }
}

module.exports = {
  Intro,
};

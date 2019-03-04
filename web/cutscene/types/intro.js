'use strict';

const { Lantern      } = require('../../effects/light/types/lantern');
const { Sun          } = require('../../effects/light/types/sun');
const { Lighter      } = require('../../effects/light/types/lighter');
const { Candle       } = require('../../effects/light/types/candle');
const { Ambient      } = require('../../effects/light/types/ambient');
const { Player       } = require('../../character/types/player');
const { Camera       } = require('../../engine/camera');
const { sleep        } = require('../../engine/time');
const { Background   } = require('../../level/level_model');
const { Wall         } = require('../../items/types/wall');
const { Chest        } = require('../../items/types/chest');

class Intro {
  constructor() {
    this.name           = 'intro';

    this.player         = new Player();
    this.background     = new Background('debug_room');
    this.camera         = new Camera();

    this.top_left_wall  = new Wall();
    this.top_right_wall = new Wall();
    this.right_wall     = new Wall();
    this.middle_wall    = new Wall();
    this.left_pole      = new Wall();
    this.right_pole     = new Wall();
    this.box            = new Chest();

    this.wall_candle    = new Candle();
    this.table_candle   = new Candle();
    this.lantern        = new Lantern();
    this.sun            = new Sun();
    this.ambient        = new Ambient();
    this.lighter        = new Lighter();
  }

  // sets the elements in the Scene but wont start anything
  _set_elements() {
    this.background.set_position({x: 1100, y: 500});

    this.player.set_position({x: 1000, y: 400});
    this.player.animation.weapon = 'knife';
    this.player.animation.idle();

    this.player.tween.from({ x: 1000, y: 400 });
    this.player.tween.to({ x: 1080, y: 410 });
    this.player.tween.smooth();

    this.top_left_wall.set_position({ x: 900, y:250 });
    this.top_left_wall.shadow = true;

    this.top_right_wall.set_position({ x: 1300, y:252 });
    this.top_right_wall.shadow = true;
    this.top_right_wall.width = 300;

    this.right_wall.set_position({ x: 1450, y: 393 });
    this.right_wall.shadow = true;
    this.right_wall.rotation = 1.57;

    this.middle_wall.set_position({ x: 1150, y: 342 });
    this.middle_wall.shadow = true;
    this.middle_wall.width = 200;
    this.middle_wall.rotation = 1.57;

    this.right_pole.shadow = true;
    this.right_pole.set_position({ x: 1125, y:250 });
    this.right_pole.rotation = 1.07;
    this.right_pole.width  = 15;
    this.right_pole.height = 5;

    this.left_pole.shadow = true;
    this.left_pole.set_position({ x: 1080, y:242 });
    this.left_pole.width = 10;
    this.left_pole.height = 5;

    this.camera.tween.from({ x: -120, y: -150 });
    this.camera.tween.to({ x: -100,  y: -120 });
    this.camera.tween.to({ x: 0, y: -100 });
    this.camera.tween.smooth();

    this.lantern.set_position(800, 100);
    this.lantern.tween.add_path([
      {x: 1000, y: 100},
      {x: 1250, y: 140},
      {x: 1450, y: 130},
      {x: 1650, y: 120},
      {x: 1951, y: 110},
      {x: 2551, y: 110},
    ]);

    this.box.set_position({ x: 950, y: 480 });
    this.box.shadow = true;
    this.box.height = 25;
    this.box.width = 50;
    this.box.rotation = 1.1;

    this.table_candle.set_position({ x: 915, y: 510 });

    this.wall_candle.set_position({ x: 1115, y: 410 });
    this.lighter.set_position({ x: 1115, y: 410 });
    this.sun.set_position({ x: 1141, y: 0 });
  }

  async start() {
    global.set_light_level(0.4);

    this.player.keyboard.can_move = false;

    this.wall_candle.hide();
    this.table_candle.hide();
    this.lighter.hide();

    this.sun.show();
    this.sun.fade.in(0.05, 0.3);

    this.ambient.fade_in(0.005, 0.05);

    this.camera.tween.time = 11000;
    this.camera.tween.start();

    this.lantern.tween.time = 10000;
    this.lantern.tween.start();
    this.lantern.tween.movement.on('end', () => {
      this.lantern.remove();
    });

    this.player.tween.time = 6000;
    this.player.tween.start();

    await sleep(6000);
    this.lighter.strike.start();

    global.set_light_level(0.15);

    await sleep(2500);
    this.wall_candle.show();
    this.wall_candle.start_flickering();

    await sleep(2500);
    this.table_candle.show();
    this.table_candle.start_flickering();

    this.player.keyboard.can_move = true;
  }
}

module.exports = {
  Intro,
};

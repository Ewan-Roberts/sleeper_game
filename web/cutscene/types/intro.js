'use strict';

const { Lantern    } = require('../../light/types/lantern');
const { Sun        } = require('../../light/types/sun');
const { Lighter    } = require('../../light/types/lighter');
const { Candle     } = require('../../light/types/candle');
const { Ambient    } = require('../../light/types/ambient');
const { Player     } = require('../../character/types/player');
const { Camera     } = require('../../engine/camera');
const { sleep      } = require('../../engine/time');

const { Background } = require('../../level/attributes/background');
const { Wall       } = require('../../level/attributes/wall');
const { Chest      } = require('../../level/attributes/chest');

class Intro {
  constructor() {
    this.name            = 'intro';

    this.player          = new Player();
    this.background      = new Background('debug_room');
    this.camera          = new Camera();

    this.top_left_wall   = new Wall();
    this.down_left_wall  = new Wall();
    this.top_right_wall  = new Wall();
    this.down_right_wall = new Wall();
    this.right_wall      = new Wall();
    this.left_wall       = new Wall();
    this.middle_wall     = new Wall();
    this.left_pole       = new Wall();
    this.right_pole      = new Wall();
    this.box             = new Chest();

    this.wall_candle     = new Candle();
    this.table_candle    = new Candle();
    this.lantern         = new Lantern();
    this.sun             = new Sun();
    this.ambient         = new Ambient();
    this.lighter         = new Lighter();
  }

  // sets the elements in the Scene but wont start anything
  _set_elements() {
    this.background.set_position({x: 1100, y: 500});

    this.player.set_position({x: 1000, y: 400});
    this.player.sprite.scale.set(0.5);

    this.player.animation.weapon = 'knife';
    this.player.animation.idle();

    this.player.tween.from({ x: 1000, y: 400 });
    this.player.tween.to({ x: 1080, y: 410 });
    this.player.tween.smooth();

    this.top_left_wall.set_position({ x: 910, y:250 });
    this.top_left_wall.shadow = true;
    this.top_left_wall.height = 40;

    this.down_left_wall.set_position({ x: 910, y:753 });
    this.down_left_wall.shadow = true;
    this.down_left_wall.height = 40;

    this.down_right_wall.set_position({ x: 1340, y:755});
    this.down_right_wall.shadow = true;
    this.down_right_wall.width  = 325;
    this.down_right_wall.height = 40;

    this.top_right_wall.set_position({ x: 1325, y:255 });
    this.top_right_wall.shadow = true;
    this.top_right_wall.height = 40;
    this.top_right_wall.width = 350;

    this.right_wall.set_position({ x: 1485, y: 493 });
    this.right_wall.shadow = true;
    this.right_wall.height = 40;
    this.right_wall.width  = 500;
    this.right_wall.rotation = 1.57;

    this.left_wall.set_position({ x: 780, y: 493 });
    this.left_wall.shadow = true;
    this.left_wall.height = 40;
    this.left_wall.width  = 500;
    this.left_wall.rotation = 1.57;

    this.middle_wall.set_position({ x: 1150, y: 345});
    this.middle_wall.shadow = true;
    this.middle_wall.height = 40;
    this.middle_wall.width  = 220;
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
    this.camera.tween.to({ x: -300, y: 100 });
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

    this.box.set_position({ x: 920, y: 400 });
    this.box.shadow = true;
    this.box.height = 25;
    this.box.width = 50;
    this.box.rotation = 1.1;

    this.table_candle.set_position({ x: 910, y: 540 });
    this.wall_candle.set_position({ x: 1115, y: 410 });
    this.lighter.set_position({ x: 1115, y: 410 });
    this.sun.set_position({ x: 1141, y: 0 });
  }

  async start() {
    // global.set_light_level(0.4);

    this.player.keyboard.can_move = false;
    this.player.keyboard.move.on('event', () => {
      this.player.light.set_position(this.player.sprite);
    });

    this.wall_candle.hide();
    this.table_candle.hide();
    this.lighter.hide();

    this.sun.show();
    this.sun.fade.in(0.05, 0.8);

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

    this.player.tween.movement.on('update', () => {
      this.player.light.set_position(this.player.sprite);
    });

    await sleep(6000);
    this.lighter.strike.start();

    await sleep(2500);
    this.wall_candle.show();
    this.wall_candle.start_flickering();
    this.player.animation.state_to = 'candle';
    await sleep(2500);
    // this.table_candle.show();
    // this.table_candle.start_flickering();

    this.player.keyboard.can_move = true;
  }
}

module.exports = {
  Intro,
};

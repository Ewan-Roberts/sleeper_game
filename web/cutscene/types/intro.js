'use strict';
const PIXI = require('pixi.js');

// const { Dev_Light            } = require('../../effects/light/types/development');
const { Lantern              } = require('../../effects/light/types/lantern');
const { Sun                  } = require('../../effects/light/types/sun');
const { Lighter              } = require('../../effects/light/types/lighter');
const { Candle               } = require('../../effects/light/types/candle');
const { Ambient              } = require('../../effects/light/types/ambient');
const { Cutscene_NPC         } = require('../../character/types/npc');
const { background_container } = require('../../engine/pixi_containers');
const { Camera               } = require('../../engine/camera');
const { sleep                } = require('../../engine/time');
const { Wall                 } = require('../../items/types/wall');

class Intro {
  constructor() {
    this.player         = new Cutscene_NPC();
    this.player2        = new Cutscene_NPC();
    this.background     = PIXI.Sprite.fromFrame('debug_room');
    this.candle_stick   = new Candle();

    this.top_left_wall  = new Wall();
    this.top_right_wall = new Wall();
    this.right_wall     = new Wall();

    this.left_pole      = new Wall();
    this.right_pole     = new Wall();
    this.camera         = new Camera();
    this.lantern        = new Lantern();
    this.sun            = new Sun();
    this.ambient        = new Ambient();
    this.lighter        = new Lighter();
  }

  // sets the elements in the Scene but wont start anything
  _set_elements() {
    this.background.anchor.set(0.5);
    this.background.position.set(1100, 500);
    background_container.addChild(this.background);

    this.player.set_position({x: 1000, y: 400});
    this.player.animation.weapon = 'knife';
    this.player.animation.idle();

    this.top_left_wall.set_position({ x: 900, y:250 });
    this.top_left_wall.shadow = true;

    this.top_right_wall.set_position({ x: 1300, y:252 });
    this.top_right_wall.shadow = true;
    this.top_right_wall.width = 300;

    this.right_wall.set_position({ x: 1450, y: 400 });
    this.right_wall.shadow = true;
    this.right_wall.rotation = 1.57;

    this.right_pole.shadow = true;
    this.right_pole.set_position({ x: 1135, y:255 });
    this.right_pole.rotation = 1.07;
    this.right_pole.width  = 15;
    this.right_pole.height = 5;

    this.left_pole.shadow = true;
    this.left_pole.set_position({ x: 1080, y:242 });
    this.left_pole.width = 10;
    this.left_pole.height = 5;

    this.camera.tween.from({ x: -120, y: -150 });
    this.camera.tween.to({ x: -100,  y: -120 });
    this.camera.tween.to({ x: 120, y: -100 });
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

    this.candle_stick.set_position({ x: 1040, y: 400 });

    this.sun.set_position({ x: 1141, y: 0 });

    this.lighter.set_position({ x: 1040, y: 400 });
  }

  async start() {
    // global.set_light_level(0.4);
    this.sun.show();
    this.sun.fade.in(0.05, 0.4);

    this.ambient.fade_in(0.005, 0.1);

    this.camera.tween.time = 13000;
    this.camera.tween.start();

    this.candle_stick.show();
    this.lantern.tween.time = 10000;
    this.lantern.tween.start();
    this.lantern.tween.movement.on('end', () => {
      this.lantern.remove();
    });

    await sleep(6000);
    this.lighter.strike.start();
    this.sun.show();
    await sleep(2500);
    this.candle_stick.start_flickering();
  }
}

module.exports = {
  Intro,
};

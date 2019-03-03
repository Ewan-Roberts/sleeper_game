'use strict';
const PIXI = require('pixi.js');

const { Dev_Light            } = require('../../effects/light/types/development');
const { Lighter              } = require('../../effects/light/types/lighter');
const { Candle               } = require('../../effects/light/types/candle');
const { Cutscene_NPC         } = require('../../character/types/npc');
const { background_container } = require('../../engine/pixi_containers');
const { Camera               } = require('../../engine/camera');
const { Wall                 } = require('../../items/types/wall');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

class Intro {
  constructor() {
    this.player         = new Cutscene_NPC();
    this.player2        = new Cutscene_NPC();
    this.background     = PIXI.Sprite.fromFrame('debug_room');
    this.candle_stick   = new Candle();
    this.top_left_wall  = new Wall();
    this.top_right_wall = new Wall();
    this.left_pole      = new Wall();
    this.right_pole     = new Wall();
    this.camera         = new Camera();
    this.lantern_light  = new Dev_Light();
    this.pocket_lighter = new Lighter();
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

    this.top_right_wall.set_position({ x: 1400, y:252 });
    this.top_right_wall.shadow = true;

    this.left_pole.shadow = true;
    this.left_pole.set_position({ x: 1200, y:252 });
    this.left_pole.width  = 10;
    this.left_pole.height = 5;

    this.right_pole.shadow = true;
    this.right_pole.set_position({ x: 1100, y:242 });
    this.right_pole.width = 10;
    this.right_pole.height = 5;

    this.camera.tween.from({ x: -120, y: -150 });
    this.camera.tween.to({ x: -100,  y: -120 });
    this.camera.tween.to({ x: 120, y: -100 });
    this.camera.tween.smooth();

    this.lantern_light.set_position(800, 100);
    this.lantern_light.tween.add_path([
      {x: 1100, y: 100},
      {x: 1250, y: 140},
      {x: 1450, y: 130},
      {x: 1650, y: 120},
      {x: 1951, y: 110},
      {x: 2551, y: 110},
    ]);

    this.candle_stick.set_position({ x: 1040, y: 400 });
    this.candle_stick.shadow.alpha = 0.2;
    this.candle_stick.shadow.range = 150;
    this.candle_stick.shadow.intensity = 0.4;

    this.pocket_lighter.set_position({ x: 1040, y: 400 });
  }

  async start() {
    global.set_light_level(0.4);

    this.camera.tween.time = 13000;
    this.camera.tween.start();

    this.lantern_light.tween.time = 10000;
    this.lantern_light.tween.start();

    await sleep(6000);

    this.pocket_lighter.strike.start();

    await sleep(2500);

    this.candle_stick.start_flickering();
  }
}

module.exports = {
  Intro,
};

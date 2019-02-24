'use strict';
const PIXI = require('pixi.js');

const {
  // lantern,
  dev_light,
  candle,
} = require('./light');

const { Cutscene_NPC   } = require('../character/types/cutscene_npc');
const { background_container } = require('../engine/pixi_containers');
const { world  } = require('../engine/shadows');
const { tween  } = require('../engine/tween');
const { Camera } = require('./camera');

function create_wall(x, y) {
  const wall_texture = PIXI.Texture.fromImage('black_dot');
  wall_texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const wall = new PIXI.Sprite(wall_texture);
  wall.parentGroup = PIXI.shadows.casterGroup;
  wall.position.set(x, y);
  wall.width = 300;
  wall.height = 20;
  wall.anchor.set(0.5);

  const wall1 = new PIXI.Sprite(wall_texture);
  wall1.position.copy(wall);
  wall1.width = 300;
  wall1.height = 20;
  wall1.anchor.set(0.5);

  background_container.addChild(wall, wall1);
}

function create_bit(x, y) {
  const wall_texture = PIXI.Texture.fromImage('black_dot');
  wall_texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const wall = new PIXI.Sprite(wall_texture);
  wall.parentGroup = PIXI.shadows.casterGroup;
  wall.position.set(x, y);
  wall.width = 10;
  wall.height = 5;
  wall.anchor.set(0.5);

  const wall1 = new PIXI.Sprite(wall_texture);
  wall1.position.copy(wall);
  wall1.width = 10;
  wall1.height = 5;
  wall1.anchor.set(0.5);

  background_container.addChild(wall, wall1);
}

class intro_cutscene {
  static start() {
    const player = new Cutscene_NPC();
    player.set_position({x: 1000, y: 400});
    player.animation.weapon = 'knife';
    player.animation.idle();

    const background = PIXI.Sprite.fromFrame('debug_room');
    background.anchor.set(0.5);
    background.position.set(1100, 500);
    background_container.addChild(background);

    create_wall(900, 250);
    create_bit(1200, 252);
    create_bit(1100, 248);
    create_wall(1400, 250);

    //TODO All very dependent without
    const lantern_light = new dev_light();
    lantern_light.set_position(800, 100);

    lantern_light.tween = new tween(lantern_light.sprite);
    lantern_light.tween.add_path([
      {x: 1100, y: 100},
      {x: 1250, y: 140},
      {x: 1450, y: 130},
      {x: 1650, y: 120},
      {x: 1951, y: 110},
    ]);

    lantern_light.tween.show();
    lantern_light.tween.start(10000);
    lantern_light.flicker();
    lantern_light.tween.movement.on('end', () => {
      lantern_light.remove();
    });


    const lighter = new candle();
    lighter.set_position(1040, 400);
    lighter.wait(8000);

    const camera = new Camera();
    camera.set_position(100, 100);
    camera.tween = new tween(camera.sprite);
    camera.tween.add_path([
      {x: -50, y:  50},
      {x: -50, y:  50},
      {x:  50, y: -50},
      {x:  50, y: -50},
    ]);

    camera.tween.show();
    camera.tween.start(7000);

    world.on('pointermove', event => {
      const mouse_position = event.data.getLocalPosition(world);

      lantern_light.set_position(mouse_position.x, mouse_position.y);
    });
  }
}







// class intro_cutscene {
//   static start() {
//     const dialog_dom = new Caption_Dialog();
//     const dialog_canvas = new Dialog();
//     visual_effects.fade_screen_to_black_at_point({ x: 300, y:200 });

//     const player = viewport.getChildByName('player');
//     player.position.set(300,200);

//     const cutscene_character = new Cutscene_Character(200, 300);

//     const bystander = new Cutscene_Character(100, 600);
//     bystander.facing('up');

//     const bystander_1 = new Cutscene_Character(200, 500);
//     bystander_1.facing('right');

//     const bystander_2 = new Cutscene_Character(280, 500);
//     bystander_2.facing('left');

//     dialog_canvas.render_text(150, 400, 'Lorium ipsum', 25);

//     cutscene_character.sprite.move_to_point(1200, 300);
//     move_sprite_to_point(player, {middle: {x:1200, y: 200}});

//     dialog_dom.play_audio_track('/test_speech.wav');
//     dialog_dom.hide();
//     dialog_dom.render_text(lorium_text);
//   }
// }

module.exports = {
  intro_cutscene,
};

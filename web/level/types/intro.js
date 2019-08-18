const { visuals         } = require('../../engine/pixi_containers');
const { sound, filters  } = require('pixi.js');
const { keyboardManager } = require('pixi.js');

const { renderer   } = require('../../engine/app.js');
const { Click_Pad  } = require('../elements/click_pad');
const { Button     } = require('../../view/button');
const { players    } = require('../../engine/pixi_containers');
const { Tween      } = require('../../engine/tween');
const { viewport   } = require('../../engine/app');
const { FadeSprite } = require('../../effects/fade_sprite.js');
const { flash_at   } = require('../../effects/fade_sprite.js');
const { env        } = require('../../../config');

const {
  Trigger_Pad,
  Wall,
  Decal,
  Background,
  Chest,
  Roof,
  Door,
  Shroud,
  Collision,
  Floor,
  Generator,
} = require('../elements');

const white_filter = new filters.ColorMatrixFilter();
white_filter.greyscale(3);

class IntroRoom {
  constructor() {
    this.name   = 'intro_room';
    this.data   = require('../data/intro_room.json');
    this.player = players.children[0];

    this.backgrounds = this.data.background.map(data => new Background(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.items       = this.data.item.map(data => new Chest(data));
    this.generator   = new Generator(this.data.generator[0]);

    this.study_desk  = this.items.find(item => item.id === 303);
    this.locked_door = this.doors.find(door => door.id === 528);
    this.study_door  = this.doors.find(door => door.id === 527);
    this.main_room_shroud = this.shrouds.find(shroud => shroud.id === 462);
    this.dumpster = this.collisions.find(item => item.id === 524);
    this.spear    = this.items.find(item => item.id === 601);

    this._set_sounds();
    this._set_elements();
    this._set_cutscene();
    if(env.dev) this._set_dev_settings();
  }

  _set_cutscene() {
    this.intro_fade = flash_at(this.player, 5000);

    const hand = new FadeSprite(this.data.white_hands[0]);
    hand.filters = [white_filter];
    hand.fade_in_wait_out(100, 500, 4000);
    visuals.addChild(hand);

    keyboardManager.disable();
    setTimeout(() => keyboardManager.enable(), 5000);
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.01;

    this.keys_effect = sound.find('keys_jingle');
    this.keys_effect.volume = 0.2;
  }

  _set_elements() {
    renderer.backgroundColor = 0x000000;
    this.theme_song.play();

    this.player.position.copy(this.data.player_spawn.find(spawn=>spawn.id===137));
    viewport.moveCenter(this.player.x, this.player.y);

    this.study_desk.on('click', () => {
      this.keys_effect.play();
      this.study_door.interactive = true;
      this.study_desk.interactive = false;
      this.study_desk.button.destroy();
    });

    this.study_door.on('click', () => {
      this.main_room_shroud.fade_out_destroy();
      this.locked_door.interactive = true;
    });

    this.generator.on('click', () => {
      const poo = this.player.inventory.take_item('gas_canister');
      this.generator.inventory.give_item(poo);
    });

    this.locked_door.on('click', () => {
      this.locked_door.interactive = false;
      this.locked_door.button.destroy();
    });

    const pad_data = this.data.click_pad[0];
    const pad = new Click_Pad(pad_data);
    const button = new Button(pad, pad_data);
    pad.on('mouseover', () => {
      this.dumpster.tint = 0xffffff;
    });

    pad.on('mouseout', () => {
      this.dumpster.tint = 0xd3d3d3;
    });

    pad.interactive = false;

    this.spear.click = () => {
      pad.interactive = true;
    };

    pad.on('click', () => {
      const tween_it = new Tween(this.dumpster);
      tween_it.to({x: this.dumpster.x - 45, y:this.dumpster.y - 20});
      tween_it.time = 1000;
      tween_it.start();
      button.destroy();
      pad.interactive = false;
    });
  }

  _set_dev_settings() {
    this.player.position.copy(this.data.player_spawn[1]);
    viewport.moveCenter(this.player.x, this.player.y);

    this.theme_song.volume = 0;
    this.theme_song.stop();

    this.study_door.position.x   += 30;
    this.study_door.interactive  = true;
    this.locked_door.interactive = true;
    this.intro_fade.visible = false;
    keyboardManager.enable();
  }
}

module.exports = {
  IntroRoom,
};

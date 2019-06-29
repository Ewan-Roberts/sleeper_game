'use strict';
const { collisions, visuals } = require('../../engine/pixi_containers');
const { sound, filters } = require('pixi.js');

const { Camera        } = require('../../engine/camera');
const { renderer      } = require('../../engine/app.js');
const { Lurcher       } = require('../../character/archetypes/zombie');
const { Crow          } = require('../../character/archetypes/crow');
const { Click_Pad     } = require('../elements/click_pad');
const { Button        } = require('../../view/button');
const { Player        } = require('../../character/archetypes/player');
const { Tween         } = require('../../engine/tween');
const { Level_Factory } = require('./level_factory');
//const { pulse_sprites  } = require('../../effects/fade_sprite.js');
const { FadeSprite  } = require('../../effects/fade_sprite.js');
const { flash_at    } = require('../../effects/fade_sprite.js');

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
} = require('../elements');

const white_filter = new filters.ColorMatrixFilter();
white_filter.greyscale(3);

//global.dev();
class Intro {
  constructor() {
    this.name   = 'intro_room';
    this.data   = require('../data/intro_room.json');
    this.player = new Player();

    renderer.backgroundColor = 0x000000;
    this.dumpster_moved = false;

    this.backgrounds = this.data.background.map(data => new Background(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.items       = this.data.item.map(data => new Chest(data));

    this.hand = new FadeSprite(this.data.white_hands[0]);
    this.hand.filters = [white_filter];
    visuals.addChild(this.hand);

    this._set_sounds();
    this._set_elements();
    if(global.env === 'dev') this._set_dev_settings();
  }

  _set_sounds() {
    this.theme_song = sound.find('start_theme');
    this.theme_song.volume = 0.01;

    this.keys_effect = sound.find('keys_jingle');
    this.keys_effect.volume = 0.2;
  }

  _set_elements() {
    this.theme_song.play();

    this.player.position.copy(this.data.player_spawn[0]);
    Camera.set_center(this.data.player_spawn[0]);

    const study_desk  = this.items.find(item => item.id === 303);
    const locked_door = this.doors.find(door => door.id === 528);
    const study_door  = this.doors.find(door => door.id === 527);
    const main_room_shroud = this.shrouds.find(shroud => shroud.id === 462);

    study_desk.click = () => {
      this.keys_effect.play();
      study_door.interactive = true;
      study_desk.interactive = false;
    };

    study_door.click = () => {
      main_room_shroud.fade_out_destroy();
      locked_door.interactive = true;
    };

    this.hand.fade_in_wait_out();
    flash_at(this.player, 400);
    const dumpster = this.collisions.find(item => item.id === 524);
    dumpster.tint = 0xd3d3d3;

    const pad_data = this.data.click_pad[0];
    const pad = new Click_Pad(pad_data);
    const button = new Button(pad_data.properties);
    button.set_position(pad_data);

    pad.on('mouseover', () => {
      dumpster.tint = 0xffffff;
      button.visible = true;
    });
    pad.on('mouseout', () => {
      dumpster.tint = 0xd3d3d3;
      button.visible = false;
    });
    console.log(pad);
    pad.click = () => {
      console.log('33333333');
      if(pad.number_clicks === 3) return;
      const tween_it = new Tween(dumpster);
      tween_it.to({x: dumpster.x - 15, y:dumpster.y - 20});
      tween_it.time = 1000;
      tween_it.start();
      // characters.forEach(({tween}) => tween.start());
      // TODO move into Button logic
      pad.number_clicks++;
      this.dumpster_moved = true;
    };
  }

  _set_dev_settings() {
    renderer.backgroundColor = 0x0066CC;
    this.player.vitals.speed = 30;
    this.theme_song.volume = 0;
    this.theme_song.stop();
  }
}

module.exports = {
  Intro,
};

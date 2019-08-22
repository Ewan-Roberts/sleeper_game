const { visuals } = require('../../engine/pixi_containers');

const { sound, filters  } = require('pixi.js');
const { keyboardManager } = require('pixi.js');
const { Sprite } = require('pixi.js');
const { Texture } = require('pixi.js');

const { renderer   } = require('../../engine/app.js');
const { Click_Pad  } = require('../elements/click_pad');
const { Button     } = require('../../view/button');
const { Caption    } = require('../../view/caption');
const { players    } = require('../../engine/pixi_containers');
const { Tween      } = require('../../engine/tween');
const { viewport   } = require('../../engine/app');
const { FadeSprite } = require('../../effects/fade_sprite.js');
const { flash_at   } = require('../../effects/fade_sprite.js');
const { env        } = require('../../../config');
const { random_bound } = require('../../utils/math.js');
const { sleep    } = require('../../utils/time.js');
const { ProgressBar   } = require('../../view/progress_bar');

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

const event = require('events');

class Lamp extends Collision {
  constructor(data) {
    super(data);
    this.cast_light = new Sprite(Texture.fromImage('LightStone_green30_kpl'));
    this.cast_light.height = 250;
    this.cast_light.width  = 250;
    this.cast_light.alpha  = 0.5;
    this.cast_light.anchor.set(0.4, 0.6);
    this.cast_light.position.copy(this);
    this.events = new event();

    visuals.addChild(this.cast_light);
    this._textures();
    this._random_flickering();
    this.turn_off();
  }

  turn_on() {
    this.state              = true;
    this.texture            = this.lamp_on_texture;
    this.cast_light.visible = true;
    this.events.emit('on');
  }

  turn_off() {
    this.state              = false;
    this.texture            = this.lamp_off_texture;
    this.cast_light.visible = false;
    this.events.emit('off');
  }

  flicker_for(milliseconds) {
    this.flicker_running = true;

    setTimeout(() => {
      this.flicker_running = false;
    }, milliseconds);

    this._flicker();
  }

  _random_flickering() {
    const randomiser = random_bound(8000, 40000);

    setInterval(async () => {
      if (!this.state) return;
      this.turn_off();
      await sleep(random_bound(10, 150));
      this.turn_on();

    }, randomiser);
  }

  // recursive
  async _flicker() {
    // breaks recursion
    if(!this.flicker_running) return;

    const randomiser = random_bound(10, 30);
    this.turn_on();

    await sleep(randomiser+400);
    this.turn_off();

    await sleep(randomiser);
    this.turn_on();

    await sleep(randomiser*2);
    this.turn_off();

    await sleep(randomiser**2);
    this.turn_on();

    this._flicker();
  }

  _textures() {
    this.lamp_on_texture = Texture.fromImage('MI01_FurnitureFloorLampOn_05x05[lamp, floor lamp, lamp on, lamp turned on, standing lamp, upright lamp, room lamp]');
    this.lamp_off_texture = Texture.fromImage('MI01_FurnitureFloorLampOff_05x05[lamp, floor lamp, lamp off, lamp turned off, standing lamp, upright lamp, room lamp]');
  }
}


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
    this.lights      = this.data.lights.map(data => new Lamp(data));
    this.generator   = new Generator(this.data.generator[0]);

    this.bedroom_light       = this.lights.find(light => light.id === 615);
    this.living_room_light   = this.lights.find(light => light.id === 614);
    this.kitchen_light       = this.lights.find(light => light.id === 613);

    this.study_desk          = this.items.find(item => item.id === 303);
    this.locked_door         = this.doors.find(door => door.id === 528);

    this.study_door          = this.doors.find(door => door.id === 527);
    this.study_door_light    = this.decals.find(shroud => shroud.id === 606);
    this.main_room_shroud    = this.shrouds.find(shroud => shroud.id === 462);

    this.bedroom_shroud      = this.shrouds.find(shroud => shroud.id === 617);
    this.bathroom_door       = this.doors.find(door => door.id === 590);
    this.bathroom_shroud     = this.shrouds.find(shroud => shroud.id === 464);
    this.bathroom_door_light = this.decals.find(shroud => shroud.id === 609);

    this.kitchen_shroud      = this.shrouds.find(shroud => shroud.id === 463);

    this.exit_door           = this.doors.find(door => door.id === 619);
    this.dumpster            = this.collisions.find(item => item.id === 524);
    this.spear               = this.items.find(item => item.id === 601);
    this.key                 = this.items.find(item => item.id === 618);

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

    this.dramatic_beat = sound.find('dramatic_beat');
    this.dramatic_beat.volume = 0.3;

    this.keys_effect = sound.find('keys_jingle');
    this.keys_effect.volume = 0.2;
  }

  _set_elements() {
    renderer.backgroundColor = 0x000000;
    this.theme_song.play();

    this.player.position.copy(this.data.player_spawn.find(spawn=>spawn.id===137));
    viewport.moveCenter(this.player.x, this.player.y);

    this.bedroom_shroud.alpha = 1;
    this.bedroom_shroud.fade_out(6000);

    const start_lights_fade_in = () => {
      //this.study_door_light.destroy();
      this.locked_door.interactive = true;
      this.main_room_shroud.fade_out(3000);
      this.kitchen_shroud.fade_out(4000);
      this.bedroom_light.flicker_for(1200);

      // this.bedroom_light.events.on('on', () => this.bedroom_shroud.alpha = 0);
      // this.bedroom_light.events.on('off', () => this.bedroom_shroud.alpha = 0.2);

      this.living_room_light.flicker_for(3000);
      this.living_room_light.events.on('on', () => this.main_room_shroud.alpha = 0);
      this.living_room_light.events.on('off', () => this.main_room_shroud.alpha = 0.2);

      this.kitchen_light.flicker_for(800);
      this.kitchen_light.events.on('on', () => this.kitchen_shroud.alpha = 0);
      this.kitchen_light.events.on('off', () => this.kitchen_shroud.alpha = 0.2);
    };

    //start_lights_fade_in();
    this.study_door.once('click', () => {
      Caption.render('The generator is almost out of fuel. There is a car to the North');
      start_lights_fade_in();
    });

    this.key.click = () => console.log(this.player.inventory);

    this.exit_door.lock();
    this.exit_door.click = () => {
      const keys_for_door = this.player.inventory.take_item('keys_brass');
      if(keys_for_door) {
        this.exit_door.unlock().open();
      }
    };

    this.bathroom_door.once('click', () => {
      this.bathroom_shroud.fade_out();
      this.bathroom_door_light.destroy();
    });

    this.generator.click = () => {
      if(this.player.inventory.contains('oil_canister')) {
        const fuel_item = this.player.inventory.take_item('oil_canister');
        keyboardManager.disable();
        ProgressBar.show();

        this.generator.fuel = fuel_item.condition;
        ProgressBar.to_percentage(fuel_item.condition);
      }
    };

    ProgressBar.complete(() => {
      Caption.render('The fuel tank is empty.');
      this.generator.ready();
      keyboardManager.enable();
    });

    this.generator.end(() => {
      this.bedroom_light.turn_off();
      this.living_room_light.turn_off();
      this.kitchen_light.turn_off();
      this.kitchen_shroud.alpha   = 0.5;
      this.main_room_shroud.alpha = 0.5;
      this.bedroom_shroud.alpha   = 0.5;
      this.bathroom_shroud.alpha  = 0.8;
    });

    this.locked_door.lock();
    this.locked_door.once('click', () => {
      this.locked_door.interactive = false;
      Caption.render('I cant get in');
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
      this.dramatic_beat.play();
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

    this.study_door.position.x   += 40;
    this.study_door.interactive  = true;
    this.locked_door.interactive = true;
    this.intro_fade.visible = false;
    keyboardManager.enable();
  }
}

module.exports = {
  IntroRoom,
};

const { World } = require('../../engine/pixi_containers');
const { sleep           } = require('../../utils/time.js');
const { random_bound    } = require('../../utils/math.js');
const { Sprite, Texture } = require('pixi.js');
const { Element         } = require('./model');
const event = require('events');

class Shine extends Sprite {
  constructor() {
    super(Texture.fromImage('LightStone_green30_kpl'));
    this.height = 550;
    this.width  = 550;
    this.alpha  = 0.8;
    this.anchor.set(0.4, 0.6);
    World.add_to('visual', this, { 'cull_sprite': false });
  }
}

class Street_Lamp extends Element {
  constructor(data) {
    super(data);
    this.texture = Texture.fromImage('street_light_00');
    World.add_to('roof', this);
    this.cast_light = new Shine();
    this.cast_light.position.copy(this);
    this.cast_light.anchor.y = 1.25;
    this.cast_light.anchor.y = 0.9;
    this.cast_light.rotation = this.rotation;
    this.events = new event();
    this.turn_off();
  }

  turn_on() {
    if(this.state === true) {
      return;
    }
    this.state = true;
    this.cast_light.alpha = 0.3;
    this.events.emit('on');
  }

  turn_off() {
    if(this.state === false) {
      return;
    }
    this.state = false;
    this.cast_light.alpha = 0;
    this.events.emit('off');
  }

  flicker_for(milliseconds) {
    this.flicker_running = true;

    setTimeout(() => this.flicker_running = false, milliseconds);

    this._flicker();
  }

  async _flicker() {
    // breaks recursion
    if(!this.flicker_running) {
      return;
    }
    const randomiser = random_bound(10, 30);
    this.turn_on();

    await sleep(randomiser + 400);
    this.turn_off();

    await sleep(randomiser);
    this.turn_on();

    await sleep(randomiser * 2);
    this.turn_off();

    await sleep(randomiser ** 2);
    this.turn_on();

    this._flicker();
  }
}


class Light extends Element {
  constructor(data) {
    super(data);
    this.events = new event();

    this.cast_light = new Shine();
    this.cast_light.position.copy(this);

    World.add_to('item', this);
    World.add_to('visual', this.cast_light);

    this._textures();
    this._random_flickering();
    this.turn_off();
  }

  turn_on() {
    if(this.state === true) {
      return;
    }
    this.state            = true;
    this.texture          = this.lamp_on_texture;
    this.cast_light.alpha = 0.3;
    this.events.emit('on');
  }

  turn_off() {
    if(this.state === false) {
      return;
    }
    this.state            = false;
    this.texture          = this.lamp_off_texture;
    this.cast_light.alpha = 0;
    this.events.emit('off');
  }

  flicker_for(milliseconds) {
    this.flicker_running = true;

    setTimeout(() => this.flicker_running = false, milliseconds);

    this._flicker();
  }

  _random_flickering() {
    const randomiser = random_bound(8000, 40000);

    setInterval(async () => {
      if(!this.state) {
        return;
      }
      this.turn_off();
      await sleep(random_bound(10, 150));
      this.turn_on();

    }, randomiser);
  }

  async _flicker() {
    // breaks recursion
    if(!this.flicker_running) {
      return;
    }
    const randomiser = random_bound(10, 30);
    this.turn_on();

    await sleep(randomiser + 400);
    this.turn_off();

    await sleep(randomiser);
    this.turn_on();

    await sleep(randomiser * 2);
    this.turn_off();

    await sleep(randomiser ** 2);
    this.turn_on();

    this._flicker();
  }

  _textures() {
    this.lamp_on_texture = Texture.fromImage('MI01_FurnitureFloorLampOn_05x05[lamp, floor lamp, lamp on, lamp turned on, standing lamp, upright lamp, room lamp]');
    this.lamp_off_texture = Texture.fromImage('MI01_FurnitureFloorLampOff_05x05[lamp, floor lamp, lamp off, lamp turned off, standing lamp, upright lamp, room lamp]');
  }
}

module.exports = {
  Light,
  Street_Lamp,
};


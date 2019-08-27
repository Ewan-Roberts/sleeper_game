const { visuals } = require('../../engine/pixi_containers');
const { items } = require('../../engine/pixi_containers');
const { sleep    } = require('../../utils/time.js');
const { random_bound } = require('../../utils/math.js');
const { Sprite, Texture } = require('pixi.js');
const { Element   } = require('./model');
const event = require('events');

class Light extends Element {
  constructor(data) {
    super(data);
    this.cast_light = new Sprite(Texture.fromImage('LightStone_green30_kpl'));
    this.cast_light.height = 250;
    this.cast_light.width  = 250;
    this.cast_light.alpha  = 1;
    this.cast_light.anchor.set(0.4, 0.6);
    this.cast_light.position.copy(this);
    this.events = new event();

    items.addChild(this);
    visuals.addChild(this.cast_light);
    this._textures();
    this._random_flickering();
    this.turn_off();
  }

  turn_on() {
    if(this.state === true) return;
    this.state              = true;
    this.texture            = this.lamp_on_texture;
    this.cast_light = 1;
    this.events.emit('on');
  }

  turn_off() {
    if(this.state === false) return;
    this.state              = false;
    this.texture            = this.lamp_off_texture;
    this.cast_light = 0;
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


module.exports = {
  Light,
};


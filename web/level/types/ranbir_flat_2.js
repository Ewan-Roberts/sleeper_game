//const { Level_Factory } = require('./level_factory');
const { filters      } = require('pixi.js');
const { Player       } = require('../../character/archetypes/player');
const { Camera       } = require('../../engine/camera');
const { random_bound } = require('../../utils/math.js');
const { sleep        } = require('../../utils/time.js');
const { env          } = require('../../../config');

const {
  Wall,
  Decal,
  Door,
  Background,
  Chest,
  Roof,
  Shroud,
  Collision,
  Floor,
  Trigger_Pad,
} = require('../elements');

const colorMatrix = new filters.ColorMatrixFilter();
colorMatrix.autoFit = true;
colorMatrix.greyscale(4);

let flashed_hands = false;

async function flicker(light, hands) {
  const randomiser = random_bound(-10, 10);

  const randomiser2 = random_bound(-100, 100);

  light.alpha = 0;

  await sleep(1000+randomiser2);
  light.alpha = 0.7;

  await sleep(20+randomiser);
  light.alpha = 0;

  await sleep(15+randomiser);
  light.alpha = 0.7;

  await sleep(280+randomiser2);
  light.alpha = 0;

  await sleep(20+randomiser);
  light.alpha = 0.9;

  await sleep(200+randomiser);
  light.alpha = 0;

  if(!flashed_hands) {
    light.alpha = 1;
    await sleep(300);
    light.alpha = 0;
    const rendered_hands = hands.map(hand => {
      const unit = new Decal(hand);
      unit.filters = [colorMatrix];
      unit.alpha = 0.2;
      return unit;
    });
    flashed_hands = true;

    await sleep(200);
    light.alpha = 1;

    rendered_hands.forEach(hand => hand.destroy());
    await sleep(100);
  }

  light.alpha = 0;

  await sleep(9000+(randomiser2 ** 2));

  await flicker(light);
}

class Ranbir_Floor_2 {
  constructor() {
    this.name   = 'ranbir_flat_2';
    this.data   = require('../data/ranbir_flat_2.json');
    this.player = new Player();

    this.items       = this.data.item.map(data => new Chest(data));
    this.shrouds     = this.data.shroud.map(data => new Shroud(data));
    this.roofs       = this.data.roof.map(data => new Roof(data));
    this.backgrounds = this.data.background.map(data => new Background(data));
    this.walls       = this.data.walls.map(data => new Wall(data));
    this.doors       = this.data.door.map(data => new Door(data));
    this.exit_pad    = this.data.exit_pad.map(data => new Trigger_Pad(data, this.player));
    this.floors      = this.data.floor.map(data => new Floor(data));
    this.decals      = this.data.decal.map(data => new Decal(data));
    this.collisions  = this.data.collision.map(data => new Collision(data));

    this.light_shroud = this.shrouds.find(roof => roof.id === 594);

    this._set_elements();
    if(env.dev) this._set_dev_settings();
    this._start();
  }

  _set_elements() {
    this.player.position.copy(this.data.player_spawn[0]);
    Camera.set_center(this.data.player_spawn[0]);
  }

  async _start() {
    await flicker(this.light_shroud, this.data.hands);
  }

  _set_dev_settings() {
  }
}

module.exports = {
  Ranbir_Floor_2,
};

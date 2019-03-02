'use strict';
const PIXI = require('pixi.js');
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const { visual_effects_container } = require('../../engine/pixi_containers');
// const { world } = require('../../engine/shadows');

class Light {
  constructor() {
    this.shadow = new PIXI.shadows.Shadow(500);

    visual_effects_container.addChild(this.shadow);
  }

  add_component(component) { this[component.name] = component; }

  remove_component(name) { delete this[name]; }

  set_position({x, y}) { this.shadow.position.set(x, y); }

  remove() { visual_effects_container.removeChild(this.shadow); }

  add() { visual_effects_container.addChild(this.shadow); }

  async wait(time, callback)  {
    await sleep(time);

    callback();
  }
}

module.exports = {
  Light,
};


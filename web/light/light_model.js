'use strict';
const PIXI = require('pixi.js');

const { visual_effects_container } = require('../engine/pixi_containers');

class Light {
  constructor() {
    this.name   = 'light';

    this.shadow = new PIXI.shadows.Shadow(500);
    this.shadow.anchor.set(0.5);
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position({x, y}) {
    this.shadow.position.set(x, y);
  }

  set range(value) {
    this.shadow.range = value;
  }

  hide() {
    this.shadow.alpha = 0;
  }

  show() {
    this.shadow.alpha = 1;
  }

  remove() {
    visual_effects_container.removeChild(this.shadow);
  }

  add() {
    visual_effects_container.addChild(this.shadow);
  }
}

module.exports = {
  Light,
};


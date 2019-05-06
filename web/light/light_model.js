'use strict';
const PIXI = require('pixi.js');

const { visuals } = require('../engine/pixi_containers');

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

  set intensity(value) {
    this.shadow.intensity = value;
  }

  set anchor(value) {
    this.shadow.anchor.set(value);
  }

  set width(value) {
    this.shadow.width = value;
  }

  set range(value) {
    this.shadow.range = value;
  }

  set alpha(value) {
    this.shadow.alpha = value;
  }

  hide() {
    this.shadow.alpha = 0;
  }

  show() {
    this.shadow.alpha = 1;
  }

  remove() {
    visuals.removeChild(this.shadow);
  }

  add() {
    visuals.addChild(this.shadow);
  }
}

module.exports = {
  Light,
};


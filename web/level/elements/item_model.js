'use strict';
const { Sprite } = require('pixi.js');

class Item {
  constructor(data) {
    if(data.properties && data.properties.image_name) {
      this.sprite = new Sprite.fromFrame(data.properties.image_name);
      this.sprite.tint = data.properties.tint || 0xffffff;
    } else {
      this.sprite = new Sprite.fromFrame('bunny');
    }
    this.set_position(data);
    this.width     = data.width || 50;
    this.height    = data.height || 50;
    this.rotation  = data.rotation * (Math.PI/180) || 0;
    this.id        = data.id;
    this.sprite.id = data.id;
  }

  add_component(component) {
    this[component.name] = component;
  }

  set click(action) {
    this.sprite.interactive = true;
    this.sprite.buttonMode  = true;
    this.sprite.click = action;
  }

  remove_click() {
    this.sprite.interactive = false;
    this.sprite.buttonMode  = false;
  }

  set height(value) {
    this.sprite.height = value;
  }

  set tint(value) {
    this.sprite.tint = value;
  }

  set anchor(value) {
    this.sprite.anchor.set(value);
  }

  set width(value) {
    this.sprite.width = value;
  }

  set alpha(value) {
    this.sprite.alpha = value;
  }

  set rotation(value) {
    this.sprite.rotation = value;
  }

  set_position({x = 0, y = 0}) {
    this.sprite.position.set(x, y);
  }
}

module.exports = {
  Item,
};


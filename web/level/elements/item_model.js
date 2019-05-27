'use strict';
const { Sprite } = require('pixi.js');
const { collisions } = require('../../engine/pixi_containers');

class Item {
  constructor(data) {
    if(data.properties && data.properties.image_name) {
      this.sprite = new Sprite.fromFrame(data.properties.image_name);
    } else {
      this.sprite = new Sprite.fromFrame('bunny');
    }
    this.set_position(data);
    this.width     = data.width;
    this.height    = data.height;
    this.rotation  = data.rotation * (Math.PI/180);
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

  set_position({x, y}) {
    this.sprite.position.set(x, y);
  }
}

module.exports = {
  Item,
};


'use strict';
const PIXI = require('pixi.js');

const { collision_container } = require('../../engine/pixi_containers');

//TODO this needs to be the parent of the elements in this folder
class Item {
  constructor(name) {
    this.texture = PIXI.Texture.fromImage(name);
    this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.width  = 50;
    this.sprite.height = 50;
    this.sprite.anchor.set(0.5);
  }

  add_component(component) {
    this[component.name] = component;
  }

  set height(value) {
    this.sprite.height = value;

    if(this.shade) {
      this.shade.height = value;
    }
  }

  set anchor(value) {
    this.sprite.anchor.set(value);

    if(this.shade) {
      this.shade.anchor.set(value);
    }
  }

  set width(value) {
    this.sprite.width = value;

    if(this.shade) {
      this.shade.width = value;
    }
  }

  set alpha(value) {
    this.sprite.alpha = value;

    if(this.shade) {
      this.shade.alpha = value;
    }
  }


  set rotation(value) {
    this.sprite.rotation = value;

    if(this.shade) {
      this.shade.rotation = value;
    }
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    if(this.shade) {
      this.shade.position.set(x, y);
    }
  }

  set shadow(state) {
    if(!state && this.shade) {
      collision_container.removeChild(this.shade);
    }

    this.shade = new PIXI.Sprite(this.texture);
    this.shade.parentGroup = PIXI.shadows.casterGroup;
    this.shade.position.copy(this.sprite);
    this.shade.width = 300;
    this.shade.height = 20;
    this.shade.anchor.set(0.5);

    collision_container.addChild(this.shade);
  }
}

module.exports = {
  Item,
};


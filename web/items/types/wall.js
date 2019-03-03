'use strict';

const PIXI = require('pixi.js');

const { collision_container } = require('../../engine/pixi_containers');

class Wall {
  constructor() {
    this.wall_texture = PIXI.Texture.fromImage('black_dot');
    this.wall_texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.wall = new PIXI.Sprite(this.wall_texture);
    this.wall.width  = 300;
    this.wall.height = 20;
    this.wall.anchor.set(0.5);

    collision_container.addChild(this.wall);
  }

  set height(value) {
    this.wall.height = value;

    if(this.shade) {
      this.shade.height = value;
    }
  }

  set width(value) {
    this.wall.width = value;

    if(this.shade) {
      this.shade.width = value;
    }
  }

  set rotation(value) {
    this.wall.rotation = value;

    if(this.shade) {
      this.shade.rotation = value;
    }
  }

  set_position({x, y}) {
    this.wall.position.set(x, y);

    if(this.shade) {
      this.shade.position.set(x, y);
    }
  }

  set shadow(state) {
    if(!state && this.shade) {
      collision_container.removeChild(this.shade);
    }

    this.shade = new PIXI.Sprite(this.wall_texture);
    this.shade.parentGroup = PIXI.shadows.casterGroup;
    this.shade.position.copy(this.wall);
    this.shade.width = 300;
    this.shade.height = 20;
    this.shade.anchor.set(0.5);
    collision_container.addChild(this.shade);
  }
}

module.exports = {
  Wall,
};

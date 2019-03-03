'use strict';

const PIXI = require('pixi.js');

const { background_container } = require('../../engine/pixi_containers');

class Wall {
  constructor() {
    this.wall_texture = PIXI.Texture.fromImage('black_dot');
    this.wall_texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.wall = new PIXI.Sprite(this.wall_texture);
    this.wall.width  = 300;
    this.wall.height = 20;
    this.wall.anchor.set(0.5);

    background_container.addChild(this.wall);
  }

  set height(value) {
    this.wall.height = value;

    if(this.shadow) {
      this.shadow.height = value;
    }
  }

  set width(value) {
    this.wall.width = value;

    if(this.shadow) {
      this.shadow.width = value;
    }
  }

  set_position({x, y}) {
    this.wall.position.set(x, y);

    if(this.shadow) {
      this.shadow.position.set(x, y);
    }
  }

  with_shadow() {
    this.shadow = new PIXI.Sprite(this.wall_texture);

    this.shadow.parentGroup = PIXI.shadows.casterGroup;
    this.shadow.position.copy(this.wall);
    this.shadow.width = 300;
    this.shadow.height = 20;
    this.shadow.anchor.set(0.5);
    background_container.addChild(this.shadow);
  }
}

module.exports = {
  Wall,
};

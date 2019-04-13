'use strict';
const PIXI = require('pixi.js');
const { roof_container      } = require('../../engine/pixi_containers');
const { collision_container } = require('../../engine/pixi_containers');

const { Item } = require('./item_model');

class Tree extends Item {
  constructor(options) {
    super(options.image_name);

    this.sprite.fade_opacity = options.fade;

    roof_container.addChild(this.sprite);
  }

  set trunk(state) {
    if(state) {
      const tree_trunk = new PIXI.Sprite.fromImage('tree_stump_00');

      tree_trunk.position.copy(this.sprite);

      collision_container.addChild(tree_trunk);
    }
  }
}

module.exports = {
  Tree,
};

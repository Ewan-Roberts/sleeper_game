'use strict';

const { cutscene_container } = require('../../engine/pixi_containers');
const { Tween } = require('../../engine/tween');

const { Character    } = require('../character_model');
const { Human } = require('../animations/human');

class NPC extends Character {
  constructor() {
    super();
    this.name = 'npc';
    this.add_component(new Human(this));

    this.add_component(new Tween(this.sprite));

    cutscene_container.addChild(this.sprite);
  }
}

module.exports = {
  NPC,
};

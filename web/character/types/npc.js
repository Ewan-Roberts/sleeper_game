'use strict';

const { cutscene_container } = require('../../engine/pixi_containers');
const { Tween } = require('../../engine/tween');

const { Character  } = require('../character_model');
const { Human      } = require('../animations/character');

class Cutscene_NPC extends Character {
  constructor() {
    super();
    this.name = 'npc';
    this.sprite.name = 'npc';

    this.add_component(new Human(this.sprite));
    this.add_component(new Tween(this.sprite));

    cutscene_container.addChild(this.sprite);
  }
}

module.exports = {
  Cutscene_NPC,
};

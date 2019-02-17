'use strict';

const { cutscene_container } = require('../../engine/pixi_containers');
const { construct } = require('../../utils/constructor');

const { Character } = require('../character_model');
const { Cutscene  } = require('../attributes/cutscene');


class Cutscene_Character extends construct(Character, Cutscene) {
  constructor() {
    super();
    this.name = 'cutscene_npc';

    cutscene_container.addChild(this.sprite);
  }
}


module.exports = {
  Cutscene_Character,
};

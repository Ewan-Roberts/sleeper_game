'use strict';

const { viewport  } = require('../../engine/viewport');
const { construct } = require('../../engine/constructor');

const { Character } = require('../character_model');
const { Cutscene  } = require('../attributes/cutscene');

const cutscene_container = viewport.getChildByName('cutscene_container');

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

'use strict';

const viewport          = require('../../engine/viewport.js');
const { Character }     = require('../character_model');

class Cutscene_Character extends Character{
  constructor(x,y) {
    super();
    this.sprite.animation_switch('nothing', 'idle');
    this.sprite.name = 'cutscene_npc';
    this.sprite.position.set(x,y);
    this.sprite.move_to_point = this.move_to_point;
    viewport.getChildByName('cutscene_container').addChild(this.sprite);
  }

  facing(direction) {
    switch(direction) {
      case 'up':
        this.sprite.rotation = 4.17;
        return;
      case 'right':
        this.sprite.rotation = 0;
        return;
      case 'down':
        this.sprite.rotation = 1.57;
        return;
      case 'left':
        this.sprite.rotation = 3.14;
        return;
    }
  }

}

module.exports = {
  Cutscene_Character,
};

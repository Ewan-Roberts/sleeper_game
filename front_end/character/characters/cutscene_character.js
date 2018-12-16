'use strict';

const PIXI              = require('pixi.js');
const viewport          = require('../../engine/viewport.js');
const { Character }     = require('../character_model');

class Cutscene_Character extends Character{
  constructor(x,y) {
    super();
    this.sprite = new PIXI.extras.AnimatedSprite(this.create_idle_frames());
    this.sprite.anchor.set(0.5);
    this.sprite.width /= 1.5;
    this.sprite.height /= 1.5;
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();
    this.sprite.zIndex = -1;
    this.sprite.name = 'cutscene_npc';
    this.sprite.position.set(x,y);
    this.sprite.move_to_point = this.move_to_point;
    //todo
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
}

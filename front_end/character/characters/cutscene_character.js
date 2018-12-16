'use strict';

const PIXI              = require('pixi.js');
const viewport          = require('../../engine/viewport.js');
const { Character }     = require('../character_model');

class Cutscene_Character extends Character{
  constructor(x,y) {
    super();
    this.sprite.animation_switch('nothing', 'idle');
    this.sprite.name = 'cutscene_npc';
    this.sprite.position.set(x,y);
    this.sprite.move_to_point = this.move_to_point;
    //todo
    viewport.getChildByName('cutscene_container').addChild(this.sprite);
  }
  walk() {
    this.sprite.textures = this.create_walk_frames();
    this.sprite.play();
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

  create_walk_frames() {
    const walk_frames = [];
    for (let i = 0; i <= 19; i++) {
      let name = `survivor-move_knife_${i}`;

      walk_frames.push(PIXI.Texture.fromFrame(name));
    }

    return walk_frames;    
  }

}

module.exports = {
  Cutscene_Character,
}

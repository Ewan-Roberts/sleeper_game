const PIXI = require('pixi.js');
const viewport = require('../engine/viewport');
const ticker = require('../engine/ticker');
const { Character } = require('./character_model');

class Friend extends Character {
  constructor() {
    super('friend_container');
    
    const idle_frames = this.create_idle_frames();
    this.sprite = new PIXI.extras.AnimatedSprite(idle_frames);
    this.sprite.name = 'friendly';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    console.log(this)
    this.container.addChild(this.sprite);
    viewport.addChild(this.container);
  }

  add_state_handling() {
    this.sprite.click = () => {
      //if(this.dialog_open) {
      //  return;
      //}
      const player = viewport.getChildByName('player');
      this.dialog.create_background();
      this.dialog.add_script(this.sprite.dialog.script);
      this.dialog.add_portrait(player, 'merc_portrait');
      this.dialog.enter_dialog_slide(player);
    }
  }

}

module.exports = {
  Friend,
}



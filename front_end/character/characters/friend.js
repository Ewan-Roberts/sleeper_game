'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');

const { Character } = require('../character_model');
const { Dialog } = require('../../dialog/dialog_util');

const container = new PIXI.Container();
container.name = 'friend_container';
container.zIndex = -10;
viewport.addChild(container);

class Friend extends Character {
  constructor() {
    super();
    this.sprite.animation_switch('knife', 'idle');
    this.sprite.name = 'friend';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    container.addChild(this.sprite);
  }

  add_script(script) {
    this.sprite.dialog = {
      script: script,
      current_step: 0,
    };
  }

  add_dialog_handling() {
    this.dialog = new Dialog();
    this.dialog_open = false;
  }

  add_state_handling() {
    this.sprite.click = () => {
      const player = viewport.getChildByName('player');
      this.dialog.create_background();
      this.dialog.add_script(this.sprite.dialog.script);
      this.dialog.add_portrait(player, 'merc_portrait');
      this.dialog.enter_dialog_slide(player);
    };
  }
}

module.exports = {
  Friend,
};


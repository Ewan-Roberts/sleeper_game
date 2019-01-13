'use strict';

const { viewport  } = require('../../engine/viewport');
const { construct } = require('../../engine/constructor');

const { Character } = require('../character_model');
const { Dialog    } = require('../../cutscene/dialog_util');

const friend_container = viewport.getChildByName('friend_container');

class Friend extends construct(Character, Dialog) {
  constructor() {
    super();
    this.name = 'friend';
    this.sprite.animation_switch('knife', 'idle');
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    friend_container.addChild(this.sprite);
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

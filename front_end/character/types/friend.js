'use strict';


const { friend_container } = require('../../engine/pixi_containers');

const { Character  } = require('../character_model');
const { Human      } = require('../animations/character');

const { Vitals     } = require('../attributes/vitals');
const { Inventory  } = require('../attributes/Inventory');
const { Raycasting } = require('../attributes/raycasting');

class Friend extends Character {
  constructor() {
    super();
    this.name = 'friend';
    this.sprite.name = 'friend';

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.add_component(new Human(this.sprite));
    this.add_component(new Inventory());
    this.add_component(new Vitals());
    this.add_component(new Raycasting(this.sprite));
    //TODO: Talk Component
    this.add_component(new Dialog());

    friend_container.addChild(this.sprite);
  }

  add_script(script) {
    this.sprite.dialog = {
      script: script,
      current_step: 0,
    };
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

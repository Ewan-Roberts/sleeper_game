'use strict';
const PIXI = require('pixi.js');
const { gui_container} = require('../engine/pixi_containers');

const { Item   } = require('../level/elements/item_model');
const { world  } = require('../engine/shadows');

class Note extends Item {
  constructor(options) {
    console.log(options);
    super(options.image_name);
    this.name = 'note';

    if(options.remove_on_click) {
      this.click = () => {
        this.sprite.destroy();
      };
    }

    this.sprite.width = 300;
    this.sprite.height= 200;
    this.sprite.position.set(-world.x + global.window.innerWidth/2, -world.y+ global.window.innerHeight/2);
    this.sprite.anchor.set(0.5);
    const level_text = new PIXI.Text(
      'Be careful of the night, dont trust, hurt people...',
      {
        fontSize: 15,
        fill:     'grey',
        align:    'center',
        wordWrap: true,
        wordWrapWidth: 300,
      }
    );
    level_text.anchor.set(0.5);
    level_text.rotation = 0.09;
    level_text.position.copy(this.sprite);

    gui_container.addChild(this.sprite, level_text);
    this.click = () => {
      console.log(options);
    };
  }

}


module.exports = {
  Note,
};

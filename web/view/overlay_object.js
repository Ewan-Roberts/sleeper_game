'use strict';
const {Texture, Sprite, Text}= require('pixi.js');
const { guis  } = require('../engine/pixi_containers');
const { world } = require('../engine/shadows');
const { Fade  } = require('../effects/fade');
const { Color_Pick  } = require('../utils/color_picker');
const PIXI = require('pixi.js');

//const { Caption_Dialog } = require('./caption');
// same as fade sprite
class Background extends Sprite {
  constructor() {
    super(Texture.WHITE);
    const screen_center = {
      x: -world.x + global.window.innerWidth/2,
      y: -world.y + global.window.innerHeight/2,
    };
    this.width  = global.window.innerWidth;
    this.height = global.window.innerHeight;
    this.anchor.set(0.5);
    this.position.set(screen_center.x, screen_center.y);
    guis.addChild(this);
  }

  set_position({x, y}) {
    this.position.set(x, y);
  }

  fade_out(time = 2000) {
    Fade.out_destroy(this, time);
  }
}

class Note {
  constructor(options) {
    this.name = 'note';
    this.background = new Background();
    this.background.tint = 'black';
    this.background.alpha = 0.5;
    // disable keyboard when note is up
    PIXI.keyboardManager.disable();

    const texture = Texture.fromImage(options.image_on_click);
    this.sprite = new Sprite(texture);
    this.sprite.width = 300;
    this.sprite.height= 200;
    this.sprite.position.copy(this.background.position);
    this.sprite.anchor.set(0.5);
    this.sprite.interactive = true;

    if(options.remove_on_click) {
      this.click = () => this.sprite.destroy();
    }

    this.text = new Text(
      options.text,
      {
        fontSize: 15,
        fill:     'grey',
        align:    'center',
        wordWrap: true,
        wordWrapWidth: 200,
      }
    );
    this.text.anchor.set(0.5);
    this.text.rotation = 0.01;
    this.text.position.copy(this.sprite);

    this.sprite.tint = 0xd3d3d3;
    this.sprite.on('mouseover', () => {
      this.sprite.tint = 0xffffff;
    });
    this.sprite.on('mouseout', () => {
      this.sprite.tint = 0xd3d3d3;
      this.sprite.visible = false;
      this.text.visible = false;
      this.background.visible = false;
      PIXI.keyboardManager.enable();
      // if(options.post_open_dialog) {
      //   const dialog = new Caption_Dialog();
      //   dialog.show();
      //   console.log(dialog);
      //   console.log('111');
      //   dialog.render_text(options.post_open_dialog);
      // }
    });

    guis.addChild(this.sprite, this.text);
  }
}


module.exports = {
  Note,
  Background,
};

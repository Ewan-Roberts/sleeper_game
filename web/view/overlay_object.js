'use strict';
const {Texture, Sprite, Text}= require('pixi.js');
const { guis  } = require('../engine/pixi_containers');
const { world } = require('../engine/shadows');

const { Caption_Dialog } = require('./caption');

class Background {
  constructor() {
    const screen_center = {
      x: -world.x + global.window.innerWidth/2,
      y: -world.y + global.window.innerHeight/2,
    };
    const black_square = Texture.fromImage('black_dot');
    this.sprite = new Sprite(black_square);
    this.sprite.width  = global.window.innerWidth;
    this.sprite.height = global.window.innerHeight;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(screen_center.x, screen_center.y);
    this.sprite.alpha = 0.5;
  }

  set visible(value) {
    this.sprite.visible = value;
  }

  get position() {
    return this.sprite.position;
  }
}

class Note {
  constructor(options) {
    this.name = 'note';
    this.background = new Background();

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

    this.sprite.on('mouseout', () => {
      this.sprite.visible = false;
      this.text.visible = false;
      this.background.visible = false;

      if(options.post_open_dialog) {
        const dialog = new Caption_Dialog();
        dialog.show();
        dialog.render_text(options.post_open_dialog);
      }
    });

    guis.addChild(this.sprite, this.text, this.background.sprite);
  }
}


module.exports = {
  Note,
};

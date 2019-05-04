'use strict';
const PIXI = require('pixi.js');
const { gui_container} = require('../engine/pixi_containers');

const { world } = require('../engine/shadows');
const { Caption_Dialog } = require('./caption');

class Note {
  constructor(options) {
    const screen_center = {
      x: -world.x + global.window.innerWidth/2,
      y: -world.y + global.window.innerHeight/2,
    };
    const black_square = PIXI.Texture.fromImage('black_dot');
    const black_background  = new PIXI.Sprite(black_square);
    black_background.width  = global.window.innerWidth;
    black_background.height = global.window.innerHeight;
    black_background.anchor.set(0.5);
    black_background.position.set(screen_center.x, screen_center.y);
    black_background.alpha = 0.5;

    const texture = PIXI.Texture.fromImage(options.image_on_click);
    this.sprite = new PIXI.Sprite(texture);
    this.name = 'note';

    if(options.remove_on_click) {
      this.click = () => {
        this.sprite.destroy();
      };
    }
    this.sprite.width = 300;
    this.sprite.height= 200;
    this.sprite.position.set(screen_center.x, screen_center.y);
    this.sprite.anchor.set(0.5);
    const level_text = new PIXI.Text(
      options.text,
      {
        fontSize: 15,
        fill:     'grey',
        align:    'center',
        wordWrap: true,
        wordWrapWidth: 200,
      }
    );
    level_text.anchor.set(0.5);
    level_text.rotation = 0.01;
    level_text.position.copy(this.sprite);

    this.sprite.visible = true;
    this.sprite.interactive = true;
    black_background.visible = true;
    level_text.visible = true;

    this.sprite.on('mouseover', () => {
      this.sprite.visible = true;
      level_text.visible = true;
      black_background.visible = true;
    });

    this.sprite.on('mouseout', () => {
      this.sprite.visible = false;
      level_text.visible = false;
      black_background.visible = false;
      if(options.post_open_dialog) {
        const dialog = new Caption_Dialog();
        dialog.show();
        dialog.render_text(options.post_open_dialog);
      }

    });

    gui_container.addChild(this.sprite, level_text, black_background);
    this.sprite.click = () => {
      console.log(options);
    };
  }

}


module.exports = {
  Note,
};

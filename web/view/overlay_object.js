const { Texture, Sprite, Text } = require('pixi.js');
const { World } = require('../engine/pixi_containers');
const { viewport    } = require('../engine/app');
const { Fade     } = require('../effects/fade');
const PIXI = require('pixi.js');

class Background extends Sprite {
  constructor() {
    super(Texture.WHITE);
    this.width  = global.window.innerWidth;
    this.height = global.window.innerHeight;
    this.anchor.set(0.5);
    World.add_to('gui', this);
  }

  set_position({ x, y }) {
    this.position.set(x, y);
  }

  fade_out_destroy(time = 500) {
    Fade.out_destroy(this, time);
  }
}

class Note {
  constructor({
    image_on_click,
    text,
    text_colour = 'grey',
    sound_file,
  }) {
    // TODO Don't imply sound on instantiation
    if(sound_file) {
      PIXI.sound.play(sound_file);
    }

    this.name = 'note';
    this.background = new Background();
    this.background.tint = 'black';
    this.background.alpha = 0.5;
    this.background.set_position(viewport.center);

    // disable keyboard when note is up
    PIXI.keyboardManager.disable();

    this.sprite = new Sprite(Texture.fromImage(image_on_click));
    this.sprite.position.copy(this.background.position);

    // TODO make image size relative to viewport
    if(this.sprite.width > global.window.innerWidth) {
      this.sprite.scale.set(0.5);
    }
    this.sprite.anchor.set(0.5);
    this.sprite.interactive = true;
    this.sprite.buttonMode  = true;
    this.sprite.tint = 0xd3d3d3;
    this.sprite.on('mouseover', () => this.sprite.tint = 0xffffff);
    this.sprite.on('mouseout', () => this.sprite.tint = 0xd3d3d3);

    this.text = new Text(
      text,
      {
        'fontSize'     : 20,
        'fill'         : text_colour,
        'align'        : 'center',
        'wordWrap'     : true,
        'wordWrapWidth': 200,
      }
    );
    this.text.anchor.set(0.5);
    this.text.rotation = -0.05;
    this.text.position.copy(this.sprite);

    this.sprite.on('click', () => {
      this.background.fade_out_destroy();
      Fade.out_destroy(this.sprite);
      PIXI.keyboardManager.enable();
      Fade.out_destroy(this.text);
    });

    World.add_to('gui', this.sprite, this.text);
  }
}

module.exports = {
  Note,
};

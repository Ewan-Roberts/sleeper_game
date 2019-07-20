const { Texture, Sprite, Text }= require('pixi.js');
const { guis     } = require('../engine/pixi_containers');
const { Viewport } = require('pixi-viewport');
const { Fade     } = require('../effects/fade');
const PIXI = require('pixi.js');

class Background extends Sprite {
  constructor() {
    super(Texture.WHITE);
    this.width  = global.window.innerWidth;
    this.height = global.window.innerHeight;
    this.anchor.set(0.5);
    guis.addChild(this);
  }

  set_position({x, y}) {
    this.position.set(x, y);
  }

  fade_out_destroy(time = 500) {
    Fade.out_destroy(this, time);
  }
}

class Note {
  constructor(options) {
    //TODO Don't imply sound on instantiation
    PIXI.sound.play('page_turn');

    this.name = 'note';
    this.background = new Background();
    this.background.tint = 'black';
    this.background.alpha = 0.5;
    //TODO is this the center?
    this.background.set_position(Viewport.center);

    // disable keyboard when note is up
    PIXI.keyboardManager.disable();

    const texture = Texture.fromImage(options.image_on_click);
    this.sprite = new Sprite(texture);
    this.sprite.position.copy(this.background.position);
    this.sprite.anchor.set(0.5);
    this.sprite.interactive = true;

    if(options.remove_on_click) {
      this.click = () => this.sprite.destroy();
    }

    this.text = new Text(
      options.text,
      {
        fontSize: 20,
        fill:     options.text_colour || 'grey',
        align:    'center',
        wordWrap: true,
        wordWrapWidth: 200,
      }
    );
    this.text.anchor.set(0.5);
    this.text.rotation = -0.05;
    this.text.position.copy(this.sprite);

    this.sprite.tint = 0xd3d3d3;
    this.sprite.on('mouseover', () => this.sprite.tint = 0xffffff);
    this.sprite.on('mouseout', () => this.sprite.tint = 0xd3d3d3);

    this.sprite.on('click', () => {
      this.background.fade_out_destroy();
      Fade.out_destroy(this.sprite);
      PIXI.keyboardManager.enable();
      Fade.out_destroy(this.text);
    });

    guis.addChild(this.sprite, this.text);
  }
}

module.exports = {
  Note,
};

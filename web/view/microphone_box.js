const { stage   } = require('../engine/app');
const { Text    } = require('pixi.js');
const { Sprite  } = require('pixi.js');
const { Texture } = require('pixi.js');
const { RoundedRectangle } = require('pixi.js');
const { Container } = require('pixi.js');
const { Graphics } = require('pixi.js');

const margin_x = 20;
const margin_y = 5;

class Button extends Container {
  constructor({
    point,
    height,
    width,
    text,
    tint = 0xffffff,
    rounding = 20,
  }) {
    super();
    this.position.copy(point);

    this.background = new Graphics();
    this.background.lineStyle(1.5, 0x000000, 0.3);
    this.background.beginFill(tint);
    this.background.drawRoundedRect(-width, -height, width * 2, height * 2, rounding);
    // this.background.lineColor = '';


    this.background.endFill();

    this.text = new Text(text, {
      'align'   : 'center',
      'fontSize': 15,
    });
    this.text.x -= width / 3.5;
    this.text.y -= height / 2;

    this.interactive = true;
    this.cursor = 'pointer';
    this.on('mouseover', function() {
      this.tint = tint;
    });

    this.on('mouseout', function () {
      this.tint = 0xffffff;
    });

    this.addChild(
      this.background,
      this.text
    );
  }

  set tint(value) {
    this.background.tint = value;
  }
}


// TODO put in container
class MicrophonePrompt {
  constructor() {
    this.website_text = new Text('www.localhost.com want to:', { 'fontSize': 50 });
    this.prompt_text = new Text('Use take control of your browser', { 'fontSize': 50 });
    this.microphone_icon = new Sprite.fromFrame('microphone');
    this.allow_button = new Sprite.fromFrame('allow_button');
    this.background = new Sprite(Texture.WHITE);
    this.background_drop_shadow = new Sprite(Texture.WHITE);

    this._set_position();
  }

  _set_position() {
    this.website_text.x += margin_x + 20;
    this.website_text.y += margin_y + 20;
    this.website_text.width = 250;
    this.website_text.height = 24;

    this.prompt_text.x += margin_x + 70;
    this.prompt_text.y += margin_y + 65;
    this.prompt_text.width = 290;
    this.prompt_text.height = 24;

    this.microphone_icon.x += margin_x + 20;
    this.microphone_icon.y += margin_y + 60;
    this.microphone_icon.width = 30;
    this.microphone_icon.height = 30;

    this.allow_button = new Button({
      'point': {
        'x': margin_x + 385,
        'y': margin_y +  140,
      },
      'text'    : 'Allow',
      'width'   : 50,
      'height'  : 15,
      'rounding': 5,
      'tint'    : 0xE8E8E8,
    });

    this.block_button = new Button({
      'point': {
        'x': margin_x + 280,
        'y': margin_y +  140,
      },
      'text'    : 'Block',
      'width'   : 50,
      'height'  : 15,
      'rounding': 5,
      'tint'    : 0xE8E8E8,
    });

    this.background.width = 450;
    this.background.height = 180;
    this.background.x += margin_x;
    this.background.y += margin_y;

    this.background_drop_shadow.position.copy(this.background);
    this.background_drop_shadow.width = this.background.width + 4;
    this.background_drop_shadow.height = this.background.height + 4;
    this.background_drop_shadow.x += 5;
    this.background_drop_shadow.y += 5;
    this.background_drop_shadow.alpha = 0.2;
    this.background_drop_shadow.tint = 0x000000;
  }

  destroy() {
    this.website_text.destroy();
    this.prompt_text.destroy();
    this.microphone_icon.destroy();
    this.allow_button.destroy();
    this.block_button.destroy();
    this.background.destroy();
  }

  render() {

    stage.addChild(
      this.background_drop_shadow,
      this.background,
      this.microphone_icon,
      this.website_text,
      this.prompt_text,
      this.allow_button,
      this.block_button
    );
  }
}

module.exports = {
  MicrophonePrompt,
};

const { stage   } = require('../engine/app');
const { Text    } = require('pixi.js');
const { Sprite  } = require('pixi.js');
const { Texture } = require('pixi.js');

class MicrophonePrompt {
  constructor() {
    this.website_text = new Text('www.google.com want to:', {fontSize: 50});
    this.prompt_text = new Text('Use your microphone', {fontSize: 50});
    this.microphone_icon = new Sprite.fromFrame('microphone');
    this.allow_button = new Sprite.fromFrame('allow_button');
    this.allow_button_2 = new Sprite.fromFrame('allow_button');
    this.background = new Sprite(Texture.WHITE);

    this._set_position();
  }

  _set_position() {
    this.website_text.x += 20;
    this.website_text.y += 20;
    this.website_text.width /= 2.5;
    this.website_text.height /= 2.5;

    this.prompt_text.x += 70;
    this.prompt_text.y += 65;
    this.prompt_text.width /= 2.7;
    this.prompt_text.height /= 2.7;

    this.microphone_icon.x += 20;
    this.microphone_icon.y += 60;
    this.microphone_icon.width /= 2.7;
    this.microphone_icon.height /= 2.7;

    this.allow_button.x += 385;
    this.allow_button.y += 150;
    this.allow_button.width /= 2.7;
    this.allow_button.height /= 2.7;
    this.allow_button.interactive = true;
    this.allow_button.on('mouseover', function() {
      this.tint = 0xff0000;
    });

    this.allow_button.on('mouseout', function() {
      this.tint = 0xffffff;
    });

    this.allow_button_2.x += 280;
    this.allow_button_2.y += 150;
    this.allow_button_2.width /= 2.7;
    this.allow_button_2.height /= 2.7;
    this.allow_button_2.interactive = true;
    this.allow_button_2.on('mouseover', function() {
      this.tint = 0xff0000;
    });

    this.allow_button_2.on('mouseout', function () {
      this.tint = 0xffffff;
    });

    this.background.width = 500;
    this.background.height = 200;
  }

  destroy() {
    this.website_text.destroy();
    this.prompt_text.destroy();
    this.microphone_icon.destroy();
    this.allow_button.destroy();
    this.allow_button_2.destroy();
    this.background.destroy();
  }

  render() {
    stage.addChild(
      this.background,
      this.microphone_icon,
      this.website_text,
      this.prompt_text,
      this.allow_button,
      this.allow_button_2
    );
  }
}

module.exports = {
  MicrophonePrompt,
};

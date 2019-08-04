const { stage        } = require('../engine/app');
const { viewport     } = require('../engine/app');
const { Sprite       } = require('pixi.js');
const { Texture      } = require('pixi.js');
const { Container    } = require('pixi.js');
const { Text    } = require('pixi.js');
const { tweenManager } = require('pixi.js');

const container = new Container();
container.x = viewport.screenWidth/2;
container.y = viewport.screenHeight;

const background = new Sprite(Texture.WHITE);
background.width = viewport.screenWidth;
background.height = 60;
background.anchor.set(0.5, 1);
background.alpha = 0.2;

const dialog = new Text();
dialog.position.copy(background);
dialog.y -= 15;
dialog.anchor.set(0.5, 1);

container.addChild(
  background,
  dialog
);
stage.addChild(container);

const tween = tweenManager.createTween();

class Caption {
  static render(value) {
    this.show();
    dialog.text = value;
    tween.reset();
    tween.time = 5000;
    tween.start();
    tween.on('end', () => this.hide());
  }

  static clear() {
    dialog.text = '';
  }

  static show() {
    container.visible = true;
  }

  static hide() {
    container.visible = false;
  }
}

module.exports = {
  Caption,
};

const { stage     } = require('../engine/app');
const { viewport  } = require('../engine/app');
const { Sprite    } = require('pixi.js');
const { Texture   } = require('pixi.js');
const { Container } = require('pixi.js');
const { Text      } = require('pixi.js');
const { tweenManager } = require('pixi.js');

const container = new Container();
container.x = viewport.screenWidth / 2;
container.y = viewport.screenHeight;

const background = new Sprite(Texture.WHITE);
background.width = viewport.screenWidth;
background.height = 35;
background.anchor.set(0.5, 1);
background.alpha = 0.2;

const dialog = new Text();
dialog.style.fontSize = 20;
dialog.position.copy(background);
dialog.y -= 5;
dialog.anchor.set(0.5, 1);

// TODO handle gui elements in pixi_containers
container.addChild(
  background,
  dialog
);
stage.addChild(container);

const tween = tweenManager.createTween();

// TODO make this functional
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

// start hidden
Caption.hide();

module.exports = {
  Caption,
};

const { stage        } = require('../engine/app');
const { viewport     } = require('../engine/app');
const { Sprite       } = require('pixi.js');
const { Texture      } = require('pixi.js');
const { Container    } = require('pixi.js');
const { tweenManager } = require('pixi.js');

const container = new Container();
container.name = 'progress_bar';
container.x = viewport.screenWidth / 2;
container.y = viewport.screenHeight;

const background = new Sprite(Texture.WHITE);
background.width = 500;
background.height = 30;
background.anchor.set(0.5, 1);
background.alpha = 1;

const maximum_width = background.width - 20;

const bar = new Sprite(Texture.WHITE);
bar.width = 0;
bar.height = 15;
bar.x -= maximum_width / 2;
bar.y -= 5;
bar.anchor.set(0, 1);
bar.tint = 0x9acd3;

const tween_bar = tweenManager.createTween(bar);

container.addChild(
  bar,
  background
);

stage.addChild(container);

const DEFAULT_TIME_TO_COMPLETE = 10000;

class ProgressBar {
  static initialize() {
    this.hide(); // Start hidden

    this.time = DEFAULT_TIME_TO_COMPLETE;
  }

  static set percentage(percentage) {
    const amount = (maximum_width) * percentage;
    bar.width = amount;
  }

  static get percentage() {
    const percentage = (bar.width / maximum_width);
    return percentage;
  }

  static show() {
    container.renderable = true;
    container.visible = true;
    return this;
  }

  static hide() {
    container.renderable = false;
    container.visible = false;
  }

  static pause() {
    if(tween_bar) {
      tween_bar.stop();
    }
  }

  static get time_to_complete() {
    const time_to_complete = this.time - (this.time * this.percentage);
    return time_to_complete;
  }

  static complete(func) {
    tween_bar.on('end', () => {
      setTimeout(() => {
        func();
        this.hide();
      }, 3000);
    });

    tween_bar.on('stop', () => {
      setTimeout(() => {
        func();
        this.hide();
      }, 3000);
    });
  }

  static to_percentage(end_percentage) {
    if(tween_bar.active) {
      return;
    }

    tween_bar.time = this.time_to_complete;
    tween_bar.to({ 'width': maximum_width });

    tween_bar.on('update', () => {
      if(this.percentage > end_percentage) {
        tween_bar.stop();
        tween_bar.remove();
      }
    });

    tween_bar.start();
    return this;
  }
}

ProgressBar.initialize();

module.exports = {
  ProgressBar,
};

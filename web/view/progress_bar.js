const { stage        } = require('../engine/app');
const { viewport     } = require('../engine/app');
const { Sprite       } = require('pixi.js');
const { Texture      } = require('pixi.js');
const { Container    } = require('pixi.js');
const { tweenManager } = require('pixi.js');

class ProgressBar extends Container {
  constructor() {
    super();
    this.bar = new Sprite(Texture.WHITE);
    this.background = new Sprite(Texture.WHITE);

    this.x = viewport.center.x;
    this.y = viewport.bottom;

    this.addChild(
      this.background,
      this.bar
    );

    stage.addChild(this);

    this._set_position();
  }

  _set_position() {
    this.background.width = 500;
    this.background.height = 30;
    this.background.anchor.set(0.5, 1);
    this.background.alpha = 0.3;

    this.bar.width = 0;
    this.bar.height = 15;
    this.bar.x -= this.background.width/2 - 10;
    this.bar.y -= 5;
    this.bar.anchor.set(0, 1);
    this.bar.tint = 0xd3d3d3;
  }

  set percentage(percentage) {
    const maximum_width = this.background.width;
    const amount = (maximum_width/100)*percentage;
    this.bar.width = amount;
  }

  get percentage() {
    const maximum_width = this.background.width;
    const percentage = (this.bar.width/maximum_width)*100;
    return percentage;
  }

  animate_positive() {
    const maximum_width = this.background.width;
    const percentage = (this.bar.width/maximum_width);
    const total = 10000;

    const to_remove = total * percentage;

    const time = total - to_remove;

    this.tween_bar = tweenManager.createTween(this.bar);
    this.tween_bar.time = time;
    this.tween_bar.to({
      width: maximum_width - 20,
    });
    this.tween_bar.start();
    this.tween_bar.expire = true;
  }

  render() {
  }
}

module.exports = {
  ProgressBar,
};

'use strict';

const { guis, decals    } = require('../engine/pixi_containers');
const { Sprite, Texture } = require('pixi.js');
const { tweenManager    } = require('pixi.js');

class FadeSprite extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));

    const degrees = data.rotation * (Math.PI/180);
    this.alpha    = data.alpha  || 1;
    this.rotation = degrees     || 0;
    this.width    = data.width  || 50;
    this.height   = data.height || 50;
    this.anchor.set(0,1);

    this.tween       = tweenManager.createTween(this);
    this.tween.delay = data.delay || 0;
    decals.addChild(this);
    this.position.copy(data);
  }

  fade_in_wait_out(in_time = 1000, wait_time = 1000, out_time = 1000) {
    this.fade_in(in_time);
    this.tween.on('end', () => {
      this.tween.reset();
      this.tween.delay = wait_time;

      this.fade_out(out_time);
    });
  }

  fade_in(time = 1000) {
    this.tween.reset();
    this.tween.time = time;
    this.alpha = 0;
    this.tween.to({alpha: 1});

    this.tween.start();
  }

  fade_out(time = 700) {
    this.tween.reset();
    this.tween.time = time;
    this.tween.to({alpha: 0});

    this.tween.on('end', () => {
      this.tween.remove();
      if(this) this.destroy();
    });

    this.tween.start();
  }

  _bounce_down(time = 100) {
    this.tween.reset();
    this.tween.time = time;
    this.tween.to({y: this.y+5});
    this.tween.start();
  }

  _bounce_up(time = 100) {
    if(this._destroyed) return;
    this.tween.reset();
    this.tween.time = time;
    this.tween.to({y: this.y-5});

    this.tween.start();
    this.tween.on('end', () => this.fade_out());
  }

  bounce() {
    if(this._destroyed) return;
    if(!this) return;
    this._bounce_down();
    this.tween.on('end', () => {
      this.tween.reset();

      this._bounce_up();
    });
  }
}

function flash_at(point, time = 400) {
  const overlay = new FadeSprite({image_name: 'white_tiles'});
  overlay.position.copy(point);
  overlay.anchor.set(0.5);
  overlay.width  = 4000;
  overlay.height = 4000;
  overlay.fade_out(time);
  //this is dumb
  guis.addChild(overlay);
}

function pulse_sprites(data) {
  let delay = 500;
  data.forEach(unit => {
    delay += 120;
    const sprite = new FadeSprite({
      ...unit,
      delay,
    });
    sprite.fade_in_wait_out(delay, 2000, 600);
  });
}

module.exports = {
  FadeSprite,
  flash_at,
  pulse_sprites,
};

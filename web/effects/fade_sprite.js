'use strict';

const { visuals, decals } = require('../engine/pixi_containers');
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
    this.anchor.set(0, 1);

    this.tween       = tweenManager.createTween(this);
    this.tween.delay = data.delay || 0;

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
    this.tween
      .from({alpha: 0})
      .to({alpha: 1});

    this.tween.start();
  }

  fade_out(time = 700) {
    this.tween.reset();
    this.tween.time = time;
    this.tween
      .from({alpha: this.alpha})
      .to({alpha: 0});

    this.tween.on('end', () => {
      this.tween.remove();
      if(this) this.destroy();
    });

    this.tween.start();
  }

  _bounce_down(time = 200) {
    this.tween.reset();
    this.tween.time = time;
    this.tween.to({y: this.y+3});
    this.tween.start();
  }

  _bounce_up(time = 200) {
    if(this._destroyed) return;
    this.tween.reset();
    this.tween.time = time;
    this.tween.to({y: this.y-3});

    this.tween.start();
    this.tween.on('end', () => this.fade_out(500));
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

function fill_screen_at(point, tint) {
  const overlay = new FadeSprite({image_name: 'white_tiles'});
  overlay.position.copy(point);
  overlay.anchor.set(0.5);
  overlay.tint   = tint;
  overlay.width  = 4000;
  overlay.height = 4000;
  visuals.addChild(overlay);
  return overlay;
}


function flash_at(point, time = 400, tint = 0x000000) {
  const overlay = new FadeSprite({image_name: 'white_tiles'});
  overlay.position.copy(point);
  overlay.anchor.set(0.5);
  overlay.tint   = tint;
  overlay.width  = 5000;
  overlay.height = 5000;
  overlay.fade_out(time);
  visuals.addChild(overlay);
}

function pulse_sprites(data) {
  let delay = 500;
  data.forEach(unit => {
    delay += 120;
    const sprite = new FadeSprite({
      ...unit,
      delay,
    });
    sprite.alpha = 0;
    sprite.fade_in_wait_out(delay, 2000, 1000);
    decals.addChild(sprite);
  });
}

module.exports = {
  FadeSprite,
  flash_at,
  fill_screen_at,
  pulse_sprites,
};

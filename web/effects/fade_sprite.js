const { visuals, decals, fades      } = require('../engine/pixi_containers');
const { Sprite, Texture, DEG_TO_RAD } = require('pixi.js');
const { tweenManager                } = require('pixi.js');

class FadeSprite extends Sprite {
  constructor({
    image_name,
    rotation,
    alpha  = 1,
    height = 50,
    width  = 50,
    delay = 0,
    x,
    y,
  }) {
    super(Texture.fromImage(image_name));

    this.alpha    = alpha;
    this.width    = width;
    this.height   = height;
    this.rotation = rotation * DEG_TO_RAD;
    this.anchor.set(0, 1);
    this.position.copy({x,y});

    this.tween       = tweenManager.createTween(this);
    this.tween.delay = delay;
  }

  fade_in_wait_out(
    in_time   = 1000,
    wait_time = 1000,
    out_time  = 1000
  ) {
    this.fade_in(in_time);
    this.tween.on('end', () => {
      this.tween.reset();
      this.tween.delay = wait_time;

      this.fade_out(out_time);
    });
  }

  set delay(value) {
    this.tween.delay = value;
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
  const overlay = new FadeSprite({image_name: 'white_square'});
  overlay.anchor.set(0.3);
  overlay.tint   = tint;
  overlay.width  = 3000;
  overlay.height = 2000;
  overlay.position.copy(point);
  visuals.addChild(overlay);
  return overlay;
}


function flash_at(point, time = 400, tint = 0x000000, direction = 'out', delay = 0) {
  const overlay = new FadeSprite({image_name: 'white_square'});
  overlay.position.copy(point);
  overlay.anchor.set(0.5);
  overlay.tint   = tint;
  overlay.width  = 2000;
  overlay.height = 2000;
  overlay.delay  = delay;
  overlay.alpha = 1;
  if(direction === 'out') {
    overlay.fade_out(time);
  } else {
    overlay.alpha = 0;
    overlay.fade_in(time);
  }
  fades.addChild(overlay);
  return overlay;
}

function pulse_sprites(data) {
  let delay = 500;
  const sprites = data.map(unit => {
    delay += 120;
    const sprite = new FadeSprite({
      ...unit,
      delay,
    });
    sprite.alpha = 0;
    sprite.fade_in_wait_out(delay, 2000, 1000);
    decals.addChild(sprite);
    return sprite;
  });
  return sprites;
}

module.exports = {
  FadeSprite,
  flash_at,
  fill_screen_at,
  pulse_sprites,
};

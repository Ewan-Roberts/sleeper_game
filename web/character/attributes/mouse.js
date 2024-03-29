const { Sprite, Texture, tweenManager } = require('pixi.js');
const { radian, random_bound } = require('../../utils/math');
const { viewport    } = require('../../engine/app');
const { shoot_arrow } = require('../../engine/ranged');
const { World } = require('../../engine/pixi_containers');
const { keyboardManager } = require('pixi.js');

class Aiming_Cone extends Sprite {
  constructor() {
    super(Texture.fromImage('yellow_triangle'));
    this.anchor.x = 0.5;
    this.alpha    = 0;
    this.original_width = this.width;

    World.add_to('gui', this);
  }

  narrow(time = 3000) {
    if(this.tween) {
      this.tween.remove();
    }
    const tweens = tweenManager.getTweensForTarget(this);
    if(tweens) {
      tweens.forEach(tween => tween.remove());
    }

    this.tween = tweenManager.createTween(this);
    this.tween.expire = true;
    this.tween.time   = time;

    this.angle_of_cone  = 90;
    this.renderable = true;
    this.alpha   = 0;

    this.tween.from({
      'width': this.original_width,
      'alpha': 0,
    }).to({
      'width': 5,
      'alpha': 0.3,
    });

    this.tween.on('update', () => {
      this.angle_of_cone -= 1;
    });

    this.tween.on('end', () => {
      this.width = this.original_width;
      this.renderable = false;
      this.tween.remove();
    });

    this.tween.start();
  }

  get angle() {
    return this.angle_of_cone;
  }

  finish() {
    this.renderable = false;
    if(this.tween) {
      this.tween.remove();
    }
  }
}

class Mouse {
  constructor(sprite) {
    this.name      = 'mouse';
    this.sprite    = sprite;
    this.melee     = sprite.melee;
    // this.cone      = new Aiming_Cone();

    viewport.interactive = true;
    viewport.on('mouseup',   event => this.mouse_up(event));
    viewport.on('mousemove', event => this.mouse_move(event));
    viewport.on('mousedown', event => this.mouse_down(event));

    this.keyboard_down = false;
    keyboardManager.on('down',     () => this.keyboard_down = true);
    keyboardManager.on('released', () => this.keyboard_down = false);
  }

  mouse_down(event) {
    if(!event) {
      return;
    }
    const mouse_position = event.data.getLocalPosition(viewport);
    this.sprite.rotation = radian(mouse_position, this.sprite);

    if(event.data.originalEvent.shiftKey && this.sprite.animation.prefix === 'bow') {
      this.sprite.animation.ready();
      // this.cone.narrow();
    }
  }

  destroy() {
    viewport.off('mousemove', this.mouse_move());
    viewport.off('mouseup',   this.mouse_up());
    viewport.off('mousedown', this.mouse_down());
  }

  mouse_up(event) {
    if(!event) {
      return;
    }
    if(!event.data.originalEvent.shiftKey) {
      return;
    }
    // const mouse_position = event.data.getLocalPosition(viewport);

    // TODO Weapon manager
    if(this.sprite.animation.prefix === 'bow') {
      // const { angle } = this.cone;
      // const angle_to_offset = random_bound(-angle, angle) || 29;
      // shoot_arrow(200, 20, this.sprite, {
      //   'x': mouse_position.x + angle_to_offset,
      //   'y': mouse_position.y + angle_to_offset,
      // });
      return;
    }

    if(this.sprite.animation.prefix === 'knife') {

      if(this.slashing) {
        return;
      }
      this.slashing = true;
      keyboardManager.disable();

      this.melee.slash(300, 20, this.sprite);
      this.sprite.loop = false;
      this.sprite.animation.attack();
      this.sprite.onComplete = () => {
        this.slashing = false;
        this.sprite.loop = true;
        this.sprite.animation.idle();
        keyboardManager.enable();
      };
      return;
    }
    this.sprite.animation.idle();
  }

  mouse_move(event) {
    if(!event) {
      return;
    }
    if(this.keyboard_down) {
      return;
    }
    const mouse_position = event.data.getLocalPosition(viewport);

    const rotation = radian(mouse_position, this.sprite);
    this.sprite.rotation = rotation;
    // this.cone.position   = this.sprite;
    // this.cone.rotation   = rotation;
  }
}

module.exports = {
  Mouse,
};

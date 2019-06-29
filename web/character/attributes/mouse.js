'use strict';
const { Sprite, Texture, tweenManager } = require('pixi.js');
const { radian, random_bound } = require('../../utils/math');
const { screen      } = require('../../engine/app');
const { shoot_arrow } = require('../../engine/ranged');
const { MeleeBox    } = require('../../engine/melee');
const { guis        } = require('../../engine/pixi_containers');
const { world       } = require('../../engine/shadows');

function get_relative_mouse_position(sprite, mouse_point) {
  return {
    x: (mouse_point.x - screen.width/2)  + sprite.x,
    y: (mouse_point.y - screen.height/2) + sprite.y,
  };
}
class Aiming_Cone extends Sprite {
  constructor() {
    super(Texture.fromImage('yellow_triangle'));
    this.anchor.x = 0.5;
    this.alpha    = 0;
    this.original_width = this.width;

    guis.addChild(this);
  }

  narrow(time = 3000) {
    if(this.tween) this.tween.remove();
    const tweens = tweenManager.getTweensForTarget(this);
    if(tweens) tweens.forEach(tween => tween.remove());

    this.tween = tweenManager.createTween(this);
    this.tween.expire   = true;
    this.tween.time     = time;

    this.angle_of_cone  = 90;
    this.visible = true;
    this.alpha   = 0;

    this.tween.from({
      width: this.original_width,
      alpha: 0,
    }).to({
      width: 5,
      alpha: 0.3,
    });

    this.tween.on('update', () => {
      this.angle_of_cone -= 1;
    });

    this.tween.on('end', () => {
      this.width = this.original_width;
      this.visible = false;
      this.tween.remove();
    });

    this.tween.start();
  }

  get angle() {
    return this.angle_of_cone;
  }

  finish() {
    this.visible = false;
    if(this.tween) this.tween.remove();
  }
}

class Mouse {
  constructor(sprite) {
    this.name      = 'mouse';
    this.animation = sprite.animation;
    this.sprite    = sprite;
    this.cone      = new Aiming_Cone();
    this.melee     = new MeleeBox();

    world.interactive = true;
    world.on('mouseup',   event => this.mouse_up(event));
    world.on('mousemove', event => this.mouse_move(event));
    world.on('mousedown', event => this.mouse_down(event));
  }

  mouse_down(event) {
    if(!event) return;
    const mouse_position = get_relative_mouse_position(this.sprite, event.data.global);
    this.sprite.rotation = radian(mouse_position, this.sprite);

    if(event.data.originalEvent.shiftKey && this.animation.prefix === 'bow') {
      this.animation.ready_weapon();
      this.cone.narrow();
    }
  }

  destroy() {
    world.off('mousemove', this.mouse_move());
    world.off('mouseup',   this.mouse_up());
    world.off('mousedown', this.mouse_down());
  }

  mouse_up(event) {
    if(!event) return;
    if(!event.data.originalEvent.shiftKey) return;
    const mouse_position = get_relative_mouse_position(this.sprite, event.data.global);

    this.animation.idle();
    // TODO Weapon manager
    if(this.animation.prefix === 'bow') {
      const { angle } = this.cone;
      const angle_to_offset = random_bound(-angle, angle) || 29;
      shoot_arrow(200, 20, this.sprite, {
        x: mouse_position.x + angle_to_offset,
        y: mouse_position.y + angle_to_offset,
      });
      return;
    }

    if(this.animation.prefix === 'knife') {
      this.melee.slash(200, 20, this.sprite);
      return;
    }
  }

  mouse_move(event) {
    if(!event) return;
    const mouse_position = get_relative_mouse_position(this.sprite, event.data.global);

    const rotation = radian(mouse_position, this.sprite);
    this.sprite.rotation = rotation;
    this.cone.position   = this.sprite;
    this.cone.rotation   = rotation;
  }
}

module.exports = {
  Mouse,
};

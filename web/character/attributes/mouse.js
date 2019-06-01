'use strict';
const { Sprite, tweenManager } = require('pixi.js');
const { screen      } = require('../../engine/app');
const { shoot_arrow } = require('../../engine/ranged');
const { radian, random_bound } = require('../../utils/math');
const { guis        } = require('../../engine/pixi_containers');

function get_relative_mouse_position(sprite, mouse_point) {
  return {
    x: (mouse_point.x - screen.width/2)  + sprite.x,
    y: (mouse_point.y - screen.height/2) + sprite.y,
  };
}
class Aiming_Cone {
  constructor() {
    this.sprite = new Sprite.from('yellow_triangle');
    this.sprite.anchor.x = 0.5;
    this.sprite.alpha = 0;
    this.original_width = this.sprite.width;

    guis.addChild(this.sprite);
  }

  set rotation(value) {
    this.sprite.rotation = value - 1.57;
  }

  set position({x, y}) {
    this.sprite.position.set(x, y);
  }

  narrow(time = 3000) {
    const tweens = tweenManager.getTweensForTarget(this.sprite);
    if(tweens) tweens.forEach(tween => tween.remove());

    this.tween = tweenManager.createTween(this.sprite);
    this.tween.expire   = true;
    this.tween.time     = time;

    this.angle_of_cone  = 180;
    this.sprite.visible = true;
    this.sprite.alpha   = 0;


    this.tween.from({
      width: this.original_width,
      alpha: 0,
    }).to({
      width: 5,
      alpha: 0.3,
    });

    this.tween.on('update', () => {
      this.angle_of_cone-=2;
    });

    this.tween.on('end', () => {
      this.sprite.width = this.original_width;
      this.sprite.visible = false;
      this.tween.remove();
    });

    this.tween.start();
  }

  get angle() {
    return this.angle_of_cone;
  }

  finish() {
    this.sprite.visible = false;
    this.tween.remove();
  }
}



class Mouse {
  constructor({ keyboard, animation, inventory, sprite }) {
    this.name      = 'mouse';

    this.keyboard  = keyboard;
    this.animation = animation;
    this.inventory = inventory;
    this.sprite    = sprite;
    this.cone      = new Aiming_Cone();

    global.document.addEventListener('mousemove', event =>this.mouse_move(event));
    global.document.addEventListener('mouseup', event => this.mouse_up(event));
    global.document.addEventListener('mousedown', event => this.mouse_down(event));
  }

  mouse_down(event) {
    const mouse_position = get_relative_mouse_position(this.sprite, event);
    this.sprite.rotation = radian(mouse_position, this.sprite);

    if(event.shiftKey && this.animation.prefix === 'bow') {
      this.cone.narrow();
    }
  }

  mouse_up(event) {
    if(!event.shiftKey) return;

    const mouse_position = get_relative_mouse_position(this.sprite, event);

    if(this.animation.prefix === 'bow') {
      const { angle } = this.cone;
      const angle_to_offset = random_bound(-angle, angle);
      shoot_arrow(200, 20, this.sprite, {
        x: mouse_position.x + angle_to_offset,
        y: mouse_position.y + angle_to_offset,
      });
      this.cone.finish();
    }

    if(this.animation.prefix === 'knife') {
      console.log('to add');
    }
  }

  mouse_move(event) {
    const mouse_position = get_relative_mouse_position(this.sprite, event);
    const rotation = radian(mouse_position, this.sprite);
    this.sprite.rotation = rotation;
    this.cone.position   = this.sprite;
    this.cone.rotation   = rotation;
  }

}

module.exports = {
  Mouse,
};

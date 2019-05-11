'use strict';
const { screen      } = require('../../engine/app');
const { shoot_arrow } = require('../../engine/ranged');
const { Aiming_Cone } = require('../../effects/aiming_cone');
const { radian      } = require('../../utils/math');

//const cone = visuals.children.find(elem => elem.name === 'aiming_cone');

function get_relative_mouse_position(sprite, mouse_point) {
  return {
    x: (mouse_point.x - screen.width/2)  + sprite.x,
    y: (mouse_point.y - screen.height/2) + sprite.y,
  };
}

class Mouse {
  constructor({ keyboard, animation, inventory, sprite }) {
    this.name      = 'mouse';

    this.keyboard  = keyboard;
    this.animation = animation;
    this.inventory = inventory;
    this.sprite    = sprite;

    document.addEventListener('mousemove', event => {
      const mouse_position = get_relative_mouse_position(sprite, event);
      // new Aiming_Line().add_between_sprites(mouse_position, player);
      const rotation = radian(mouse_position, sprite);
      sprite.rotation = rotation;

      // if(cone) cone.rotation = rotation - 1.57;
    });

    document.addEventListener('mouseup', event => {
      if(!event.shiftKey) return;

      const mouse_position = get_relative_mouse_position(sprite, event);
      if(this.cone_timer) this.cone_timer.stop();

      if(animation.prefix === 'bow') {
        shoot_arrow(200, 20, sprite, mouse_position);
      }

      if(animation.prefix === 'knife') {
        console.log('to add');
      }
    });

    document.addEventListener('mousedown', event => {
      const mouse_position = get_relative_mouse_position(sprite, event);
      sprite.rotation = radian(mouse_position, sprite);

      if(event.shiftKey && animation.prefix === 'bow') {
        this.cone_timer = Aiming_Cone.start_at(this.sprite);
        this.cone_timer.start();
      }
    });
  }
}

module.exports = {
  Mouse,
};

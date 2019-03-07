'use strict';

const { visual_effects_container } = require('../../engine/pixi_containers');

const { world       } = require('../../engine/shadows');
const { shoot_arrow } = require('../../engine/ranged');
const { Aiming_Cone } = require('../../effects/aiming_cone');
const { radian      } = require('../../utils/math');

const cone = visual_effects_container.children.find(elem => elem.name === 'aiming_cone');

class Mouse {
  constructor({ keyboard, animation, inventory, sprite }) {
    this.name      = 'mouse';

    this.keyboard  = keyboard;
    this.animation = animation;
    this.inventory = inventory;
    this.sprite    = sprite;

    world.on('pointerup',   event => this._mouse_up(event));
    world.on('pointermove', event => this._mouse_move(event));
    world.on('pointerdown', event => this._mouse_down(event));
  }

  _mouse_up(event) {
    // if(!this.keyboard.shift_pressed) return;
    const mouse_position = event.data.getLocalPosition(world);
    if(this.cone_timer) this.cone_timer.stop();

    this.animation.idle();

    //TODO ammo management engine
    if(this.keyboard.shift_pressed) {
      const { equipped } = this.inventory;

      shoot_arrow(equipped.speed, equipped.damage, this.sprite, mouse_position);
    }
  }

  _mouse_down(event) {
    // if(!this.keyboard.shift_pressed) return;
    const mouse_position = event.data.getLocalPosition(world);

    this.animation.ready_weapon();
    this.animation.face_point(mouse_position);

    //TODO: this should be managed better it creates a timer each time
    if(this.keyboard.shift_pressed) {
      this.cone_timer = Aiming_Cone.start_at(this.sprite);
      this.cone_timer.start();
    }
  }

  _mouse_move(event) {
    const mouse_position = event.data.getLocalPosition(world);
    this.animation.face_point(mouse_position);

    const rotation = radian(mouse_position, this.sprite);
    if(cone) cone.rotation = rotation - 1.57;
  }
}

module.exports = {
  Mouse,
};

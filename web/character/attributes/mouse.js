'use strict';

const { visual_effects_container, player_container } = require('../../engine/pixi_containers');
const app  = require('../../engine/app');

const { shoot_arrow } = require('../../engine/ranged');
const { Aiming_Cone } = require('../../effects/aiming_cone');

const { radian      } = require('../../utils/math');

const cone = visual_effects_container.children.find(elem => elem.name === 'aiming_cone');

const get_relative_mouse_position = sprite => {
  const mouse_point = app.renderer.plugins.interaction.mouse.global;

  return {
    x: (mouse_point.x - app.screen.width/2)  + sprite.x,
    y: (mouse_point.y - app.screen.height/2) + sprite.y,
  };

};

class Mouse {
  constructor({ keyboard, animation, inventory, sprite }) {
    this.name      = 'mouse';

    this.keyboard  = keyboard;
    this.animation = animation;
    this.inventory = inventory;
    this.sprite    = sprite;
    this.shift_pressed = true;
    console.log(app.stage);
    document.addEventListener('mousemove', this._mouse_move);
    document.addEventListener('mouseup', this._mouse_up);
    document.addEventListener('mousedown', this._mouse_down);

  }

  _mouse_up() {
    const player = player_container.children[0];
    const mouse_position = get_relative_mouse_position(player);
    if(this.cone_timer) this.cone_timer.stop();

    // shoot_arrow(200, 20, player, mouse_position);
  }

  _mouse_down() {
    // if(!this.keyboard.shift_pressed) return;
    const player = player_container.children[0];
    const mouse_position = get_relative_mouse_position(player);
    const rotation = radian(mouse_position, player);

    player.rotation = rotation;
    //TODO: this should be managed better it creates a timer each time
    if(this.shift_pressed) {
      this.cone_timer = Aiming_Cone.start_at(this.sprite);
      this.cone_timer.start();
    }
  }

  _mouse_move() {
    const player = player_container.children[0];
    const mouse_position = get_relative_mouse_position(player);

    // const poo = new Aiming_Line();

    // poo.add_between_sprites(mouse_position, player);
    const rotation = radian(mouse_position, player);
    player.rotation = rotation;
    if(cone) cone.rotation = rotation - 1.57;
  }
}

module.exports = {
  Mouse,
};

'use strict';

const { world } = require('./shadows');
const { Tween } = require('./tween');

class Camera {
  constructor() {
    this.name = 'camera';

    this.sprite = world;

    this.add_component(new Tween(this.sprite));
  }

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position({ x, y }) {
    this.sprite.position.set(-x, -y);
  }

  set_center({ x, y }) {
    this.sprite.position.set(-x + global.window.innerWidth/2, -y+ global.window.innerHeight/2);
  }

  reset() {
    this.set_position({x:0,y:0});
  }
}

module.exports = {
  Camera,
};

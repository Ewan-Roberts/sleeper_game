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
    this.sprite.position.set(x, y);
  }

  // TODO you cant anchor set containers
  set_center({ x, y }) {
    console.log(this.sprite)
    return;
    this.sprite.position.y = (this.sprite.height / 2) - y;
    this.sprite.position.x = (this.sprite.width  / 2) - x;
  }

  reset() {
    this.set_position({x:0,y:0});
  }
}

module.exports = {
  Camera,
};

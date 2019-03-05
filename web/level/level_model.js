'use strict';

const { background_container } = require('../engine/pixi_containers');

class Level {
  constructor() {}

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    background_container.addChild(this.sprite);
  }
}

module.exports = {
  Level,
};

'use strict';

class Character {
  constructor() {}

  add_component(component) {
    this[component.name] = component;
  }

  remove_component(name) {
    delete this[name];
  }

  set tint(value) {
    this.sprite.tint = value;
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);
  }
}

module.exports = {
  Character,
};

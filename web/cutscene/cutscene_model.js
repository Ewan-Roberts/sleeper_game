'use strict';

class Cutscene {
  constructor() {}

  add_component(component) { this[component.name] = component; }

  remove_component(name) { delete this[name]; }

  start() {}

  stop() {}
}

module.exports = {
  Cutscene,
};

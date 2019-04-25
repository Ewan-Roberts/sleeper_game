'use strict';

class Tiled_Data {
  constructor(level_data) {
    level_data.layers.forEach(layer => {
      this[layer.name] = layer.objects;
    });
  }
}

module.exports = {
  Tiled_Data,
};

'use strict';

//This is purely an interface for TILED data
class Tiled_Data {
  constructor(level_data) {
    this.level_data = level_data;
  }

  get player() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='player');

    if(!found_layer) throw new Error('no found player in level data');

    const player = found_layer.objects;

    return player;
  }

  get center() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='center');

    if(!found_layer) throw new Error('no center found in level data');

    const center = found_layer.objects;

    //There should only ever be one center
    return center[0];
  }

  get item_areas() {
    const item_areas = this.level_data.layers.find(layer => layer.name ==='item_areas');

    if(!item_areas) throw new Error('no item areas found in level data');
    const pads = [];
    //TODO this accounts for tiled not anchoring its boxs in the middle
    item_areas.layers.forEach(item => {
      const pad = item.objects[0];
      pad.x += pad.width/2;
      pad.y += pad.height/2;
      pads.push(pad);
    });

    return pads;
  }

  get lights() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='lights');

    if(!found_layer) throw new Error('no lights found in level data');

    const lights = found_layer.objects;

    return lights;
  }

  get exit() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='exit_pad');

    if(!found_layer) throw new Error('no pads found in level data');

    const pads = found_layer.objects;

    return pads;
  }

  get walls() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='walls');

    if(!found_layer) throw new Error('no found walls in level data');

    const walls = found_layer.objects;

    return walls;
  }
}

module.exports = {
  Tiled_Data,
};

'use strict';

// This is purely an interface for TILED data
class Tiled_Data {
  constructor(level_data) {
    this.level_data = level_data;
  }

  get player() {
    const found_layer = this.level_data.layers.find(layer => layer.name === 'player');

    if(!found_layer) throw new Error('no found player in level data');

    const player = found_layer.objects[0];

    return player;
  }

  get furnishing() {
    const found_layer = this.level_data.layers.find(layer => layer.name === 'furnishing');
    if(!found_layer) throw new Error('no furnishings found in level data');

    const group = found_layer.layers.map(thing => ({
      properties: thing.properties,
      ...thing.objects[0],
    }));

    return group;
  }

  get item_areas() {
    const item_areas = this.level_data.layers.find(layer => layer.name === 'item_areas');

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

  get prey() {
    const found_layer = this.level_data.layers.find(layer => layer.name === 'prey');

    if(!found_layer) throw new Error('no prey areas found in level data');
    const prey = found_layer.objects;

    return prey;
  }

  get background() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='background');

    if(!found_layer) throw new Error('no background found in level data');
    const background = found_layer.objects;

    //There should only ever be one background
    return background[0];
  }

  get lights() {
    const found_layer = this.level_data.layers.find(layer => layer.name ==='lights');

    if(!found_layer) throw new Error('no lights found in level data');

    const lights = found_layer.objects;

    return lights;
  }

  get exit_pad() {
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

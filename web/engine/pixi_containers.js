'use strict';
const PIXI = require('pixi.js');
PIXI.settings.ROUND_PIXELS = true;
const { world } = require('./shadows');

const zIndex_layer = {
  background: 12,
  low:        9,
  medium:     6,
  close:      3,
  very_close: 1,
};

const {
  background,
  low,
  medium,
  close,
  very_close,
} = zIndex_layer;

const background_container = new PIXI.Container();
background_container.name = 'background_image';
background_container.zIndex = background;

const grid_container = new PIXI.Container();
grid_container.name = 'grid_container';
grid_container.zIndex = background;

const collision_container = new PIXI.Container();
collision_container.name = 'collision_items';
collision_container.zIndex = low;

const item_container = new PIXI.Container();
item_container.name = 'non_collision_items';
item_container.zIndex = low;

const critter_container = new PIXI.Container();
critter_container.name = 'critter_container';
critter_container.zIndex = low;

const arrow_container = new PIXI.Container();
arrow_container.name = 'arrow_container';
arrow_container.zIndex = medium;

const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';
enemy_container.zIndex = medium;

const player_container = new PIXI.Container();
player_container.name = 'player_container';
player_container.zIndex = medium;

const visual_effects_container = new PIXI.Container();
visual_effects_container.name = 'visual_effects_container';
visual_effects_container.zIndex = close;

const pad_container = new PIXI.Container();
pad_container.name = 'pad_container';
pad_container.zIndex = close;

const roof_container = new PIXI.Container();
roof_container.name = 'roof_container';
roof_container.zIndex = close;

const gui_container = new PIXI.Container();
gui_container.name = 'gui_container';
gui_container.zIndex = very_close;

const dialog_container = new PIXI.Container();
dialog_container.name = 'dialog_container';
dialog_container.zIndex = close;

// const grid_particles = new PIXI.ParticleContainer(
//   scale: true,
//   position: true,
//   rotation: true,
//   uvs: true,
//   alpha: true,
// );
// grid_particles.name = 'grid_particles';
// grid_particles.zIndex = close;

world.addChild(
  visual_effects_container,
  roof_container,
  background_container,
  grid_container,
  collision_container,
  item_container,
  critter_container,
  arrow_container,
  enemy_container,
  player_container,
  gui_container,
  dialog_container,
  pad_container
  // grid_particles
);

world.updateLayersOrder();

function clear_container(container) {
  for (let i = container.children.length - 1; i >= 0; i--) {
    container.removeChild(container.children[i]);
  }
}

function clear_level_containers(expection) {
  for (let i = world.children.length - 1; i >= 0; i--) {
    if(expection) {
      if(world.children[i].name === expection) continue;
    }

    clear_container(world.children[i]);
  }
}

function clear_non_player_containers() {
  clear_level_containers('player_container');
}

module.exports = {
  roof_container,
  background_container,
  collision_container,
  critter_container,
  gui_container,
  enemy_container,
  player_container,
  arrow_container,
  visual_effects_container,
  grid_container,
  item_container,
  pad_container,
  clear_non_player_containers,
  // grid_particles,
};



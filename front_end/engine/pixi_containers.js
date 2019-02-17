'use strict';

const PIXI = require('pixi.js');
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

const non_collision_container = new PIXI.Container();
non_collision_container.name = 'non_collision_items';
non_collision_container.zIndex = low;

const door_container = new PIXI.Container();
door_container.name = 'door_container';
door_container.zIndex = low;

const critter_container = new PIXI.Container();
critter_container.name = 'critter_container';
critter_container.zIndex = low;

const network_player_container = new PIXI.Container();
network_player_container.name = 'network_players';

const friend_container = new PIXI.Container();
friend_container.name = 'friend_container';
friend_container.zIndex = medium;

const arrow_container = new PIXI.Container();
arrow_container.name = 'arrow_container';
arrow_container.zIndex = medium;

const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';
enemy_container.zIndex = medium;

const visual_effects_container = new PIXI.Container();
visual_effects_container.name = 'visual_effects_container';
visual_effects_container.zIndex = -999;

const cutscene_container = new PIXI.Container();
cutscene_container.name = 'cutscene_container';
cutscene_container.zIndex = close;

const gui_container = new PIXI.Container();
gui_container.name = 'gui_container';
gui_container.zIndex = very_close;

const dialog_container = new PIXI.Container();
dialog_container.name = 'dialog_container';
dialog_container.zIndex = close;

const raycasting_container = new PIXI.Container();
raycasting_container.name = 'raycasting_container';
raycasting_container.zIndex = close;

world.addChild(
  visual_effects_container,
  background_container,
  grid_container,
  collision_container,
  non_collision_container,
  door_container,
  critter_container,
  network_player_container,
  friend_container,
  arrow_container,
  enemy_container,
  cutscene_container,
  gui_container,
  dialog_container,
  raycasting_container
);

world.updateLayersOrder();

module.exports = {
  background_container,
  collision_container,
  critter_container,
  gui_container,
  enemy_container,
  door_container,
  arrow_container,
  raycasting_container,
  visual_effects_container,
  grid_container,
  non_collision_container,
};



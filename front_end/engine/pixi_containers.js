'use strict';

const PIXI = require('pixi.js');
const viewport = require('./viewport');

const zIndex_layer = {
  background: 12,
  low: 9,
  medium: 6,
  close: 3,
  very_close: 1,
};

const background_container = new PIXI.Container();
background_container.name = 'background_image';
background_container.zIndex = zIndex_layer.background;

const grid_container = new PIXI.Container();
grid_container.name = 'grid_container';
grid_container.zIndex = zIndex_layer.background;

const collision_container = new PIXI.Container();
collision_container.name = 'collision_items';
collision_container.zIndex = zIndex_layer.low;

const non_collision_container = new PIXI.Container();
non_collision_container.name = 'non_collision_items';
non_collision_container.zIndex = zIndex_layer.low;

const door_container = new PIXI.Container();
door_container.name     = 'door_container';
door_container.zIndex = zIndex_layer.low;

const critter_container = new PIXI.Container();
critter_container.name = 'critter_container';
critter_container.zIndex = zIndex_layer.low;

const network_player_container = new PIXI.Container();
network_player_container.name = 'network_players';

const friend_container = new PIXI.Container();
friend_container.name = 'friend_container';
friend_container.zIndex = zIndex_layer.medium;

const arrow_container = new PIXI.Container();
arrow_container.name = 'arrow_container';
arrow_container.zIndex = zIndex_layer.medium;

const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';
enemy_container.zIndex = zIndex_layer.medium;

const cutscene_container = new PIXI.Container();
cutscene_container.name = 'cutscene_container';
cutscene_container.zIndex = zIndex_layer.close;

const gui_container = new PIXI.Container();
gui_container.name = 'gui_container';
gui_container.zIndex = zIndex_layer.very_close;

viewport.addChild(
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
  gui_container
);

viewport.updateLayersOrder();


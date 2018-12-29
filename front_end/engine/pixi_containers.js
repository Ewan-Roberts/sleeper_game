'use strict';

const PIXI = require('pixi.js');
const viewport = require('./viewport');

const collision_container = new PIXI.Container();
collision_container.name = 'collision_items';
collision_container.zIndex = viewport.zIndex_layer.low;

const non_collision_container = new PIXI.Container();
non_collision_container.name = 'non_collision_items';
non_collision_container.zIndex = viewport.zIndex_layer.low;

const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';
enemy_container.zIndex = viewport.zIndex_layer.medium;

const door_container = new PIXI.Container();
door_container.name     = 'door_container';
door_container.zIndex = viewport.zIndex_layer.low;

const critter_container = new PIXI.Container();
critter_container.name = 'critter_container';

const network_player_container = new PIXI.Container();
network_player_container.name = 'network_players';

const friend_container = new PIXI.Container();
friend_container.name = 'friend_container';
friend_container.zIndex = viewport.zIndex_layer.medium;

const cutscene_container = new PIXI.Container();
cutscene_container.name = 'cutscene_container';
cutscene_container.zIndex = viewport.zIndex_layer.close;


viewport.addChild(
  network_player_container,
  critter_container,
  door_container,
  enemy_container,
  non_collision_container,
  collision_container,
  friend_container,
  cutscene_container
);


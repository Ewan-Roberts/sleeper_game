'use strict';

const PIXI = require('pixi.js');
const pixiPackerParser = require('pixi-packer-parser');

//engine set up
const app = require('./engine/app');
const ticker = require('./engine/ticker');
const viewport = require('./engine/viewport');
//const { register_user } = require('./engine/socket');
const tweenManager = require('pixi-tween');
const load_start_menu = require('./gui/start_menu')


global.document.body.appendChild(app.view);

global.is_development = true;

app.stage.addChild(viewport);

ticker.add(() => PIXI.tweenManager.update());

const loader = new PIXI.loaders.Loader();
loader.use(pixiPackerParser(PIXI));
loader.add('../../images/bedroom_EN_web.json');

const collision_container = new PIXI.Container();
collision_container.name = 'collision_items';
viewport.addChild(collision_container);

const non_collision_container = new PIXI.Container();
non_collision_container.name = 'non_collision_items';
viewport.addChild(non_collision_container);


const enemy_container = new PIXI.Container();
enemy_container.name = 'enemy_container';
enemy_container.zIndex = -10;
viewport.addChild(enemy_container);


const door_container = new PIXI.Container();
door_container.name     = 'door_container';
door_container.zIndex   = -2;
viewport.addChild(door_container);


const critter_container = new PIXI.Container();
critter_container.name = 'critter_container';
viewport.addChild(critter_container);


const network_player_container = new PIXI.Container();
network_player_container.name = 'network_players';
viewport.addChild(network_player_container);



loader.load(async function() {

  //await register_user();
  const { DevelopmentLevel } = require('./level/development/dev_level.js');
  const level_load = new DevelopmentLevel();
  //const development_room = require('./level/debug/debug_layout.js');
  //const debug = require('./level/debug/debug_layout.js');
  //debug.add_floor();
});


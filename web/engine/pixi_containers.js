'use strict';
const { Container } = require('pixi.js');
const { world     } = require('./shadows');

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

const backgrounds  = new Container();
backgrounds.name = 'background_image';
backgrounds.zIndex = background;

const grids = new Container();
grids.name = 'grid_container';
grids.zIndex = background;

const collisions = new Container();
collisions.name = 'collision_items';
collisions.zIndex = low;

const enemys= new Container();
enemys.name = 'enemy_container';
enemys.zIndex = low;

const items = new Container();
items.name = 'non_collision_items';
items.zIndex = medium;

const players = new Container();
players.name = 'player_container';
players.zIndex = medium;

const shrouds = new Container();
shrouds.name = 'shroud_container';
shrouds.zIndex = close;

const visuals = new Container();
visuals.name = 'visuals';
visuals.zIndex = close;

const pads = new Container();
pads.name = 'pad_container';
pads.zIndex = close;

const roofs= new Container();
roofs.name = 'roof_container';
roofs.zIndex = close;

const guis= new Container();
guis.name = 'gui_container';
guis.zIndex = very_close;

world.addChild(
  shrouds,
  visuals,
  roofs,
  backgrounds,
  grids,
  collisions,
  items,
  enemys,
  players,
  guis,
  pads
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

function clear_non_players() {
  clear_level_containers('player_container');
}

module.exports = {
  shrouds,
  visuals,
  roofs,
  backgrounds,
  grids,
  collisions,
  items,
  enemys,
  players,
  guis,
  pads,
  clear_non_players,
};



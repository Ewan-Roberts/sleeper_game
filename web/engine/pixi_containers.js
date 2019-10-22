const PIXI = require('pixi.js');
global.window.PIXI = PIXI;
global.window.PIXI.default = PIXI;

const { Container } = require('pixi.js');
const { viewport, cull  } = require('./app');

// Its easier to edit, so sue me
const {
  background = 12,
  floor      = 10,
  low        = 9,
  medium     = 6,
  close      = 3,
  closer     = 2,
  very_close = 1,
} = {};

// TODO consider depenancy injection
const borders = new Container();
borders.name   = 'border';
borders.zIndex = low;
borders.interactiveChildren = false;

const backgrounds  = new Container();
backgrounds.name   = 'background';
backgrounds.zIndex = background;
backgrounds.interactiveChildren = false;

const decals  = new Container();
decals.name   = 'decal';
decals.zIndex = floor;
decals.interactiveChildren = false;

const grids  = new Container();
grids.name   = 'grid';
grids.zIndex = background;
grids.interactiveChildren = false;

const collisions  = new Container();
collisions.name   = 'collision';
collisions.zIndex = low;
collisions.interactiveChildren = false;

const enemys  = new Container();
enemys.name   = 'enemy';
enemys.zIndex = medium;

const items  = new Container();
items.name   = 'non_collision';
items.zIndex = medium;

const players  = new Container();
players.name   = 'player';
players.zIndex = medium;
players.interactiveChildren = false;

const roofs  = new Container();
roofs.name   = 'roof';
roofs.zIndex = close;
roofs.interactiveChildren = false;

const visuals  = new Container();
visuals.name   = 'visual';
visuals.zIndex = close;

const pads  = new Container();
pads.name   = 'pad';
pads.zIndex = close;

const shrouds  = new Container();
shrouds.name   = 'shroud';
shrouds.zIndex = closer;
shrouds.interactiveChildren = false;

const guis  = new Container();
guis.name   = 'gui';
guis.zIndex = very_close;

const fades = new Container();
fades.name   = 'fades';
fades.zIndex = very_close;


viewport.addChild(
  borders,
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
  decals,
  fades,
  pads
);

viewport.updateLayersOrder();

function clear_level_containers() {
  viewport.children.forEach(child => {
    if(child.name === 'player') {
      return;
    }
    child.removeChildren();
  });
}

class World {
  static add_to(name, sprite) {
    console.log(viewport);
    const container = viewport.getChildByName(name);
    container.addChild(sprite);
    cull.add(sprite);
  }
}

module.exports = {
  borders,
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
  decals,
  fades,
  clear_level_containers,
  World,
};

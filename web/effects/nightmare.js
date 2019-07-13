const { filters  } = require('pixi.js');
const { renderer } = require('../engine/app.js');
const { decals   } = require('../engine/pixi_containers.js');
const { roofs    } = require('../engine/pixi_containers.js');

const colorMatrix = new filters.ColorMatrixFilter();
colorMatrix.autoFit = true;
colorMatrix.greyscale(4);

class Nightmare {
  static on() {
    decals.filters = [colorMatrix];
    roofs.children.forEach(roof => roof.tint = 0x000000);
    renderer.backgroundColor = 0xff0000;
  }

  static off() {
    decals.filters = [];
    roofs.children.forEach(roof => roof.tint = 0xffffff);
    renderer.backgroundColor = 0x000000;
  }
}

module.exports = {
  Nightmare,
};

const { filters  } = require('pixi.js');
const { renderer } = require('../engine/app.js');
// TODO
const { decals   } = require('../engine/pixi_containers.js');
const { roofs    } = require('../engine/pixi_containers.js');
const { collisions    } = require('../engine/pixi_containers.js');
const { backgrounds    } = require('../engine/pixi_containers.js');


const night_matrix = new filters.ColorMatrixFilter();
night_matrix.autoFit = true;
night_matrix.night(0.4);
night_matrix.alpha = 0.7;

class Night {
  static on(amount = 0.45) {
    roofs.children.forEach(roof => roof.tint = 0xa9a9a9);
    backgrounds.filters = [ night_matrix ];
    // roofs.filters = [ night_matrix ];
    collisions.filters = [ night_matrix ];
    decals.filters = [ night_matrix ];
    night_matrix.alpha = amount;
  }

  static off(amount = 0.5) {
    roofs.filters = null;
    collisions.filters = null;
    decals.filters = null;
    backgrounds.filters = null;
    night_matrix.alpha = amount;
    roofs.children.forEach(roof => roof.tint = 0xffffff);
  }
}

const grey_matrix = new filters.ColorMatrixFilter();
grey_matrix.autoFit = true;
grey_matrix.greyscale(4);

class Nightmare {
  static on() {
    Night.off();
    decals.filters = [ grey_matrix ];
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
  Night,
};

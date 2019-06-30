const { world } = require('./shadows');

class Camera {
  constructor() {
    this.name = 'camera';
  }

  static set_center({ x, y }) {
    world.position.set(
      -x + global.window.innerWidth/2,
      -y + global.window.innerHeight/2
    );
  }
}

module.exports = {
  Camera,
};

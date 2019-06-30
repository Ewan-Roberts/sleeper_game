
const { PathSprite    } = require('../types/path');
const { Animation     } = require('../attributes/animation');
const { rodent_frames } = require('../animations/rat');

class PathRat extends PathSprite {
  constructor(data) {
    super(data);
    this.add_component(new Animation(this, rodent_frames));
    this.width  /= 3;
    this.height /= 3;

    this.animation.wait();
  }
}

module.exports = {
  PathRat,
};


'use strict';

class Cutscene {
  constructor(sprite) {
    this.name = 'cutscene_manager';
    this.sprite = sprite;
  }

  facing(direction) {
    switch(direction) {
      case 'up':
        this.sprite.rotation = 4.17;
        return;
      case 'right':
        this.sprite.rotation = 0;
        return;
      case 'down':
        this.sprite.rotation = 1.57;
        return;
      case 'left':
        this.sprite.rotation = 3.14;
        return;
    }
  }
}

module.exports = {
  Cutscene,
};

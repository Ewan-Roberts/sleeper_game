'use strict';

class Track {
  constructor(filename) {
    this.audio = new global.Audio('audio/' + filename);
  }

  play() {
    this.audio.play();
  }

  set volume(volume) {
    this.audio.volume = volume;
  }
}

module.exports = {
  Track,
};

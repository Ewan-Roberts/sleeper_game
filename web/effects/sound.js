'use strict';

class Track {
  constructor(filename) {
    this.name = 'sound';

    this.audio = new global.Audio('audio/' + filename);
  }

  play() {
    this.audio.play();
  }

  mute() {
    this.audio.volume = 0;
  }

  set volume(volume) {
    this.audio.volume = volume;
  }
}

module.exports = {
  Track,
};

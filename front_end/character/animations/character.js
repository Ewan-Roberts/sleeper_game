'use strict';

const PIXI = require('pixi.js');

class character_animations {

  static bow_idle_frames() {
    const bow_frames = [];
    for (let i = 0; i <= 21; i += 1) {
      let name = `survivor-bow-idle-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-idle-${i}`;
      }
      bow_frames.push(PIXI.Texture.fromFrame(name));
    }
    return bow_frames;
  }

  static bow_ready_frames() {
    const ready_frames = [];
    for (let i = 0; i <= 38; i += 1) {
      let name = `survivor-bow-pull-0${i}`;

      if (i >= 10) {
        name = `survivor-bow-pull-${i}`;
      }

      ready_frames.push(PIXI.Texture.fromFrame(name));
    }
    return ready_frames;
  }

  static bow_walk_frames() {
    const walk_frames = [];
    for (let i = 0; i <= 20; i += 1) {
      let name = `survivor-walk_bow_0${i}`;

      if (i >= 10) {
        name = `survivor-walk_bow_${i}`;
      }
      walk_frames.push(PIXI.Texture.fromFrame(name));
    }
    return walk_frames;
  }

  static knife_idle_frames() {
    const enemy_frames = [];

    for (let i = 0; i < 19; i++) {
      enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
    }

    return enemy_frames;
  }

  static idle_frames() {
    const idle_frames = [];
    for (let i = 0; i <= 21; i++) {
      let name = `survivor-idle_0${i}`;

      if (i >= 10) {
        name = `survivor-idle_${i}`;
      }
      idle_frames.push(PIXI.Texture.fromFrame(name));
    }
    return idle_frames;
    //const reversed = idle_frames.reverse();
    //return idle_frames.concat(reversed);
  }

  static walk_frames() {
    const walk_frames = [];
    for (let i = 0; i <= 19; i++) {
      const name = `survivor-move_knife_${i}`;

      walk_frames.push(PIXI.Texture.fromFrame(name));
    }

    return walk_frames;
  }

}

module.exports = {
  bow: {
    idle:   character_animations.bow_idle_frames(),
    walk:   character_animations.bow_walk_frames(),
    ready:  character_animations.bow_ready_frames(),
  },
  nothing: {
    idle:   character_animations.idle_frames(),
  },
  knife: {
    idle:  character_animations.knife_idle_frames(),
  },
};





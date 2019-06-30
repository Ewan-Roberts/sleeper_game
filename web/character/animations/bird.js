const { Texture } = require('pixi.js');

const move = [
  Texture.fromFrame('bird_0'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_9'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_9'),

  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_0'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_4'),
  Texture.fromFrame('bird_3'),

  Texture.fromFrame('bird_9'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_9'),
  Texture.fromFrame('bird_3'),
  Texture.fromFrame('bird_2'),
  Texture.fromFrame('bird_1'),
  Texture.fromFrame('bird_0'),
];

const wait = [
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_5'),
  Texture.fromFrame('bird_10'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_6'),
  Texture.fromFrame('bird_7'),
  Texture.fromFrame('bird_10'),
];

const dead = [ Texture.fromFrame('bird_8') ];

const bird_frames = { move, wait, dead };

module.exports = {
  bird_frames,
};

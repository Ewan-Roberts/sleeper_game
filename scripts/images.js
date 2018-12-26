'use strict';

const pngQuant = require('imagemin-pngquant');

module.exports = {
  scales: {
    web: { scale: 0.5, resolution: 1 },
  },

  variations: ['EN'],

  loading_stages: ['bedroom'],

  group_default: {
    max_width: 3000, // default: 2048
    max_height: 5500, // default: 1024
    oversized_warning: true, // default: false
    trim: false,
    padding: 0, // default: 1
  },

  groups: [
    {
      id: 'level_bedroom',
      variation: 'EN',
      loading_stage: 'bedroom',
      compressor: pngQuant(),
      sprites: [
        '../assets/**/*.jpg',
        '../assets/**/*.png',
      ],
    },
  ],
};

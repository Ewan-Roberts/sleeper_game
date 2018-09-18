/* eslint-env node */
const pngQuant = require('imagemin-pngquant');
// const jpegTran = require('imagemin-jpegtran');

module.exports = {
  /**
     * This defines a set of scales. For every scale a full set of
     * spritesheets will be generated. The "resolution" field is passed
     * through to PIXI.
     * */
  scales: {
    web: { scale: 0.5, resolution: 1 },
  },

  /**
     * Variations can be used for themes or languages. Sprites that are
     * not part of one variation will be included in all of them.
     * */
  variations: ['EN'],

  /**
     * Different loading stages mean the game can started before all
     * images have been loaded. Remaining images can be loaded while
     * the user makes decisions or the game is going on.
     * */
  loading_stages: ['bedroom'],

  group_default: {
    max_width: 3000, // default: 2048
    max_height: 5500, // default: 1024
    oversized_warning: true, // default: false
    trim: true,
    padding: 1, // default: 1
  },

  /**
     * Groups are units of images that fall into the same category in respect to
     * - Variations: EN, DE, or (if not defined) both. If an array is provided
     *               the group will be added to all of the listed variations
     * - JPEG: true/false (e.g. do we need an alpha channel?)
     * - loading stage (see above)
     * - quality
     *
     * All paths are relative to this file
     * */
  groups: [

    {
      id: 'level_bedroom',
      variation: 'EN',
      loading_stage: 'bedroom',
      compressor: pngQuant(),
      sprites: [
        'assets/**/*.jpg',
        'assets/**/*.png',
      ],
    },
  ],
};

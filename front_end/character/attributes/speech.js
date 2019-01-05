'use strict';

const viewport = require('../../engine/viewport');
const PIXI = require('pixi.js');

class Speech {
  speak_above_sprite(sprite, text) {
    const render_text = new PIXI.Text(text);
    render_text.x = sprite.x - 100;
    render_text.y = sprite.y - 80;
    render_text.alpha = 1;
    viewport.getChildByName('cutscene_container').addChild(render_text);
  }
}

module.exports = {
  Speech,
};
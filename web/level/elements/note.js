'use strict';
const PIXI = require('pixi.js');

const { Item } = require('./item_model');

class Note extends Item {
  constructor() {
    super('full-note-written-small');

    this.dom_note = global.document.querySelector('.note');
    this.dom_note.addEventListener('click', () => {
      this.hide();
    });
  }

  with_action_on_click() {
    this.sprite.click = () => {
      this.sprite.texture = PIXI.Texture.fromFrame('full-note-written-small-read');

      this.show();
    };
  }

  show() {
    this.dom_note.style.display = 'block';
  }

  hide() {
    this.dom_note.style.display = 'none';
  }
}

module.exports = {
  Note,
};

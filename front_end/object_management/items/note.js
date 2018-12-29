'use strict';

const PIXI = require('pixi.js');

const { Item } = require('./item_model');

class Note extends Item {
  constructor() {
    super();
    this.image_state = {
      un_read:  PIXI.Texture.fromFrame('full-note-written-small'),
      read:     PIXI.Texture.fromFrame('full-note-written-small-read'),
    };

    this.sprite = new PIXI.Sprite(this.image_state.un_read);

    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = -5;
    this.sprite.name = 'note';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.state = 'closed';

    this.dom_note = global.document.querySelector('.note');
    this.dom_note.addEventListener('click', () => {
      this.hide();
    });
  }

  with_action_on_click() {
    this.sprite.click = () => {
      this.sprite.texture = this.image_state.read;

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

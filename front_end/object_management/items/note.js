'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport.js');

const container = new PIXI.Container();
container.name = 'item_container'; //todo
container.zIndex = -6;
viewport.addChild(container);


class Note {
  constructor({ x, y }) {
    this.image_state = {
      un_read:  PIXI.Texture.fromFrame('full-note-written-small'),
      read:     PIXI.Texture.fromFrame('full-note-written-small-read'),
    };

    this.sprite = new PIXI.Sprite(this.image_state.un_read);
    this.sprite.position.set(x, y);

    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = -5;
    this.sprite.name = 'note';
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.state = 'closed';

    container.addChild(this.sprite);

    this.dom_note = global.document.querySelector('.note');
    this.dom_note.addEventListener('click', () => {
      this.hide();
    });
  }

  add_state_handling() {
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

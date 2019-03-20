'use strict';
const PIXI = require('pixi.js');

const { Selector } = require('../../utils/dom');
const { Item     } = require('./item_model');

class Note extends Item {
  constructor() {
    super('full-note-written-small');
    this.sprite.name = 'note';
    this.sprite.zIndex = -5;

    this._add_state_handling();
    this.dom_note = new Selector('.note');
    this.dom_note.event('click', function() {
      this.hide();
    });
  }
}

module.exports = {
  Note,
};

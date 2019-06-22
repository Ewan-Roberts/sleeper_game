'use strict';

const { Select, SelectAll } = require('../utils/dom.js');

class MicrophonePopUp {
  constructor() {
    this.buttons      = new SelectAll('.microphone_alert button');
    this.pop_up       = new Select('.microphone_alert');
    const close_cross = new Select('.microphone_alert h2');
    close_cross.on('mouseenter', () => close_cross.hide());
    this.pop_up.hide();
    this.showable = true;
  }

  set opacity(value) {
    this.pop_up.opacity = value;
  }

  show() {
    if(!this.showable) return;
    this.pop_up.show();
  }

  hide() {
    this.pop_up.hide();
  }

  set click(func) {
    for(const button of this.buttons.element) {
      button.addEventListener('click', func);
    }
  }
}

module.exports = {
  MicrophonePopUp,
};

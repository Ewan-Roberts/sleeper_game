'use strict';

const { select } = require('../utils/dom');
const dialog_caption_holder = select('.dialog_caption_holder');

class Caption {
  static render(sentence) {
    if(this.ready === false) return;
    this.ready = false;
    this.show();
    this.clear();

    const letters = sentence.split('');
    let current_text = '';
    let i = 0;

    const wait_to_hide = () => setTimeout(() => {
      this.hide();
      this.ready = true;
    },2000);

    this.timer = setInterval(() => {
      current_text += letters[i];
      dialog_caption_holder.innerHTML = current_text;

      i++;
      if (i >= sentence.length) {
        clearInterval(this.timer);
        wait_to_hide();
      }
    }, 80);
  }

  static clear() {
    dialog_caption_holder.children.innerHTML = '';
  }

  static show() {
    dialog_caption_holder.style.display = 'block';
  }

  static hide() {
    dialog_caption_holder.style.display = 'none';
  }
}

module.exports = {
  Caption,
};


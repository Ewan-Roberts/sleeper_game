const { select } = require('../utils/dom');
const dialog_caption_holder = select('.dialog_caption_holder');

// TODO Move this into canvas
class Caption {
  static render(sentence) {
    this.clear();
    this.show();
    dialog_caption_holder.innerHTML = sentence;

    setTimeout(() => this.hide(),3000);
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


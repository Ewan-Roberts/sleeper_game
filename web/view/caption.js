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

    let start = null;
    function step(timestamp) {
      if(!start) start = timestamp;
      current_text += letters[i];
      dialog_caption_holder.innerHTML = current_text;
      i++;
      if(i < sentence.length) {
        global.window.requestAnimationFrame(step);
        wait_to_hide();
      }
    }

    global.window.requestAnimationFrame(step);
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


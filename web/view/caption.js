const { select } = require('../utils/dom');
const dialog_caption_holder = select('.dialog_caption_holder');

class Caption {
  static render(sentence) {

    // dialog_caption_holder.style.display = 'block';
    // dialog_caption_holder.children.innerHTML = '';
    // dialog_caption_holder.innerHTML = sentence;

    // setTimeout(() => dialog_caption_holder.style.display = 'none',3000);
    // if(this.ready === false) return;
    // this.ready = false;
    // this.show();
    // this.clear();

    // const letters = sentence.split('');
    // let current_text = '';
    // let i = 0;

    // const wait_to_hide = () => setTimeout(() => {
    //   if(this.ready) return;
    //   this.hide();
    //   this.ready = true;
    //   console.log('2');
    // },5000);

    // let start = null;
    // function step(timestamp) {
    //   if(!start) start = timestamp;
    //   current_text += letters[i];
    //   dialog_caption_holder.innerHTML = current_text;
    //   i++;
    //   if(i < sentence.length) {
    //     global.window.requestAnimationFrame(step);
    //     console.log('1');
    //     wait_to_hide();
    //   }
    //   console.log('1');
    // }

    // global.window.requestAnimationFrame(step);
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


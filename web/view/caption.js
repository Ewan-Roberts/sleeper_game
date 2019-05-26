'use strict';

const worker_timer = require('worker-timers');
const { select } = require('../utils/dom');
const dialog_caption_holder = select('.dialog_caption_holder');

class Caption_Dialog {
  play_audio_track(track) {
    const track_to_play = new global.Audio('audio/'+track);
    track_to_play.play();
  }

  show() {
    dialog_caption_holder.style.display = 'block';
  }

  hide() {
    dialog_caption_holder.style.display = 'none';
  }

  split_sentence_string(sentence) {
    const text_array = sentence.split('');

    return text_array;
  }

  create_text_timeout(text_array) {
    let i = 0;
    let current_text = '';
    if(this.running) return;
    this.text_timer = worker_timer.setInterval(()=> {
      if(i % 50 === 0){
        current_text = '';
      }

      if(i === text_array.length){
        worker_timer.clearInterval(this.text_timer);
        this.running = false;
        return;
      }

      current_text += text_array[i];
      dialog_caption_holder.innerHTML = current_text;
      i++;
    }, 75);
    this.running = true;
  }

  render_text(text) {
    const sentence_array = this.split_sentence_string(text);

    this.create_text_timeout(sentence_array);
  }

  clear_text() {
    dialog_caption_holder.children.innerHTML = '';
  }
}

module.exports = {
  Caption_Dialog,
};

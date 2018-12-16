'use strict';

const torn_note = global.document.querySelector('.torn_note');

class Note {
  constructor() {
    torn_note.addEventListener('click', ()=>{
      this.hide();
    });
  }
  
  show() {
    torn_note.style.display = 'block';
  }
 
  hide() {
    torn_note.style.display = 'none';
  }
}

new Start_Menu();

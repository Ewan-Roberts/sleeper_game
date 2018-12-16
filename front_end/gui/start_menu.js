'use strict';


const start_menu = global.document.querySelector('.start_menu');
const start_button = global.document.querySelector('.start_button');
const cutscene = require('./cutscene/start');

class Start_Menu {
  constructor() {
    start_button.addEventListener('click', ()=>{
      this.start_button_click();
    });
  }

  start_button_click() {
    start_menu.style.display = 'none';
  }
}

new Start_Menu();






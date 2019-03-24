'use strict';

class Selector {
  constructor(name){
    this.element = global.document.querySelector(name);
  }

  set width(value){
    this.element.style.width = value;
  }

  set opacity(value){
    this.element.style.opacity = value / 100;
  }

  get value(){
    return this.element.value;
  }

  set display(value) {
    this.element.style.display = value;
  }

  hide() {
    this.element.style.display = 'none';
  }

  event(name, func) {
    this.element.addEventListener(name, func);
  }

  set innerHTML(value) {
    this.element.innerHTML = value;
  }
}

module.exports = {
  Selector,
};

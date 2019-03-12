'use strict';

class Selector {
  constructor(name){
    this.element = this._element(name);
  }

  _element(name) {
    global.document.querySelector(name);
  }

  set width(value){
    this.element.style.width = value;
  }

  set opacity(value){
    this.element.style.opacity = value / 100;
  }

  set display(value) {
    this.element.style.display = value;
  }

  set innerHTML(value) {
    this.element.innerHTML = value;
  }
}

module.exports = {
  Selector,
};

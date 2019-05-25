'use strict';

class Select {
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

function select(name) {
  return global.document.querySelector(name);
}

function select_all(name) {
  return global.document.querySelectorAll(name);
}

module.exports = {
  Select,
  select,
  select_all,
};

'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const ticker = require('../../engine/ticker');

const { Character } = require('../character_model');
const { Vitals    } = require('../attributes/vitals');
const { Predator  } = require('../attributes/predator');

function construct(BaseClass, ...Mixins) {

  function copyProperties(target, source) {
    const allPropertyNames = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));

    allPropertyNames.forEach((propertyName) => {
      if (propertyName.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
        return;
      Object.defineProperty(target, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
    });
  }

  class Base extends BaseClass
  {
    constructor (...args) {
      super(...args);

      Mixins.forEach((Mixin) => {
        copyProperties(this, new Mixin(...args));
      });
    }
  }

  Mixins.forEach((Mixin) => {
    copyProperties(Base.prototype, Mixin.prototype);
  });

  return Base;
}

class Enemy extends construct(Character, Vitals, Predator) {
  constructor() {
    super();
    this.name = 'poo man';
  }

  sayAB() {
    return this.name;
  }
}


module.exports = {
  Enemy,
};

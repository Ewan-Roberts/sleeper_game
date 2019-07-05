const { sleep } = require('../utils/time.js');

class Generator {
  constructor(function_array) {
    this.iterator = this.generator();
    this.script   = function_array;
  }

  async * generator() {
    while(this.script.length > 0) {
      const execute = this.script.splice(0,1);
      execute();
      yield;
    }
  }

  next() {
    this.iterator.next();
  }
}

// what this will loook like
// you have a series of consentric area squares around a charater
// each time you touch one of these pads you nove forward in the script

module.exports = {
  Generator,
}

'use strict';

class Script {
  constructor(data) {
    this.name = 'script';

    this.data = this.generate(data);
  }

  *generate(data) {
    for (let i = 0; i < data.length; i++) {
      yield data[i];
    }
  }

  speak() {
    console.log(this.data.next().value);
  }

  next() {
    const next_step = this.data.next().value;
    if(next_step) {
      next_step();
    }
  }
}

module.exports = {
  Script,
};


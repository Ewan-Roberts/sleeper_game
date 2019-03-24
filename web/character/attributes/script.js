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
}

module.exports = {
  Script,
};


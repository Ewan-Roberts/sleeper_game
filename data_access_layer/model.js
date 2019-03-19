'use strict';

class Database {

  static get(info) {

  }

  static create(info) {

  }

  static update(info) {

  }

  static upsert(info) {
    const exists = this.get(info);

    if(exists) {
      return this.update(info);
    }

    return this.update(info);
  }
}

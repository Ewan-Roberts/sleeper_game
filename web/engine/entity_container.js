'use strict';

const entities = [];

class Entity_Container {
  constructor() {
    this.entities = [];
  }

  static add(entity) {
    entities.push(entity);
  }

  static get() {
    return entities;
  }
}

module.exports = {
  Entity_Container,
};

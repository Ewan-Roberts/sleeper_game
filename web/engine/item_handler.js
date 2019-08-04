const event = require('events');
const item_events = new event();

class Items {
  constructor(id) {
    this.items  = [];
    this.id     = id;
    this.events = new event();
  }

  give(item) {
    this.items.push(item);
  }

  find(id) {
    return this.items.find(item => item.id === id);
  }

  remove(id) {
    const index = this.items.findIndex(item => item.id === id);

    this.items.splice(index, 1);
  }

  includes(id) {
    this.items.some(item => item.id === id);
  }

  take_items(name) {
    const index = this.items.map(item => item.name).indexOf(name);
    const result = this.items.splice(index,1);

    return result;
  }
}

module.exports = {
  Items,
  item_events,
};

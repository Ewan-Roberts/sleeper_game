'use strict';

const category_enum = {
  food:     ['Eat',   'Cook', 'Describe'],
  fuel:     ['Use',   'Fuel', 'Describe'],
  material: ['Drop',          'Describe'],
  ammo:     ['Load',  'Drop', 'Describe'],
  weapon:   ['Equip', 'Drop', 'Describe'],
  armour:   ['Equip', 'Drop', 'Describe'],
};

class Item_Menu {
  constructor() {
    this.menu_container = global.document.querySelector('.item_menu');

    this.menu_container.onmouseleave = () => this.hide();
  }

  set_position({x,y}) {
    this.menu_container.style.left = x+'px';
    this.menu_container.style.top  = y+'px';
  }

  show() {
    this.menu_container.style.display = 'block';
  }

  hide() {
    this.menu_container.style.display = 'none';
  }

  populate({ category }) {
    this._clear();
    const options = category_enum[category];

    options.forEach(text => {
      const option = global.document.createElement('div');
      option.setAttribute('class', 'item_option');

      option.onclick = () => this.hide();

      const option_text = global.document.createTextNode(text);
      option.appendChild(option_text);
      this.menu_container.appendChild(option);
    });
  }

  _clear() {
    const item_options = global.document.querySelectorAll('.item_menu .item_option');

    item_options.forEach(option => option.remove());
  }
}

module.exports = {
  Item_Menu,
};

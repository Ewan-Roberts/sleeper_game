'use strict';
const PIXI = require('pixi.js');

const { collision_container, item_container } = require('../../engine/pixi_containers');

//TODO this needs to be the parent of the elements in this folder
class Item {
  constructor(name) {
    this.texture = PIXI.Texture.fromImage(name);
    this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.width  = 50;
    this.sprite.height = 50;
    this.sprite.anchor.set(0.5);
  }

  add_component(component) {
    this[component.name] = component;
  }

  // This is passing in a function
  // and this is amazing
  set click(action) {
    this.sprite.interactive = true;
    this.sprite.buttonMode  = true;

    if(this.shade) {
      this.shade.interactive = true;
      this.shade.buttonMode = true;
      this.shade.click  = action;
    }

    this.sprite.click = action;
  }

  remove_click() {
    this.sprite.interactive = false;
    this.sprite.buttonMode  = false;
  }

  //TODO this is to quickly add items
  add() {
    item_container.addChild(this.sprite);
  }

  set height(value) {
    this.sprite.height = value;

    if(this.shade) {
      this.shade.height = value;
    }
  }

  set anchor(value) {
    this.sprite.anchor.set(value);

    if(this.shade) {
      this.shade.anchor.set(value);
    }
  }

  set width(value) {
    this.sprite.width = value;

    if(this.shade) {
      this.shade.width = value;
    }
  }
  //TODO Refactor
  set dragable(state) {
    if(!state) throw 'dragable remove is not implemented';

    this.drag_start = (event) => {
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.on('pointerdown', this.drag_start);
      if(this.placed) {
        this.click();
        return;
      }

      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
    };

    this.drag_end = () => {
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.on('pointerup', this.drag_end);
      this.data = null;
      this.alpha = 1;
      this.dragging = false;
      this.placed = true;
    };

    this.drag_move = () => {
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.on('pointermove', this.drag_move);
      if(this.dragging) {
        const new_position = this.data.getLocalPosition(this.parent);
        this.x = new_position.x;
        this.y = new_position.y;
      }
    };
  }

  set alpha(value) {
    this.sprite.alpha = value;

    if(this.shade) {
      this.shade.alpha = value;
    }
  }


  set rotation(value) {
    this.sprite.rotation = value;

    if(this.shade) {
      this.shade.rotation = value;
    }
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    if(this.shade) {
      this.shade.position.set(x, y);
    }
  }

  set shadow(state) {
    if(!state && this.shade) {
      collision_container.removeChild(this.shade);
    }

    this.shade = new PIXI.Sprite(this.texture);
    this.shade.parentGroup = PIXI.shadows.casterGroup;
    this.shade.position.copy(this.sprite);
    this.shade.width = 300;
    this.shade.height = 20;
    this.shade.anchor.set(0.5);

    collision_container.addChild(this.shade);
  }

  set state_handling(bool) {
    if(bool) this._add_state_handling();
  }

  _add_state_handling() {
    this.click = () => {
      switch(this.state) {
        case 'closed': this._open();  break;
        case 'full'  : this._empty(); break;
      }
    };
  }

  _open() {
    if(this.state === 'open') return;
    this.state = 'open';

    global.set_light_level(1);
    this.loot.populate();
    this.loot.show();
  }

  _empty() {
    this.state = 'empty';
  }

  fill() {
    this.state = 'full';
  }

}

module.exports = {
  Item,
};


'use strict';
const {Text,Sprite} = require('pixi.js');

const { guis } = require('../engine/pixi_containers');

//TODO move to seperate file
class Label extends Text{
  constructor(text) {
    super(text, {
      fontSize: 20,
      fill: '#D2D8D7',
      fontVariant: 'small-caps',
      stroke: '#4a1850',
      lineJoin: 'round',
      strokeThickness: 5,
    });
    this.anchor.set(0.5);
    guis.addChild(this);
  }
}


class Button {
  constructor({label_action, label_description, label_image, visible}) {
    this.name = 'button';

    if(label_action) {
      this.action_label = new Label(label_action);
    }
    if(label_description) {
      this.description_label = new Label(label_description);
    }

    this.sprite = Sprite.fromFrame(label_image);
    this.sprite.anchor.set(0.5);
    this.sprite.height = 30;
    this.sprite.width  = 30;

    this.visible = visible || true;
    guis.addChild(this.sprite);
  }

  set_position({x, y}) {
    this.sprite.position.set(x, y);

    if(this.action_label) {
      this.action_label.position.copy({x, y: y+30});
    }
    if(this.description_label) {
      this.description_label.position.copy({x, y: y-30});
    }
  }

  set visible(bool) {
    this.sprite.visible = bool;

    if(this.action_label) {
      this.action_label.visible = bool;
    }
    if(this.description_label) {
      this.description_label.visible = bool;
    }
  }
  destroy() {
    this.description_label.destroy();
    this.action_label.destroy();
    this.sprite.destroy();
  }
  remove() {
    guis.removeChild(this.sprite);

    if(this.action_label) {
      this.action_label.remove();
    }

    if(this.description_label) {
      this.description_label.remove();
    }
  }
}

module.exports = {
  Button,
};

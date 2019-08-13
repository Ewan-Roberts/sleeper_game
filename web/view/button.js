const { Text, Sprite, Texture } = require('pixi.js');
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

class Button extends Sprite {
  constructor({
    label_action,
    label_description,
    label_image,
  }) {
    super(Texture.fromImage(label_image));

    this.name   = 'button';
    this.height = 30;
    this.width  = 30;
    this.anchor.set(0.5);

    if(label_action) {
      this.action_label = new Label(label_action);
    }
    if(label_description) {
      this.description_label = new Label(label_description);
    }

    // Start invisible
    this.visible = false;
    guis.addChild(this);
  }

  set_position({x, y}) {
    this.position.copy(x, y);

    if(this.action_label) {
      this.action_label.position.copy({x, y: y+30});
    }
    if(this.description_label) {
      this.description_label.position.copy({x, y: y-30});
    }
  }

  set visible(bool) {
    super.visible = bool;

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
}

module.exports = {
  Button,
};

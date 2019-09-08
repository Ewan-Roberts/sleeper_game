const { Text, Sprite, Texture } = require('pixi.js');
const { guis } = require('../engine/pixi_containers');

// TODO move to seperate file
class Label extends Text{
  constructor(text) {
    super(text, {
      'fontSize'       : 15,
      'fill'           : '#D2D8D7',
      'fontVariant'    : 'small-caps',
      'lineJoin'       : 'round',
      'strokeThickness': 4,
    });

    this.anchor.set(0.5);
    guis.addChild(this);
  }
}

class Button extends Sprite {
  constructor(sprite, {
    label_action,
    label_description,
    label_image,
  }) {
    super(Texture.fromImage(label_image));

    this.sprite = sprite;
    this.sprite.on('mouseover', () => {
      this.sprite.tint = 0xffffff;
      this.set_position(this.sprite);
      this.show();
    });
    this.sprite.on('mouseout', () => {
      this.sprite.tint = 0xd3d3d3;
      this.hide();
    });
    this.sprite.on('click', () => {
      this.sprite.tint = 0xd3d3d3;
      this.hide();
    });

    this.name   = 'button';
    this.height = 20;
    this.width  = 20;
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

  set_position({ x, y }) {
    this.position.copy({ x, y });

    if(this.action_label) {
      this.action_label.position.copy({ x, 'y': y + 22 });
    }
    if(this.description_label) {
      this.description_label.position.copy({ x, 'y': y - 22 });
    }
  }

  hide() {
    this.visible = false;
    if(this.action_label) {
      this.action_label.visible = false;
    }
    if(this.description_label) {
      this.description_label.visible = false;
    }
  }

  show() {
    this.visible = true;
    if(this.action_label) {
      this.action_label.visible = true;
    }
    if(this.description_label) {
      this.description_label.visible = true;
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

const { items         } = require('../../engine/pixi_containers');
const { collisions    } = require('../../engine/pixi_containers');
const { players    } = require('../../engine/pixi_containers');

const { Inventory } = require('../../character/attributes/inventory');
const { Button    } = require('../../view/button');
const { Note      } = require('../../view/overlay_object');
const { Caption   } = require('../../view/caption');
const { Sprite, Texture } = require('pixi.js');

class Chest extends Sprite {
  constructor(data) {
    const { properties } = data;
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * (Math.PI/180);
    this.alpha    = properties && properties.alpha || 1;
    this.anchor.set(0, 1);

    this.position.copy(data);
    this.interactive = true;

    if(data.type === 'note') {
      this.on('click', () => new Note(properties))
    };

    if(properties.equip_on_click) {
      this.click = () => {
        players.children[0].events.emit('equip_weapon', properties);
        this.destroy();
      };
    }

    if(properties.label) this.label(properties);

    if(properties.dialog_on_click) this.on('click', () => {
      Caption.render(properties.dialog_on_click);
    });

    if(properties.remove_on_click) this.on('click', () => {
      this.destroy();
    });

    if(properties.container) {
      this.container(properties);
    }

    if(properties.collision) {
      collisions.addChild(this);
    }

    items.addChild(this);
  }

  container(properties) {
    this.inventory = new Inventory(properties);
    this.on('click', () => {
      this.button.visible = false;
      this.inventory.set_position(this);
      this.inventory.fade_in();
    };
  }

  label(properties) {
    this.tint = 0xd3d3d3;
    this.button = new Button(properties);
    this.on('mouseover', () => {
      this.tint = 0xffffff;
      this.button.set_position(this);
      this.button.visible = true;
    });
    this.on('mouseout', () => {
      this.tint = 0xd3d3d3;
      this.button.visible = false;
    });
    this.on('click', () => {
      this.tint = 0xd3d3d3;
      this.button.visible = false;
    };
  }

  remove() {
    this.button.destroy();
    this.destroy();
  }
}

module.exports = {
  Chest,
};

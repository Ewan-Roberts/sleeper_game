const { items      } = require('../../engine/pixi_containers');
const { collisions } = require('../../engine/pixi_containers');
const { players    } = require('../../engine/pixi_containers');

const { Inventory } = require('../../character/attributes/inventory');
const { Button    } = require('../../view/button');
const { Note      } = require('../../view/overlay_object');
const { Caption   } = require('../../view/caption');
const { sound, Sprite, Texture, DEG_TO_RAD } = require('pixi.js');

class Chest extends Sprite {
  constructor(data) {
    super(Texture.fromImage(data.image_name));
    this.id       = data.id;
    this.height   = data.height;
    this.width    = data.width;
    this.rotation = data.rotation * DEG_TO_RAD;
    this.alpha    = data.alpha || 1;
    this.anchor.set(0, 1);

    this.position.copy(data);
    this.interactive = true;
    if(data.type === 'note') this.on('click', () => {
      new Note(data);
      sound.play('page_turn');
    });

    if(data.equip_on_click) {
      this.click = () => {
        players.children[0].events.emit('equip_weapon', data);
        this.destroy();
      };
    }

    if(data.label) this.label(data);

    if(data.dialog_on_click) this.on('click', () => {
      Caption.render(data.dialog_on_click);
    });

    if(data.remove_on_click) this.on('click', () => {
      this.destroy();
    });

    if(data.container) {
      this.container(data);
    }

    if(data.collision) {
      collisions.addChild(this);
    }

    items.addChild(this);
  }

  container(data) {
    this.inventory = new Inventory(data);
    this.on('click', () => {
      this.button.visible = false;
      this.inventory.set_position(this);
      this.inventory.fade_in();
    });
  }

  label(data) {
    this.tint = 0xd3d3d3;
    this.button = new Button(data);
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
    });
  }

  remove() {
    this.button.destroy();
    this.destroy();
  }
}

module.exports = {
  Chest,
};

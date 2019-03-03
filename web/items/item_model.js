'use strict';
const PIXI = require('pixi.js');

const { collision_container } = require('../engine/pixi_containers');

class Item {
  constructor(name) {
    this.texture = PIXI.Texture.fromImage(name);
    this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.width  = 50;
    this.sprite.height = 50;
    this.sprite.anchor.set(0.5);

  }

  set height(value) {
    this.sprite.height = value;

    if(this.shade) {
      this.shade.height = value;
    }
  }

  set width(value) {
    this.sprite.width = value;

    if(this.shade) {
      this.shade.width = value;
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
}

module.exports = {
  Item,
};



// function condition () {}
// function cost() {}
// function cost() {}
// function rank() {}

// class Item {
//   pool(...args) {}
//   id() {}
//   melee() {}
//   ranged() {}
//   primary() {}
//   secondary() {}
//   material() {}
//   hat() {}
//   head() {}
//   slot() {}
//   feet() {}
//   chest() {}
//   util() {}
//   type() {}
//   all() {}
//   extract_image() {}
//   by_name() {}
//   by_image_name() {}
//   random() {}
// }

// const { Image } = require('../engine/image');

// const knife = {
//   name:           'rusty_knife',
//   animation_name: 'knife',
//   id:             1001,
//   rank:           0,
//   cost:           50,
//   category:       'primary',
//   range:          20,
//   damage:         10,
//   speed:          400,
//   condition:      100,

//   visual_name:    'rusty knife',
//   description:    'The rusty knife someone sharpened on what looks like a rock',
//   image_name:     'rusty_knife',
// };



// class Item {
//   constructor(attribute) {
//     this.name        = attribute.name;
//     this.visual      = attribute.visual;
//     this.image       = new Image(attribute.name);

//     this.id          = attribute.id;
//     this.cost        = attribute.cost;
//     this.category    = attribute.category;
//     this.description = attribute.description;
//   }

// }


// class Weapon extends Item {
//   constructor(...args) {
//     super(...args);

//     this.rank        = args[0].rank;
//     this.range       = args[0].range;
//     this.damage      = args[0].damage;
//     this.speed       = args[0].speed;
//     this.condition   = args[0].condition;
//   }
// }

// module.exports = {
//   Weapon,
// };

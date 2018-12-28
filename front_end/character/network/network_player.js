'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const character_animations = require('../animations/character');

const { socket } = require('../../engine/socket');

const container = new PIXI.Container();
container.name = 'network_players';

class NetworkCharacter {
  constructor(attributes) {
    this.name = attributes.name;

    this.sprite = new PIXI.extras.AnimatedSprite(character_animations.knife.idle);
    this.sprite.height /= 2;
    this.sprite.width /= 2;
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.play();

    this.sprite.position.set(attributes.x, attributes.y);

    this.vitals = {
      health: 100,
      status: 'alive',
    };

    this.sprite.animations = character_animations;

    this.sprite.animation_switch = (type, action) => {
      if(this.sprite.textures !== this.sprite.animations[type][action]) {
        this.sprite.textures = this.sprite.animations[type][action];
        this.sprite.loop = true;
        this.sprite.play();
      }
    };

    viewport.addChild(this.sprite);
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

  network_update() {

    //socket.on('network_player', player_data => {
    //  this.sprite.x = player_data.x;
    //  this.sprite.y = player_data.y;
    //});

  }
}

module.exports = {
  NetworkCharacter,
};

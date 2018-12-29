'use strict';

const PIXI = require('pixi.js');
const viewport = require('../../engine/viewport');
const character_animations = require('../animations/character');


class NetworkCharacter {
  constructor(player_data) {
    this.name = 'network_player';
    this.id = player_data.id;
    this.sprite = new PIXI.Sprite.fromFrame('bunny');
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.4;
    this.sprite.position.set(player_data.x, player_data.y);

    this.sprite.height *= 2;
    this.sprite.width *= 2;

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

    viewport.getChildByName('network_players').addChild(this.sprite);
  }

  set_position(point) {
    this.sprite.position.set(point.x, point.y);
  }

}

module.exports = {
  NetworkCharacter,
};

'use strict';

const PIXI = require('pixi.js');


function bow_idle_frames() {
  const bow_frames = [];
  for (let i = 0; i <= 21; i++) {
    const name = (i >= 10)?`survivor-bow-idle-${i}`:`survivor-bow-idle-0${i}`;

    bow_frames.push(PIXI.Texture.fromFrame(name));
  }

  return bow_frames;
}

function bow_ready_frames() {
  const ready_frames = [];
  for (let i = 0; i <= 38; i++) {
    const name = (i >= 10)?`survivor-bow-pull-${i}`:`survivor-bow-pull-0${i}`;

    ready_frames.push(PIXI.Texture.fromFrame(name));
  }

  return ready_frames;
}

function bow_walk_frames() {
  const walk_frames = [];
  for (let i = 0; i <= 20; i += 1) {
    const name = (i >= 10)?`survivor-walk_bow_${i}`:`survivor-walk_bow_0${i}`;

    walk_frames.push(PIXI.Texture.fromFrame(name));
  }
  return walk_frames;
}

function knife_walk_frames() {
  const enemy_frames = [];

  for (let i = 0; i < 19; i++) {
    enemy_frames.push(PIXI.Texture.fromFrame(`survivor-move_knife_${i}`));
  }

  return enemy_frames;
}

function knife_attack_frames() {
  const enemy_frames = [];

  for (let i = 0; i < 14; i++) {
    enemy_frames.push(PIXI.Texture.fromFrame(`survivor-meleeattack_knife_${i}`));
  }

  return enemy_frames;
}

function idle_frames() {
  const idle_frames = [];
  for (let i = 0; i <= 21; i++) {
    const name = (i >= 10)?`survivor-idle_${i}`:`survivor-idle_0${i}`;

    idle_frames.push(PIXI.Texture.fromFrame(name));
  }
  return idle_frames;
}

function walk_frames() {
  const walk_frames = [];
  for (let i = 0; i <= 19; i++) {
    const name = `survivor-move_knife_${i}`;

    walk_frames.push(PIXI.Texture.fromFrame(name));
  }

  return walk_frames;
}

function dead_frames() {
  return [PIXI.Texture.fromFrame('dead_man')];
}

const frames = {
  bow: {
    idle:   bow_idle_frames(),
    walk:   bow_walk_frames(),
    ready:  bow_ready_frames(),
    dead:   dead_frames(),
  },
  nothing: {
    idle:   idle_frames(),
    dead:   dead_frames(),
  },
  knife: {
    idle:   idle_frames(),
    attack: knife_attack_frames(),
    ready:  knife_attack_frames(),
    walk:   knife_walk_frames(),
    dead:   dead_frames(),
  },
  animated: {
    knife: {
      walk: new PIXI.extras.AnimatedSprite(walk_frames()),
    },
  },
};

class Human {
  constructor(sprite) {
    this.name   = 'animation';

    this.state  = undefined;
    this.sprite = sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.height /= 1.5;
    this.sprite.width  /= 1.5;
    this.sprite.animationSpeed = 0.5;
    //TODO think of a better way to manage images saved at different roations
    this.sprite.rotation_offset = 0;
  }

  switch(weapon, action) {
    if(this.state === action) return;
    if(!weapon) throw new Error('No weapon provided');
    if(!action) throw new Error('No action provided');
    if(!frames[weapon][action]) throw new Error(`no action for frames ${weapon} & ${action}`);

    this.sprite.textures = frames[weapon][action];
    this.sprite.loop = true;
    this.sprite.play();

    this.state = action;
  }

  ready_weapon() { this.switch(this.weapon, 'ready'); }

  attack() { this.switch(this.weapon, 'attack'); }

  idle() { this.switch(this.weapon, 'idle'); }

  walk() { this.switch(this.weapon, 'walk'); }

  kill() {
    this.sprite.textures = frames.bow.dead;

    this.sprite.stop();
    //TODO remove magic number
    this.sprite.height = 120;
    this.sprite.width  = 80;
  }

  set current_weapon(weapon) { this.weapon = weapon; }

  get current_weapon() { return this.weapon; }

  face_up() { this.sprite.rotation = -2; }

  face_down() { this.sprite.rotation = 2; }

  face_left() { this.sprite.rotation = -3; }

  face_right() { this.sprite.rotation = 0; }

  move_up_by(amount) { this.sprite.y -= amount; }

  move_down_by(amount) { this.sprite.y += amount; }

  move_left_by(amount) { this.sprite.x -= amount; }

  move_right_by(amount) { this.sprite.x += amount; }
}


module.exports = {
  Human,
};



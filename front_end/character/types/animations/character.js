'use strict';

const PIXI = require('pixi.js');

function bow_idle_frames() {
  const bow_frames = [];
  for (let i = 0; i <= 21; i += 1) {
    let name = `survivor-bow-idle-0${i}`;

    if (i >= 10) {
      name = `survivor-bow-idle-${i}`;
    }
    bow_frames.push(PIXI.Texture.fromFrame(name));
  }
  return bow_frames;
}

function bow_ready_frames() {
  const ready_frames = [];
  for (let i = 0; i <= 38; i += 1) {
    let name = `survivor-bow-pull-0${i}`;

    if (i >= 10) {
      name = `survivor-bow-pull-${i}`;
    }

    ready_frames.push(PIXI.Texture.fromFrame(name));
  }
  return ready_frames;
}

function bow_walk_frames() {
  const walk_frames = [];
  for (let i = 0; i <= 20; i += 1) {
    let name = `survivor-walk_bow_0${i}`;

    if (i >= 10) {
      name = `survivor-walk_bow_${i}`;
    }
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
    let name = `survivor-idle_0${i}`;

    if (i >= 10) {
      name = `survivor-idle_${i}`;
    }
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


const frames = {
  bow: {
    idle:  bow_idle_frames(),
    walk:  bow_walk_frames(),
    ready: bow_ready_frames(),
  },
  nothing: {
    idle: idle_frames(),
  },
  knife: {
    idle:   idle_frames(),
    attack: knife_attack_frames(),
    reeady: knife_attack_frames(),
    walk:   knife_walk_frames(),
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
    this.sprite = sprite;
    this.sprite.anchor.set(0.5);
    this.sprite.height /= 2;
    this.sprite.width /= 2;
    this.weapon = 'bow';
    this.sprite.animationSpeed = 0.5;
    this.idle(this.weapon);
  }

  switch(weapon, action) {
    if (this.state === action) return;

    if(!weapon) throw new Error('No weapon provided');
    if(!action) throw new Error('No action provided');

    this.sprite.textures = frames[weapon][action];
    this.sprite.loop = true;
    this.sprite.play();
    this.state = action;
  }

  face_up() { this.sprite.rotation = -2; }

  ready_weapon() { this.switch(this.weapon, 'ready'); }

  face_down() { this.sprite.rotation = 2; }

  face_left() { this.sprite.rotation = -3; }

  face_right() { this.sprite.rotation = 0; }

  set current_weapon(weapon) { this.weapon = weapon; }

  get current_weapon() { return this.weapon; }

  attack() { this.switch(this.weapon, 'attack'); }

  idle() { this.switch(this.weapon, 'idle'); }

  stop() { this.sprite.gotToAndStop(1); }

  move_up_by(amount) { this.sprite.y -= amount; }

  move_down_by(amount) { this.sprite.y += amount; }

  move_left_by(amount) { this.sprite.x -= amount; }

  move_right_by(amount) { this.sprite.x += amount; }

  walk() { this.switch(this.weapon, 'walk'); }
}


module.exports = {
  Human,
};



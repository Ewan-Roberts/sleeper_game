'use strict';

const { Cutscene } = require('../cutscene_model');
const { Cutscene_Character } = require('../../character/characters/cutscene_character');
const viewport = require('../../engine/viewport.js');
const { Caption_Dialog } = require('../../dialog/DOM_dialog');
const { Dialog } = require('../../dialog/dialog_util');

//const Keyboard = require('../../input/keyboard');
const string_to_write = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,';

class Intro_Cutscene extends Cutscene {
  constructor() {
    super();
    this.dialog_dom = new Caption_Dialog();
    this.dialog_canvas = new Dialog();
  }

  start() {
    this.fade_screen_in_at_point(300,200);
    const player = viewport.getChildByName('player');
    player.position.set(300,200);
    console.log(player);
    //Keyboard.stop_input();
    this.cutscene_character = new Cutscene_Character(200, 300);
    this.cutscene_character.walk();

    this.bystander = new Cutscene_Character(100, 600);
    this.bystander.facing('up');

    this.bystander_1 = new Cutscene_Character(200, 500);
    this.bystander_1.facing('right');

    this.bystander_2 = new Cutscene_Character(280, 500);
    this.bystander_2.facing('left');

    this.dialog_canvas.render_text(150, 400, 'Lorium ipsum', 25);

    //dumb, sort out a consistent model for function binding
    this.cutscene_character.sprite.move_to_point(1200, 300);
    player.move_to_point(1200, 200);

    this.dialog_dom.play_audio_track('intro/test_speech.wav');
    this.dialog_dom.show();
    this.dialog_dom.render_text(string_to_write);
  }

}

module.exports = {
  Intro_Cutscene,
};

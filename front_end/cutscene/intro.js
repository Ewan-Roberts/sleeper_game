'use strict';

const { Cutscene_Character } = require('../character/characters/cutscene_character');
const viewport = require('../engine/viewport.js');
const { visual_effects } = require('./visual_effects');

const { Caption_Dialog } = require('../gui/caption');
const { Dialog } = require('./dialog_util');

const { move_sprite_to_point } = require('../engine/pathfind');

const string_to_write = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,';

class intro_cutscene {

  static start() {
    const dialog_dom = new Caption_Dialog();
    const dialog_canvas = new Dialog();
    visual_effects.fade_screen_to_black_at_point({ x: 300, y:200 });

    const player = viewport.getChildByName('player');
    player.position.set(300,200);

    const cutscene_character = new Cutscene_Character(200, 300);

    const bystander = new Cutscene_Character(100, 600);
    bystander.facing('up');

    const bystander_1 = new Cutscene_Character(200, 500);
    bystander_1.facing('right');

    const bystander_2 = new Cutscene_Character(280, 500);
    bystander_2.facing('left');

    dialog_canvas.render_text(150, 400, 'Lorium ipsum', 25);

    cutscene_character.sprite.move_to_point(1200, 300);
    move_sprite_to_point(player, {middle: {x:1200, y: 200}});

    dialog_dom.play_audio_track('/test_speech.wav');
    dialog_dom.show();
    dialog_dom.render_text(string_to_write);
  }

}

module.exports = {
  intro_cutscene,
};

const { Texture } = require('pixi.js');

const create_texture = (name, i) => Array(i).fill(name).map((filler, j) => Texture.fromFrame(j < 10 ? filler + '0' + j : filler + j));
const human_frames = {
  'nothing_idle': create_texture('Armature_nothing_idle_', 37),
  'nothing_move': create_texture('Armature_nothing_walk_', 49),
  'candle_idle' : create_texture('Armature_candle_idle_', 37),
  'candle_move' : create_texture('Armature_candle_walk_', 49),
  'bow_idle'    : create_texture('survivor-bow-idle-', 22),
  'bow_move'    : create_texture('survivor-walk_bow_', 21),
  'bow_shoot'   : create_texture('survivor-bow-pull-', 35),
  'knife_idle'  : Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name + i)),
  'knife_move'  : Array(20).fill('survivor-move_knife_').map((name, i) => Texture.fromFrame(name + i)),
  'knife_attack': Array(15).fill('survivor-meleeattack_knife_').map((name, i) => Texture.fromFrame(name + i)),
};

module.exports = {
  human_frames,
};

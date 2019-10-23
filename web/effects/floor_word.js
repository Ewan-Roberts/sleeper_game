const { World } = require('../engine/pixi_containers');
const { Text, DEG_TO_RAD } = require('pixi.js');
const { tweenManager } = require('pixi.js');

class FloorWord extends Text {
  constructor({
    rotation  = 0,
    font_size = 20,
    fill      = 'black',
    weight    = 'bolder',
    align     = 'center',
    text      = 'Invalid Text',
    alpha     = 1,
    tint      = 0xA9A9A9,
    delay     = 0,
    x,
    y,
  }) {
    super(text, {
      'fontSize'  : font_size,
      'fontWeight': weight,
      fill,
      align,
    });

    this.alpha    = alpha;
    this.rotation = rotation * DEG_TO_RAD;
    this.tint     = tint;
    this.anchor.set(0.5);
    this.position.copy({ x, y });

    this.tween       = tweenManager.createTween(this);
    this.tween.delay = delay;
  }

  fade_in_wait_out(
    in_time = 1000,
    wait_time = 1000,
    out_time = 1000
  ) {
    this.fade_in(in_time);
    this.tween.on('end', () => {
      this.tween.reset();
      this.delay = wait_time;

      this.fade_out(out_time);
    });
  }

  fade_in(time = 1000) {
    this.tween.reset();
    this.tween.time = time;
    this.alpha = 0;
    this.tween.to({ 'alpha': 1 });
    this.tween.start();
  }

  fade_out(time = 1000) {
    this.tween.reset();
    this.tween.time = time;
    this.tween
      .from({ 'alpha': 1 })
      .to({ 'alpha': 0 });

    this.tween.on('end', () => {
      this.tween.remove();
      this.destroy();
    });
    this.tween.start();
  }
}

const default_words = [
  'Math.random()',
  '<h2>', '</html>',
  '</head>',
  '<script>',
  '<div>',
];

const bounds = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const random_text = (array) => array[Math.floor(Math.random() * array.length)];

function random_word({
  point,
  size        = 80,
  closeness   = 100,
  fade_lower  = 500,
  fade_higher = 2000,
  text        = default_words,
}) {
  const random_word_from_array = random_text(text);
  const word = new FloorWord({
    'font_size': bounds(10, size),
    'rotation' : bounds(-30, 30),
    'text'     : random_word_from_array,
    'fill'     : Math.random() >= 0.5 ? 'white' : 'black',
    'delay'    : bounds(500, 2000),
  });
  word.position.copy(point);
  word.x += bounds(-closeness, closeness);
  word.y += bounds(-closeness, closeness);
  const fade_in   = bounds(fade_lower, fade_higher);
  const fade_wait = bounds(fade_lower, fade_higher);
  const fade_out  = bounds(fade_lower, fade_higher);
  World.add_to('background', word);
  word.fade_in_wait_out(fade_in, fade_wait, fade_out);
}

const pulse_words = array => {
  let delay = 800;
  array.forEach(unit => {
    const word = new FloorWord({
      ...unit,
      'text': unit.text.text,
      delay,
      'fill': 'white',
    });
    delay += 60;
    World.add_to('background', word);
    word.fade_in_wait_out(delay);
  });
};

module.exports = {
  FloorWord,
  random_word,
  pulse_words,
};

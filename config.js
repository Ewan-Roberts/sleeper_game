class EnvironmentConfig {
  constructor(data) {
    this.dev                = data.dev;
    this.fps                = data.fps;
    this.resolution         = data.resolution;
    this.anti_alias         = data.anti_alias;
    this.background_color   = data.background_color; // black
    this.keyboard_additions = data.keyboard_additions;
    this.visable_pads       = data.visable_pads;
    this.visable_borders    = data.visable_borders;
    this.brightness         = data.brightness;
    this.inventory_openable = data.inventory_openable;
    this.level_on_load      = data.level_on_load;
    this.draw_paths         = data.draw_paths;
    this.player_speed       = data.player_speed;
    this.round_pixels       = true; //always round
  }
}

const options = {
  prod: new EnvironmentConfig({
    dev:                false,
    fps:                0.06,
    resolution:         1,
    anti_alias:         true,
    background_color:   0xffffff, // black
    keyboard_additions: false,
    visable_pads:       false,
    visable_borders:    false,
    brightness:         'low',
    inventory_openable: false,
    level_on_load:      'start',
    draw_paths:         false,
    player_speed:       9,
  }),

  dev_low: new EnvironmentConfig({
    dev:                true,
    fps:                0.03,
    resolution:         0.1,
    anti_alias:         true,
    background_color:   0x0066CC, // blue
    keyboard_additions: false,
    visable_pads:       true,
    visable_borders:    true,
    brightness:         'low',
    inventory_openable: false,
    level_on_load:      'transition',
    draw_paths:         true,
    player_speed:       30,
  }),

  dev_medium: new EnvironmentConfig({
    dev:                true,
    fps:                0.04,
    resolution:         1,
    anti_alias:         true,
    background_color:   0x0066CC, // blue
    keyboard_additions: false,
    visable_pads:       true,
    visable_borders:    true,
    brightness:         'low',
    inventory_openable: false,
    level_on_load:      'transition',
    draw_paths:         false,
    player_speed:       30,
  }),

  dev_high: new EnvironmentConfig({
    dev:                true,
    fps:                60,
    resolution:         1,
    anti_alias:         true,
    background_color:   0xffffff, // black
    keyboard_additions: false,
    visable_pads:       true,
    visable_borders:    true,
    brightness:         'low',
    inventory_openable: false,
    level_on_load:      'transition',
    draw_paths:         true,
    player_speed:       30,
  }),
};

function get_dev_config(name) {
  switch(name) {
    case 'prod':
      return options.prod;
    case 'dev_low':
      return options.dev_low;
    case 'dev_medium':
      return options.dev_medium;
    case 'dev_high':
      return options.dev_high;
  }
}

const env = get_dev_config('prod');
console.log(env);

module.exports = {
  env,
};

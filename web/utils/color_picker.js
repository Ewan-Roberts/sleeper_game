class Color_Pick {
  static get_hex_from(name) {
    switch(name) {
      case 'red'    : return 0xff0000;
      case 'yellow' : return 0xbdb76b;
      case 'white'  : return 0xffffff;
      case 'black'  : return 0x000000;
      case 'green'  : return 0x008000;
      case 'grey'   : return 0xd3d3d3;
    }
  }
}

module.exports = {
  Color_Pick,
};

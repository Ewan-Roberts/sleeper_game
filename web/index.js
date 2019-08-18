const JSDOM = require( 'jsdom' ).JSDOM;

const jsdomOptions = {
  url: 'http://localhost/',
};

const jsdomInstance = new JSDOM( '', jsdomOptions );
const { window } = jsdomInstance;

Object.getOwnPropertyNames( window )
  .filter( property => !property.startsWith( '_' ) )
  .forEach( key => global[key] = window[key] );

global.window = window;
window.console = global.console;


require('./utils/globals');

const { loader } = require('./engine/packer');
loader.add('../../images/bedroom_EN_web.json');
loader.add('../../images/work_EN_web.json');
loader.load(() => {
  const { Level_Loader } = require('./engine/boot_loader.js');
  Level_Loader.boot();
});




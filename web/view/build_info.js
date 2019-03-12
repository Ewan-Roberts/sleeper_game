'use strict';

const { current_build_version } = require('../engine/build_details');

async function update_build_version() {
  const { version } = await current_build_version();

  const build_info = global.document.querySelector('.build_version');

  build_info.innerHTML = version;
}


module.exports = {
  update_build_version,
};

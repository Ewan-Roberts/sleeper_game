'use strict';

const { current_build_version } = require('../engine/build_details');
const { select } = require('../utils/dom');

async function update_build_version() {
  const { version } = await current_build_version();

  const build_info = select('.build_version');

  build_info.innerHTML = version;
}

module.exports = {
  update_build_version,
};

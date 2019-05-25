'use strict';

async function current_build_version() {
  const { window } = global;

  const response =
    await window.fetch(window.location.href+'automation');

  return await response.json();
}

const { select } = require('../utils/dom');

async function update_build_version() {
  const { version } = await current_build_version();

  const build_info = select('.build_version');

  build_info.innerHTML = version;
}

module.exports = {
  update_build_version,
};

'use strict';

async function current_build_version() {
  const { window } = global;

  const response =
    await window.fetch(window.location.href+'automation');

  return await response.json();
}

module.exports = {
  current_build_version,
};

'use strict';

const { Selector } = require('../utils/dom');

const player_name = new Selector('.player_name_input');
const login_input = new Selector('.login_password_input');
const button      = new Selector('.login_register_button');
const overlay     = new Selector('.game_overlay');

button.event('click', async () => {
  overlay.hide();

  await register_click();
});

async function login_user(data) {
  await global.fetch('/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  });
}

async function login_click() {
  const details = {
    user_name: player_name.value,
    password:  login_input.value,
  };

  await register_user(details);
}

async function register_click() {
  const details = {
    user_name: 'name',
    email:     'cheese',
  };

  await login_user(details);
}

async function register_user(data) {
  const response = await global.fetch('/login', {
    method: 'GET',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  });
}

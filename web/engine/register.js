'use strict';

const { Selector } = require('../utils/dom');

const player_name = new Selector('.player_name_input');
const login_input = new Selector('.login_password_input');
const button      = new Selector('.login_register_button');

button.event('click', async () => {
  console.log('thing');

  await register_click();
});

async function register_user(data) {
  await global.fetch('/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


async function register_click() {
  console.log({ player_name });
  const data = {element: 'barium'};

  console.log({ player_name});

  const details = {
    user_name: player_name,
    email:     login_input,
  };

  console.log(details);

  const response = await register_user(data);

  console.log(response);
}


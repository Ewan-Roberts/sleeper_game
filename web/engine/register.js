'use strict';

function register_click() {
  // const element = global.document.querySelector('.login_register_button');
  console.log('hi');
  const data = {element: 'barium'};
  global.fetch('/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    console.log('Request complete! response:', res);
  });
}

register_click();

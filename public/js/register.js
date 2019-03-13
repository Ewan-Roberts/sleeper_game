'use strict'

function register_click() {
  const element = document.querySelector('.login_register_button');

  element.addEventListener('click', async() => {
    console.log('there');

    const response = await window.fetch(window.location.href+'register');

    console.log(response);
  });
}

register_click();

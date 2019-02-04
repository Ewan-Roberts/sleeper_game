'use strict';

const {
  register_user,
  get_user,
} = require('./socket');

const login_register = global.document.querySelector('.login_register');
const login_register_button = global.document.querySelector('.login_register_button');
const login_passcode = global.document.querySelector('.login_passcode');

const login_start_button = global.document.querySelector('.login_start_button');
const login_menu   = global.document.querySelectorAll('.login_menu input');
const login_display = global.document.querySelector('.login_menu');
const login_mode   = global.document.querySelector('.login_mode button');

login_mode.addEventListener('click', function() {

  if(this.innerHTML.includes('Login')) {
    this.innerHTML = 'Register';
    login_display.style.display = 'none';
    login_register.style.display = 'block';
    return;
  }

  this.innerHTML = 'Login';
  login_display.style.display = 'block';
  login_register.style.display = 'none';
});

login_register_button.addEventListener('click', () => {
  const login_details = {
    user_name: login_menu[0].value,
    email:     login_menu[1].value,
  };

  register_user(login_details);
});


login_start_button.addEventListener('click', () => {
  const login_details = {
    passcode: login_passcode.value,
  };

  get_user(login_details);
});

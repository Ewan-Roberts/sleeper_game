(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/dom":3}],2:[function(require,module,exports){
'use strict';

// require('./engine/globals');

// const { loader } = require('./engine/packer');
// loader.add('../../images/bedroom_EN_web.json');
// loader.load(() => {
//   const { Level_Loader } = require('./level/boot_loader.js');
//   Level_Loader.boot();
// });

require('./engine/register');

},{"./engine/register":1}],3:[function(require,module,exports){
(function (global){
'use strict';

class Selector {
  constructor(name){
    this.element = global.document.querySelector(name);
  }

  set width(value){
    this.element.style.width = value;
  }

  set opacity(value){
    this.element.style.opacity = value / 100;
  }

  // get value(){
  //   return this.element.value;
  // }

  set display(value) {
    this.element.style.display = value;
  }

  event(name, func) {
    this.element.addEventListener(name, func);
  }

  set innerHTML(value) {
    this.element.innerHTML = value;
  }
}

module.exports = {
  Selector,
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2]);

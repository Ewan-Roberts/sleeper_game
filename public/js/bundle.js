(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

// require('./engine/globals');

// const { loader } = require('./engine/packer');
// loader.add('../../images/bedroom_EN_web.json');
// loader.load(() => {
//   const { Level_Loader } = require('./level/boot_loader.js');
//   Level_Loader.boot();
// });

require('./engine/register');

},{"./engine/register":1}]},{},[2]);

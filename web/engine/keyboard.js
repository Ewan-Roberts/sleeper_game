'use strict';

const PIXI = require('pixi.js');
const {world}= require('./shadows');
const {player_container}= require('./pixi_containers');

//PIXI.keyboardManager.on('down', function(key){
//  //If a key is down
//  const player = player_container.children[0];
//  if(key === 83) { //up
//    player.position.y +=10;
//    world.position.y  -= 10;
//  }

//  if(key === 87) { //up
//    player.position.y -=10;
//    world.position.y  += 10;
//  }

//  if(key === 65) { //left
//    player.position.x -=10;
//    world.position.x  += 10;
//  }

//  if(key === 68) { //right
//    player.position.x +=10;
//    world.position.x  -= 10;
//  }


//});

//PIXI.keyboardManager.on('pressed', function(){
//  //If a key was pressed
//  // console.log('Key pressed:' + key);
//});

//PIXI.keyboardManager.on('released', function(){
//  //If a key was released
//  // console.log('Key released:' + key);
//});

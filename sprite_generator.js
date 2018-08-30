var spritesheet = require('spritesheet-js');

fs = require('fs');
fs.readFile('./public/images/rat.png', function (err,data) {
  if (err) return console.log(err);

  console.log(data);

  spritesheet(data, {format: 'json'}, function (err) {
  
  if (err) throw err;

    console.log('spritesheet successfully generated');
  });

});




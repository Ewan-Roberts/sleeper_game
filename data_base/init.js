'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(' ... Database connected on port: 27017');
});

 
var kittySchema = new mongoose.Schema({
  name: String
});


// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}



var Kitten = mongoose.model('Kitten', kittySchema);


var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'



var Kitten = mongoose.model('Kitten', kittySchema);



var fluffy = new Kitten({ name: 'poooooooooooooooooo' });
fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log(fluffy);
    fluffy.speak();
  });


Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

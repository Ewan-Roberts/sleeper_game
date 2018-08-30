const   express = require("express"),
        app     = express(),
        server  = require("http").Server(app),
        port    = process.env.PORT || 3000,
        mongoose = require("mongoose"),
        utils = require('require-dir')('./functions'),
        User = require("./models/User.js")

// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', () => {
    
//     console.log("db up")

//     // utils.createContainer({
//     //     chest_id: 35,
//     //     name: "footlocker",
//     //     area: "starter_bedroom", 
//     //     location: {
//     //         x: 22,
//     //         y: 20
//     //     },
//     //     contents: [1,2,3,4]  

//     // })
//     // .catch(err=>Error(err))
//     // .then(result => {
        
//     //     console.log(result)
//     //     console.log("-----------------");
         
//     // })

//     // utils.createItem({
//     //     item_id: 2,
//     //     name: "wooden boards",
//     //     file_name: "wooden_boards.png",
//     //     rarity: "basic",
//     //     drop_rate: 0.30,
//     //     materials: [1,2,3],
//     //     mode: false

//     // })
//     // .catch(err=>Error(err))

//     // utils.createItem({
//     //     item_id: 1,
//     //     name: "nail",
//     //     file_name: "nail.png",
//     //     rarity: "basic",
//     //     drop_rate: 0.20,
//     //     materials: [1,2,3],
//     //     mode: false

//     // })
//     // .catch(err=>Error(err))

//     // utils.setUser({
//     //     name: 'fluffy',
//     //     id: "e674d97d-2ee6-48e9-898d-c1b2a0858a41",
//     //     email:"ewan@omnifi.com.uk",
//     //     date_of_birth:"12.12.87"
//     // })

//     // utils.createContainer({
//     //     name: 'fluffy',
//     //     id: "e674d97d-2ee6-48e9-898d-c1b2a0858a41",

//     // })

// });

let player_info = {
    x:1200,
    y:1200
}


app.use(express.static("./public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

server.listen(port, () => console.log("server is listening on port: " + port));

io = require("socket.io")(server, {});

io.sockets.on("connection", socket => {

    console.log('Client connected.'); 

    // socket.emit("get_level_data", levelData)
    
    socket.on("get_container_contents", container_data =>{

        console.log(container_data)
        socket.emit("container_contents","we wee wee")
        // utils.getContainerById(container_data)
        // .then(res=>{
        //   console.log(res)
        //     socket.emit("container_contents",res)
        // })

    })
    console.log("hi")
    socket.on("set_player_data", front_player =>{

        console.log("get_player_data")

        User.findOneAndUpdate({_id: "5b43c9bdd9101585e767881d"}, {location: front_player.location}, (err,doc)=>{
            console.log("popppo")
            console.log(doc)
        })

        // player_info = data
        // player_info = data;
        // console.log(player_info)
        

    })

    socket.on("get_player_data", ()=>{

        utils.getUser("5b43c9bdd9101585e767881d")
        .then(res =>{
            console.log(res)
            // socket.emit("player_data",res)
        })

        // socket.emit("player_data",player_info)

    })


    socket.on("player_sleep", hours =>{

        console.log(hours)

        utils.meters.updateSleep("5b43c9bdd9101585e767881d",hours)
        .then(res =>{
            console.log(res)
            // socket.emit("player_data",res)
        })

        // socket.emit("player_data",player_info)

    })    

    // socket.on("meter_ticker", shit =>{

    //     console.log('ticker')
    //     console.log(shit)

    //     User.findOneAndUpdate("5b43c9bdd9101585e767881d", {meters: shit}, (err,doc)=>{
    //         console.log(err)
    //         console.log("popppo")
    //         // console.log(doc)
    //         // doc.meters = shit;
    //         doc.save()

    //     })

    // })

    //ticker
    setInterval(()=>{

        // utils.meters.start("5b43c9bdd9101585e767881d")

        // User.findById("5b43c9bdd9101585e767881d", function (err, foundUser) {
        //     if (err) throw err

        //     console.log(foundUser.meters.water)
        //     foundUser.meters.water -= 0.25;
        //     foundUser.meters.food -= 0.15;
        //     foundUser.meters.sleep -= 0.1;
        
        //     new User(foundUser).save((err, updatedUser)=> {
        //         if (err) throw err
        //         console.log(updatedUser)
        //     });
        
        // });


    },5000)


})








/*

















  var data, k, s;
  console.log("player connected with id: " + socket.id);
  socket.x = 0;
  socket.y = 0;
  socket.player = new Player();
  sockets[socket.id] = socket;
  socket.on("disconnect", function() {
    console.log("player disconnected");
    delete sockets[socket.id];
    return removals.push(socket.id);
  });
  socket.on("events", function(data) {
    return socket.player.events(data);
  });
  data = {
    positions: []
  };
  for (k in sockets) {
    s = sockets[k];
    data.positions.push({
      id: s.id,
      x: s.player.x,
      y: s.player.y
    });
  }
  return socket.emit("render", data);
setInterval((function() {
  var data, k, s;
  data = {
    positions: []
  };
  data.removals = removals;
  for (k in sockets) {
    s = sockets[k];
    s.player.update();
    if (s.player.updated) {
      s.player.updated = false;
      data.positions.push({
        id: s.id,
        x: s.player.x,
        y: s.player.y
      });
    }
  }
  for (k in sockets) {
    s = sockets[k];
    s.emit("render", data);
  }
  if (removals.length > 0) {
    return removals = [];
  }
}), 1000 / 25);








let sockets = {};

let removals = [];

const Player = (function() {
  function Player() {
    this.x = Math.random() * 235;
    this.y = Math.random() * 235;
    this.keys = {
      left: "keyup",
      right: "keyup",
      down: "keyup",
      up: "keyup"
    };
    this.updated = true;
  }

  Player.prototype.speed = Math.random() * 2 + 1;

  Player.prototype.events = function(data) {
    var key, ref, results, val;
    ref = data.keys;
    results = [];
    for (key in ref) {
      val = ref[key];
      results.push(this.keys[key] = val);
    }
    return results;
  };

  Player.prototype.update = function() {
    if (this.keys.left === "keydown") {
      this.x -= this.speed;
      this.updated = true;
    } else if (this.keys.right === "keydown") {
      this.x += this.speed;
      this.updated = true;
    }
    if (this.keys.up === "keydown") {
      this.y -= this.speed;
      return this.updated = true;
    } else if (this.keys.down === "keydown") {
      this.y += this.speed;
      return this.updated = true;
    }
  };

  return Player;

})();



*/







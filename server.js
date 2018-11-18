const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server, {});

const environment = 'dev';

app.use(express.static('./public'));

app.get('/', (req, res) => {
  
  res.sendFile(`${__dirname}/public/index.html`)
  
});

server.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
});

io.on('connection', (socket) => {
  console.log('Client connected.');
});

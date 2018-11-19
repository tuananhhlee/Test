const http = require('http');
const express = require('express'),
  app = module.exports.app = express();

const PORT = process.env.PORT || 5000;
let server = http.createServer(app);

const io = require('socket.io').listen(server);  //pass a http.Server instance

const path = require('path');
const INDEX = path.join(__dirname, 'index.html');

const cors = require('cors');

app.use(cors());

server.listen(PORT, console.log(`Server listening at ${PORT}`));

io.on('connection', function (socket) {
  console.log(`${socket.id}:  Đã kết nối(Connected)/////////////////`////////////)
  socket.on('disconnect', () => console.log(`Hủy kết nối( )////////////////////// :  ${socket.id}`))
  socket.emit('socketid', socket.id);
  socket.on('set-nickname',data => console.log(data))
  socket.on('userMessage', (data) => {
    socket.emit('message-sender', data)
  });
  setInterval(function(){
    socket.emit('sleepy', "doSomeThingFunny !")
  },20000)
  socket.on('stayWithMe', (data) => console.log(data))
});

app.get('/', home);

function home(req, res) {
  res.sendFile(INDEX);
}


// const express = require('express');
// const socketIO = require('socket.io');
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// })
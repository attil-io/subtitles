const path = require('path')
const express = require('express')
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000

const app = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })

const server = http.createServer(app);
const io = socketIo(server);

let counter = 0
const getApiAndEmit = async socket => {
  try {
      counter = counter + 1
      socket.emit("text", "text " + counter);
  } catch (error) {
    console.error(error)
    console.error(`Error: ${error.code}`);
  }
};


let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


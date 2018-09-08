const path = require('path')
const express = require('express')
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000

const app = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .get('/api/listOfTexts', (req, res) => {
      res.json(["text1", "text2", "text3", "text4", "blah"])
  })
 .get('/api/text', (req, res) => {
      let id = req.param('id'),
          texts = [
		   ["txt1 line1", "txt1 line2", "txt1 line3", "txt1 line4", "txt1 line5", "txt1 line6"],
		   ["txt2 line1", "txt2 line2", "txt2 line3", "txt2 line4", "txt2 line5", "txt2 line6"],
		   ["txt3 line1", "txt3 line2", "txt3 line3", "txt3 line4", "txt3 line5", "txt3 line6"],
		   ["txt4 line1", "txt4 line2", "txt4 line3", "txt4 line4", "txt4 line5", "txt4 line6"],
		   ["txt5 line1", "txt5 line2", "txt5 line3", "txt5 line4", "txt5 line5", "txt5 line6"]],
          response = texts[parseInt(id)]

      res.json(response)
  })
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


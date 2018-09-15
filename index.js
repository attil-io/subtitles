const path = require('path')
const express = require('express')
const http = require("http");
const socketIo = require("socket.io");
const fs = require('fs');

const PORT = process.env.PORT || 5000

let texts = [], titles = [],
 lineIdx = 0, textIdx = 0


const app = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .get('/api/listOfTexts', (req, res) => {
      res.json(titles)
  })
 .get('/api/text', (req, res) => {
      let id = parseInt(req.query.id),
          response = texts[id]

      textIdx = id 
      lineIdx = 0
      res.json(response)
  })
  .get('/api/setline', (req, res) => {
      let id = parseInt(req.query.id)
      
      lineIdx = id
      res.json({})
  })
  .get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })

const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = async socket => {
  try {
      socket.emit("text", texts[textIdx][lineIdx]);
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

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.sort()
    filenames.forEach(function(filename) {
      onFileContent(filename, fs.readFileSync(dirname + filename, 'utf-8', function(err, content)))
    });
  });
}

readFiles('texts/', function(filename, content) {
   let {title, lines} = JSON.parse(content)
   titles.push(title)
   texts.push(lines) 
}, function(err) {
  throw err;
});


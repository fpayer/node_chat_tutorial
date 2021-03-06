/* Dependencies */
var express = require('express');
var http = require('http');
var busboy = require('connect-busboy');
var fs = require('fs');

/* Configuration */
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

/* Server Resources */
var app = express();
var server = http.createServer(app);
var users = [ ];

/* Helper functions */
var remove = function(arr, item) {
  var index = arr.indexOf(item);
  arr.splice(index, 1);
}

/* Socket.io connections */
var io = require('socket.io')(server);
io.on('connection', function(client) {
  console.log('Client connected from', client.handshake.address);

  client.on('message', function(message) {
    //Broadcast message to everyone
  });

  client.on('name', function(name) {
    //Add name to client and push to user array
    //Broadcast user list to all clients
  });

  client.on('disconnect', function() {
    //Remove user's name from user array
    //Broadcast new uster list to clients
  });
});

/* Set up routes */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(busboy({
  limits : {
    fileSize : config.max_filesize * 1024 * 1024
  }
}));

app.post('/upload', function(req, res) {
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) { 
    var path = __dirname + '/uploads/';
    var fstream = fs.createWriteStream(path + filename);
    file.pipe(fstream);
    fstream.on('close', function() {
      res.redirect('back');
      io.sockets.emit('upload', {
        url : '/uploads/' + filename,
        filename : filename
      });
    });
  });
  req.pipe(req.busboy);
});

app.use('/static/', express.static(__dirname + '/static/'));
app.use('/uploads/', express.static(__dirname + '/uploads/'));
app.use('/practice/', express.static(__dirname + '/practice/'));

/* Server startup */
server.listen(config.port, config.ip);
console.log('Server starting up on', config.port);

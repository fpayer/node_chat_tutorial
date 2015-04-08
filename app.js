/* Dependencies */
var express = require('express');
var http = require('http');
var busyboy = require('connect-busboy');
var fs = require('fs');

/* Configuration */
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

/* Server Resources */
var app = express();
var server = http.createServer(app);

/* Socket.io connections */
var io = require('socket.io')(server);
io.on('connection', function(client) {
  console.log('Client connected from', client.handshake.address);

  client.on('disconnect', function() {
    console.log('Client', client.handshake.address, 'disconnected');
  });
});

/* Set up routes */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/static/', express.static(__dirname + '/static/'));

/* Server startup */
server.listen(config.port);
console.log('Server starting up on', config.port);

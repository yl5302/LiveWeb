// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app)

// Tell server where to look for files
app.use(express.static('public'));

// Create socket connection
let io = require('socket.io').listen(server, function() {
});

// array of history data
let history = [];

// Listen for individual clients to connect
io.on('connection',
  // Callback function on connection
  // Comes back with a socket object
  function(socket) {
    console.log("We have a new client: " + socket.id);

    // first send the history to the new client
    for (let i in history) {
      socket.emit('draw', {
        line: history[i]
      });
    }

    // Listen for data from this client
    socket.on('draw', function(data) {
      // Data can be numbers, strings, objects
      console.log("Received: 'draw' " + data);

      // add received line to history
      history.push(data.line);

      // Send it to all clients, including this one
      io.emit('draw', data);

      // Send it to all other clients, not including this one
      //socket.broadcast.emit('draw', data);

      // Send it just to this client
      // socket.emit('draw', data);
    });

    //Listen for clear message from the client
    socket.on('clearTrigger', function() {
      io.emit('clearTrigger');
      history.length = 0;
    });

    // Listen for this client to disconnect
    socket.on('disconnect', function() {
      console.log("Client has disconnected " + socket.id);
    });
  }
);

server.listen(port, function() {
  console.log('Server listening at port: ', port);
});

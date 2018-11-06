// Create server
let port = process.env.PORT || 8089;
let express = require('express');
let app = express();
let httpServer = require('http').createServer(app);

// Tell server where to look for files
app.use(express.static('public'));

// HTTP Portion
// let http = require('http');
let fs = require('fs');
// let httpServer = http.createServer(requestHandler);
// httpServer.listen(8089);
//console.log('Server listening on port 8089');

// function requestHandler(req, res) {
// 	// Read index.html
// 	fs.readFile(__dirname + '/index.html',
// 		// Callback function for reading
// 		function (err, data) {
// 			// if there is an error
// 			if (err) {
// 				res.writeHead(500);
// 				return res.end('Error loading index.html');
// 			}
// 			// Otherwise, send the data, the contents of the file
// 			res.writeHead(200);
// 			res.end(data);
//   		}
//   	);
// }

let files = [];

// Create database
let Datastore = require('nedb');
let db = new Datastore({
  filename: "data.db",
  autoload: true
});


// Create socket connection
let io = require('socket.io').listen(httpServer);

// Listen for individual clients to connect
io.on('connection',
  // Callback function on connection
  // Comes back with a socket object
  function(socket) {
    console.log("We have a new client: " + socket.id);

    for (let i = 0; i < files.length; i++) {
      socket.emit("image", files[i]);
    }

    // Listen for data from this client
    socket.on('drawing', function(base64Data) {
      // Saving a data URL
      let searchFor = "data:image/png;base64,";
      let strippedImage = base64Data.slice(base64Data.indexOf(searchFor) + searchFor.length);
      let binaryImage = new Buffer(strippedImage, 'base64');
      let filename = Date.now() + ".png";
      fs.writeFileSync(__dirname + '/public/' + filename, binaryImage);
      files.push(filename);
      console.log("Drawing Received: " + filename);

      io.sockets.emit("image", filename);

      // Create the JavaScript Object
      let datatosave = {
        socketid: socket.id,
        drawing: base64Data
      }
      // Insert the data into the database
      db.insert(datatosave, function(err, newDocs) {
        console.log("err: " + err);
        console.log("newDocs: " + newDocs);
      });
    });

    // When the history is requested, find all of the docs in the database
    socket.on('history', function() {
      db.find({}, function(err, docs) {
        // Loop through the results, send each one as if it were a new drawing
        for (let i = 0; i < docs.length; i++) {
          socket.emit('drawing', docs[i].drawing);
        }
      });
    });

    // Listen for this client to disconnect
    socket.on('disconnect', function() {
      console.log("Client has disconnected " + socket.id);
    });
  }
);

httpServer.listen(port, function() {
  console.log('Server listening at port: ', port);
});

document.addEventListener("DOMContentLoaded", function() {
  let mouse = {
    click: false,
    move: false,
    pos: {
      x: 0,
      y: 0
    },
    pos_prev: {
      x: 0,
      y: 0
    }
  };

  // get canvas element and create context
  let drawingCanvas = document.getElementById('drawing');
  let displayingCanvas = document.getElementById('displaying');
  let drawContext = drawingCanvas.getContext('2d');
  let displayContext = displayingCanvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Open and connect socket
  let socket = io.connect()

  // set both canvased to half browser width/height
  drawingCanvas.width = width * 0.46;
  drawingCanvas.height = height;
  displayingCanvas.width = width * 0.46;
  displayingCanvas.height = height;

  // register mouse event handlers
  drawingCanvas.onmousedown = function(e) {
    mouse.click = true;
  };
  drawingCanvas.onmouseup = function(e) {
    mouse.click = false;
  };

  drawingCanvas.onmousemove = function(e) {
    // normalize mouse position to range 0.0 - 1.0
    mouse.pos.x = e.clientX / width;
    mouse.pos.y = e.clientY / height;
    mouse.move = true;
  };

  socket.on('connect', function() {
    console.log("Connected");
    // Once we are connected, request the history in database
    socket.emit('history', null);
    // Once received the base64Data from the server,
    // socket.on('drawing', function(data) {
    //
    // });
  });

  // Once received the image names from the server,
  socket.on('image', function(filename) {
    //let img = document.createElement("IMG");
    let img = new Image();
    img.id = filename;
    img.src = filename;
    console.log(img.id);
    // let imgAppended = document.body.appendChild(img);
    // imgAppended.style.display = 'none';
    // let imgToDisplay = document.getElementById(filename);
    // imgToDisplay.onload = function() {
    //   displayContext.drawImage(imgToDisplay,0,0,10,10);
  // }
    console.log(displayContext);


    img.onload = function() {
      let imgX = Math.floor(Math.random() * displayingCanvas.width);
      let imgY = Math.floor(Math.random() * displayingCanvas.height);
    displayContext.drawImage(img,imgX,imgY,100,100);
    //console.log("Image Drawn");
    //console.log(drawingCanvas.width);
    //console.log(displayContext);
  }
  });

  //clear canvas when clear button is clicked
  let clearButton = document.getElementById('clearButton');
  clearButton.onclick = function() {
    drawContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  }

  //send drawing to server when publish button is clicked
  let publishButton = document.getElementById('publishButton');
  publishButton.onclick = function() {
    let base64 = drawingCanvas.toDataURL();
    socket.emit("drawing", base64);
    //console.log("Drawing Sent", base64);
    drawContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  }

  function drawLine() {
    drawContext.beginPath();
    drawContext.lineWidth = 2;
    drawContext.moveTo(mouse.pos.x * width, mouse.pos.y * height);
    drawContext.lineTo(mouse.pos_prev.x * width, mouse.pos_prev.y * height);
    drawContext.stroke();
  }

  // main loop, running every 25ms
  function mainLoop() {
    // check if the user is drawing
    if (mouse.click && mouse.move && mouse.pos_prev) {
      drawLine();
      mouse.move = false;
    }
    mouse.pos_prev = {
      x: mouse.pos.x,
      y: mouse.pos.y
    };
    setTimeout(mainLoop, 25);
  }
  mainLoop();
});

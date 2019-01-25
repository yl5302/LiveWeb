// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */


  // socket = io.connect();
  //
  // socket.on('connect', function() {
  //   console.log("Connected");
  // })
  //
  // socket.on('playSound',function(data){
  //   document.getElementById(data).play();
  //   console.log(data);
  // })



let video;
let poseNet;
let poses = [];
let triggers = [
  [false, false, false],
  [false, false, false]
]
let lastTrigger;
let sound;
let sounds = [
  [null, null, null],
  [null, null, null]
]
let current_indexes = [0, 2];
let count = 0;
let maxCount = 10;

let change = false;
let prevState = false;
let currentState = false;

let myCanvas;

const LEFT_WRIST = 'leftWrist'
const RIGHT_WRIST = 'rightWrist'
const NOSE = 'nose'
const LEFT_HIP = 'leftHip'
const RIGHT_HIP = 'rightHip'
const LEFT_ANKLE = 'leftAnkle'
const RIGHT_ANKLE = 'rightAnkle'

let width = window.innerWidth*1.0;
let height = window.innerHeight*1.0;
let gridWidth = window.innerWidth*1.0;
let gridHeight = window.innerHeight*1.0;

const marginTop = 0;
const marginLeft = 0;


const rows = 2
const columns = 3

const cellWidth = gridWidth / columns
const cellHeight = gridHeight / rows

let d1 = document.getElementById("drum1");
let d2 = document.getElementById("drum2");
let d3 = document.getElementById("drum3");
let d4 = document.getElementById("drum4");
let d5 = document.getElementById("drum5");
let d6 = document.getElementById("drum6");
let s1 = document.getElementById("shaker1");
let s2 = document.getElementById("shaker2");
let s3 = document.getElementById("shaker3");
let s4 = document.getElementById("shaker4");
let s5 = document.getElementById("shaker5");
let s6 = document.getElementById("shaker6");
let l1 = document.getElementById("lead1");
let l2 = document.getElementById("lead2");
let l3 = document.getElementById("lead3");
let l4 = document.getElementById("lead4");
let l5 = document.getElementById("lead5");
let l6 = document.getElementById("lead6");

// var synth = new Tone.AMSynth().toMaster()
// var synthB = new Tone.Synth({
//   oscillator : {
//     type : 'triangle8'
//   },
//   envelope : {
//     attack : 2,
//     decay : 1,
//     sustain: 0.4,
//     release: 4
//   }
// }).toMaster()

let state = localStorage.getItem('state');

function setup() {
  console.log(state);
  myCanvas = createCanvas(width,height);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  soundFormats('mp3', 'ogg','wav');

  if(state == 1){
    sounds[0][0] = s1;
    sounds[0][1] = s2;
    sounds[0][2] = s3;
    sounds[1][0] = s4;
    sounds[1][1] = s5;
    sounds[1][2] = s6;

  }
  if(state == 2){
    sounds[0][0] = d1;
    sounds[0][1] = d2;
    sounds[0][2] = d3;
    sounds[1][0] = d4;
    sounds[1][1] = d5;
    sounds[1][2] = d6;
  }
  if(state == 3){
    sounds[0][0] = l1;
    sounds[0][1] = l2;
    sounds[0][2] = l3;
    sounds[1][0] = l4;
    sounds[1][1] = l5;
    sounds[1][2] = l6;
  }

  console.log(s1);
  console.log(l6);

  let trackingImg = document.getElementById('trackingImg');
  if(state == 1){
    trackingImg.src = 'face.png';
  }
  if(state == 2){
    trackingImg.src = 'hand.png';
  }
  if(state == 3){
    trackingImg.src = 'fullBody.png';
  }

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  //video.hide();
}


function modelReady() {
  //select('#status').html('Model Loaded');
}

function draw() {
  push()
  translate(width,0); // move to far corner
  scale(-1.0,1.0); 
  image(video, 0, 0, width, height);
  pop()

  // Reset positions
  triggers = [
    [false, false, false],
    [false, false, false]
  ]

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // grid();
  drawCells();

  // drawSkeleton();

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function drawCells(){
  stroke(0,0,0)
  index_0 = current_indexes[0];
  index_1 = current_indexes[1];
  let row_0 = int(index_0 / 3);
  let col_0 = int(index_0 % 3);
  let row_1 = int(index_1 / 3);
  let col_1 = int(index_1 % 3);

  prevState = currentState;
//if trigger, draw two cells
  if (triggers[row_0][col_0]){
    fill(150,10,150, 100);
    //console.log(sounds[row_0][col_0]);
    // synthB.triggerAttack(sounds[row_0][col_0]);
    //d1.play();


    sounds[row_0][col_0].play();
    console.log(sounds[row_0][col_0].id);
    socket.emit('playSound',sounds[row_0][col_0].id);
    //socket.emit('playSound',"some sound");
    //s1.play();
  }
  else{
    fill(255, 255, 255, 100);
    // synthB.triggerRelease();
  }
  rect(marginLeft + col_0 * cellWidth, marginTop + row_0 * cellHeight, cellWidth, cellHeight);
  if(state == '2' || state == '3'){
    if (triggers[row_0][col_1]){
      fill(150,10,150, 100);
      console.log(sounds[row_0][col_1].id)
      //synth.triggerAttack(sounds[row_0][col_1]);
      sounds[row_1][col_1].play();
      socket.emit('playSound',sounds[row_0][col_1].id);
      //socket.emit('playSound',"some sound");

      //s2.play();
    }
    else{
      fill(255, 255, 255, 100);
      //synth.triggerRelease();
    }
    rect(marginLeft + col_1 * cellWidth, marginTop + row_1 * cellHeight, cellWidth, cellHeight);
  }

  if (triggers[row_0][col_0] || triggers[row_1][col_1]){
    currentState = true;
  }else {
    currentState = false;
  }

  if(prevState == false && currentState == true){
    change = true;
  }else{
    change = false;
  }

  if(change == true){
    count ++;
  }

  if(state == 1){
      maxCount = 1;
  }

  if(state == 2 || state == 3){
      maxCount = 10;
  }

  if (count>maxCount){
    let new_first_index = getRandomInt(6);
    let new_second_index = getRandomInt(6);
    while (new_first_index == new_second_index){
      console.log("Got Stuck");
      new_second_index = getRandomInt(6);
    }
    current_indexes = [];
    current_indexes = [new_first_index, new_second_index];
    count = 0;
  }

}





// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];

      let firstPart;
      let secondPart;
      let thirdPart;
      let fourthPart;
      if(state == '1'){
        firstPart = NOSE;
        secondPart = NOSE;
        thirdPart = NOSE;
        fourthPart = NOSE;
      }

      if(state == '2'){
        firstPart = LEFT_WRIST;
        secondPart = RIGHT_WRIST;
        thirdPart = LEFT_WRIST;
        fourthPart = RIGHT_WRIST;
      }

      if(state == '3'){
        firstPart = LEFT_HIP;
        secondPart = RIGHT_HIP;
        thirdPart = LEFT_ANKLE;
        fourthPart = RIGHT_ANKLE;
      }

      if(keypoint.part === firstPart || keypoint.part === secondPart || keypoint.part === thirdPart || keypoint.part === fourthPart) {
        // Only draw an ellipse if the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          const x = keypoint.position.x
          const y = keypoint.position.y

          fill(255, 0, 0, 0);
          noStroke();
          ellipse(width - x, y, 10, 10);

          // range of grid
          if(x > marginLeft && x < (marginLeft + gridWidth) && y > marginTop && y < (marginTop + gridHeight)) {
            const r = 2 - Math.floor((x - marginLeft) / cellWidth)
            const c = Math.floor((y - marginTop) / cellHeight)

            triggers[c][r] = true
            const trigger = c + "," + r
            if(lastTrigger !== trigger) {
              onTrigger(c, r)
            }
            lastTrigger = trigger
          } else {
            lastTrigger = "none"
          }

        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function onTrigger(column, row) {
  //console.log(column, row)
  //console.log(sounds[column][row]);
  //synthB.triggerAttack(sounds[column][row]);
  //sounds[column][row].play()
}

function grid() {
	//background(200);
  stroke(0,0,0)
  fill(255,255,255,100)
  rect(marginLeft, marginTop, gridWidth, gridHeight)
//fill the color red when reach the area
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      if(triggers[r][c]) {
        fill(255,0,0, 100)
      } else {
        fill(255,255,255, 100)
      }

      rect(marginLeft + c * cellWidth, marginTop + r * cellHeight, cellWidth, cellHeight)
    }
  }
	// for (var x = 0; x < 400; x += 400 / 2) {
	// 	for (var y = 0; y < 400; y += 400 / 2) {
	// 		strokeWeight(5);
	// 		line(x, 0, x, 400);
	// 		line(0, y, 400, y);
	// 	}
	// }
}

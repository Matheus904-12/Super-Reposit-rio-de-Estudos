// All the information is available on https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript   <-- Be sure to check it out.

// Get canvas and ctx
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Defining the position of the ball at the start
var x = canvas.width/2;
var y = canvas.height-30;

// Defining the speed of the ball
var dx = 2;
var dy = -2;

var ballRadius = 10;

// Defining a paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2; // Center the paddle

var rightPressed = false;
var leftPressed = false;

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Avoid bouncing off the walls
function avoidBouncingOff() {
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius-paddleHeight) {
    if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    }
    else {
        document.location.reload();
    }
  }
}

// Change variables when down-key pressed
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

// Change variables when up-key pressed
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Move the paddle
function movePaddle() {
  if (rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 5;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 5;
  }
}

// Game
function draw() {
  
  // Clear canvas after each frame
  clearCanvas();
  
  // Draw a ball
  drawBall();
  
  // Draw the paddle
  drawPaddle();
  
  // Move the ball
  x += dx;
  y += dy;
  
  // Move the paddle
  movePaddle();
  
  // Bounce off the walls
  avoidBouncingOff();
}

// Add event listeners on the arrow keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Play 
setInterval(draw, 10);
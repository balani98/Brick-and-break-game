//declaring canvas by variable name canvas
//defining the paddle movement variables
var rightPressed = false;
var leftPressed = false;
//defining a ball radius
var ballRadius = 10;
var canvas=document.getElementById("mycanvas");
//getting the context of canvas
var ctx=canvas.getContext("2d");
//These are dynamic parameters for moving ball
var x = canvas.width/2;
var y = canvas.height-30;
//declaring the paddle variables
var paddleHeight=10;
var paddleWidth=75; 
//paddleX is set be in center
var paddleX=(canvas.width-paddleWidth)/2;
//paddleY is kept just above height of paddle
var paddleY=canvas.height-paddleHeight;
//to update x and y
var dx=2;
var dy=-2;
//declaring the bricks variables
var brickRowCount=4;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=10;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var bricks = [{x:0,y:0}];
var bricks = [];
//score variable
var score = 0;
//LIVES VARIABLE
var lives =3;
//declaration of bricks 2-Darray 
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 ,status:1,color:"#0095DD"};
    }
}
//draw the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
//draw the lives
function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);

}
//this function detects the collision between ball and brick
//we will compare every single brick's position with ball coordinates and check whether ball is 
//in brick frame or not
function collisionDetection(){
   for(var i=0;i<brickColumnCount;i++){
      for(var j=0;j<brickRowCount;j++){
          var b=bricks[i][j];
          //calculations
          //checking whether the ball is in brick frame or not
          //if brick has status 1 then perform collision
          if(b.status==1){
          if(x>b.x &&x<b.x+brickWidth && y>b.y &&y<b.y+brickHeight){
              
              dy=-dy; //hit the ball back
              b.status=0;
              score++;
              if (x >0 && x < 480) {
                 color = get_random_color();
            }  
            if(score == brickRowCount*brickColumnCount) {
                alert("YOU WIN, CONGRATULATIONS!","Your Score is",score);
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            } 
          }

        }  
      }
   }

 return color;
}
//this function draws the bricks 
function drawBricks(){
  for(var i=0;i<brickColumnCount;i++){
      for(var j=0;j<brickRowCount;j++){
          //if brick has status 1 then draw it
        if(bricks[i][j].status==1){
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[i][j].x=brickX;
            bricks[i][j].y=brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            if(i==0)
             ctx.fillStyle="#0095DD";
            else if(i==1)
             ctx.fillStyle="#FFA500";
            else if(i==2)
             ctx.fillStyle="#228B22";
            else if(i==3)
             ctx.fillStyle="#FA8072";
            else if(i==4)
             ctx.fillStyle="#DDA0DD";
            ctx.fill();
            ctx.closePath();
        }
      }
  }
}
function get_random_color() {
    var letters = 'ABCDE'.split('');
    var color = '#';
    for (var i=0; i<3; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
var color = get_random_color();
function drawBall(){
    //this method of canvas API starts a new pathby emptying the list of sub paths
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();//this method attempts to add straight line from current point to start of current sub path
    
}
function drawPaddle(){
    
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}
function draw(){
  //drawing code 
  //we are drawing a square of 50X50 x,y,width,height
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
   drawBricks();
   drawBall();
   drawPaddle();
   drawScore();
   drawLives();
   color=collisionDetection();
   
   if(y+dy<ballRadius){
       dy=-dy;
   }else if (y+dy>canvas.height-ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        dy=dy-0.1;
       
       }else{
           lives--;
           //if there are no lives show alert Game over
            if(lives==0){
             alert("GAME OVER");
             document.location.reload();
             clearInterval(interval);
            }//if there are  lives then continue 
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }    
        }
   }
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
 }
    x+=dx;
    y+=dy;
    //updating the paddle X coordinate if right key is pressed,adding it by 7
    if(rightPressed) {
        paddleX += 7;
        //if paddle goes out of canvas from right position ,don't allow it to move further
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    //updating the paddle X position if left key is pressed,substracting it by 7
    else if(leftPressed) {
        paddleX -= 7;
        //if paddle goes out of canvas from left position ,don't allow to move in left position
        if (paddleX < 0){
            paddleX = 0;
        }
    }
   
    
}
//event listener for down event
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
   
    if (e.keyCode == 80) pauseGame();
}
function keyUpHandler(e) {
  
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
// this function gets called on mouse movement
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
    if(relativeX>=canvas.width){
       paddleX=canvas.width-paddleWidth;
    }
   
    if(relativeX<=0){
        paddleX=0;
    }
}
//pausing game by pressing p
//It works by simple logic that if user want to pause the game ,then clear the last interval 
//if user wants to continue the game ,the set the interval again for 10 milliseconds thhat will draw 
//the frame 
gamePaused=false;
function pauseGame() {
    if (!gamePaused) {
         clearInterval(interval);
        gamePaused = true;
      }
  } 
  //this function gets triggered when user presses play button
 function playGame(){
    if (gamePaused) {
        interval = setInterval(draw, 10);
        gamePaused = false;
      }
}

//it will  execute the draw function every 10 milliseconds
//keydown event to control movement of arrow keys,this event gets triggered when user presses some key
document.addEventListener("keydown", keyDownHandler, false);
//keyup event to control movement of arrow keys,this event gets triggered when user releases some key
document.addEventListener("keyup", keyUpHandler, false);
//this event is triggered when user  controls the paddle by mouse
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener('touchmove', function(e) {
    var touch = e.touches[0];
    var relativeX = touch.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
    if(relativeX>=canvas.width){
       paddleX=canvas.width-paddleWidth;
    }
    if(relativeX<=0){
        paddleX=0;
    }
    }, false);
   
var interval = setInterval(draw, 10);

let scl=10;
let snake=[];
let p;
let finish=false;
let cnv;
function setup() {
  let cols=(width)/scl;
  let rows=(height)/scl;
  rectMode(CENTER);
  cnv=createCanvas(400, 400);
  cnv.position(windowWidth/2-width/2,windowHeight/2-height/2);
  snake[0] =new Body();
  frameRate(20);
  foodLoc();
  p=createP(0);

}

function draw() {
  fill(160);
  rect(height/2,width/2,width,height);
  fill(10);
  rect(height/2,width/2,width-2*scl,height-2*scl);
  
  if(!finish)
    p.html("score:"+(snake.length-1));
  snake[snake.length-1].move();
  checkEat();
  if((snake[snake.length-1].x==width-scl/2)||
      (snake[snake.length-1].x==scl/2)||
        (snake[snake.length-1].y==height-scl/2 )||
          (snake[snake.length-1].y==scl/2))
  {
   gameOver();
  }
  for(let i=0;i<snake.length;i++)
    snake[i].display();
  if(snake[snake.length-1].eat(food))
  {
    foodLoc();
    snake.splice(0,0,new Body());
  }
  fill(255,0,0); 
  for(let i=0;i<snake.length-1;i++)
  {
    snake[i].x=snake[i+1].x;
    snake[i].y=snake[i+1].y;
  }
  ellipse(food.x,food.y,scl,scl);
}
function checkEat()
{
  for(let i=0;i<snake.length-1;i++)
  {
    if(dist(snake[snake.length-1].x,snake[snake.length-1].y,
              snake[i].x,snake[i].y)<scl)
    {
      print("bcoz");
      gameOver();
      
    }
  }
}
function foodLoc()
{
  let cols=(width)/scl;
  let rows=(height)/scl;
  food=createVector(scl*floor(random(1,cols-1))+scl/2,
                      scl*floor(random(1,rows-1))+scl/2);
}
function keyPressed()
{
  if(keyCode===UP_ARROW)
  {
    if(snake.length>1 &&snake[snake.length-1].vy==1)
    {
      gameOver();
    }
    else{
    snake[snake.length-1].vx=0;
    snake[snake.length-1].vy=-1;
  }
  }
  else if(keyCode===DOWN_ARROW)
  {
    if(snake.length>1 &&snake[snake.length-1].vy==-1)
    {
      gameOver();
    }
    else{
    snake[snake.length-1].vx=0;
    snake[snake.length-1].vy=1;
    }
  }
  else if(keyCode===LEFT_ARROW)
  {
    if(snake.length>1 &&snake[snake.length-1].vx==1)
    {
      gameOver();
    }
    else{
    snake[snake.length-1].vx=-1;
    snake[snake.length-1].vy=0;
    }
  }
  else if(keyCode===RIGHT_ARROW)
  {
    if(snake.length>1 &&snake[snake.length-1].vx==-1)
    {
      gameOver();
    }
    else{
    snake[snake.length-1].vx=1;
    snake[snake.length-1].vy=0;
    }
  } 
}
class Body{
  constructor()
  {
    this.x=3*scl/2;
    this.y=3*scl/2;
    this.vx=0;
    this.vy=0;
  }
  move()
  {
    this.x=this.x+this.vx*scl;
    this.y=this.y+this.vy*scl;
    this.x=constrain(this.x,scl/2,width-scl/2);
    this.y=constrain(this.y,scl/2,height-scl/2);
    
  }
  eat(food)
  {
    let d=dist(this.x,this.y,food.x,food.y); 
    if(d<scl)
    {
      return true;
    }
    return false;
  }
  display()
  {
    fill(0,255,0);
    rect(this.x,this.y,scl,scl);
  }
}
function gameOver()
{
  p.html("Game Over! Score:"+(snake.length-1));
  finish=true;
  noLoop();
}
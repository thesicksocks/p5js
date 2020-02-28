var balls = []
var b = 0
var MouseClick = 0
var X = []
var friction = 0.99
function setup() {
  createCanvas(400, 400);
  background(70, 39, 73)
  for(var c = 0; c<Math.PI*2; c+=Math.PI/7.5){
    append(X, sin(c)*20+200)
    append(X, cos(c)*20+200)
  }
  for(var a = 0; a<Math.PI*2; a+=Math.PI/7.5){
    append(X, sin(a)*20+275)
    append(X, cos(a)*20+200)
  }
  for(var d = 0; d<5; d+=1){
    append(X, 125)
    append(X, 220-d*10)
  }
  for(var e = 0; e<Math.PI+Math.PI/5; e+=Math.PI/5){
    append(X, sin(e)*10+135)
    append(X, cos(e)*10+190)
  }
  for(var i = 0; i<43;i++){
     balls[i] = new Ball(
       random(50,350),
       random(50,350),
       random(50,150),
       random(-5,5),
       random(-5,5),
       i,
       balls,
       X[i*2],X[i*2+1],
       0)
  }
}
class Ball{
  constructor(x,y,Width,xSpeed,ySpeed,id,others,desiredX, desiredY, gravity){
    this.id = id
    this.others = others
    this.x = x;
    this.y = y;
    this.desiredX = desiredX
    this.desiredY = desiredY
    this.Width = Width
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.gravity = gravity
  }
  display(){
    if(this.id % 4 == 0){
      fill(131,50,172)
    } else if(this.id % 4 == 1){
      fill(224,134,211)
    }else if(this.id % 4 == 2){
      fill(	242, 209, 201)
    }else{
      fill(186, 209, 205)
    }
    circle(this.x,this.y,this.Width/10)
  }
  move(){
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.xSpeed = this.xSpeed * friction
    this.ySpeed = this.ySpeed * friction
  }
  bounce(){
    if(MouseClick==0){
      if(this.x>400+this.Width/2 || this.x<this.Width/2){
        this.xSpeed = this.xSpeed * -1
      }
      if(this.y>400-this.Width/2 || this.y<this.Width/2){
        this.ySpeed = this.ySpeed * -1
      }
      for(let i = this.id; i<this.others.length;i++){
        var dx = this.others[i].x - this.x
        var dy = this.others[i].y - this.y
        var distance = sqrt(dx^2+dy^2)
        var minDist = this.others[i].Width/2 + this.Width/2
        if(distance<minDist){
          var angle = atan2(dy,dx)
          var targetX = this.x + cos(angle) *minDist
          var targetY = this.y + sin(angle) * minDist
          var ax = (targetX - this.others[i].x)*0.001
          var ay = (targetY - this.others[i].y)*0.001
          this.xSpeed -= ax
          this.ySpeed -= ay
          this.others[i].xSpeed += ax
          this.others[i].ySpeed += ay
        }
      }
    }
    if(MouseClick==1){
      this.xSpeed = -(this.x-this.desiredX)/10*b
      this.ySpeed = -(this.y-this.desiredY)/10*b
    }
    if(MouseClick>1){
      this.ySpeed += this.gravity
      this.gravity+= 0.02
      if(this.y>400-this.Width/20 || this.y<this.Width/20){
        this.ySpeed = 0
        this.gravity = this.gravity * -0.95
        this.y = 400
      }
    }
  }
}

function mousePressed(){
  MouseClick += 1
  if(MouseClick==2){
    b=0
  }
}


function draw() {
  background(70, 39, 73,70);
  noStroke()
  fill(255)
  if(MouseClick == 1){
    if(b<5){
      b+= 0.02
    }
  }
  text(X.length/2, 200,200)
  balls.forEach(ball=>{
    ball.move()
    ball.bounce()
    ball.display()
  })
}
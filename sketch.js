var bird, birdFly;
var branch, branch1, branch2, branch3, branch4, branch5, branch6;
var leaf, leaf1, leaf2;
var bg, bgImg;
var debirsGroup;
var score = 0;
var GameState = "play";

function preload(){
  birdFly = loadAnimation("bird0.png","bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png");
  
  branch1 = loadImage("Branch1.png");
  branch2 = loadImage("Branch2.png");
  branch3 = loadImage("Branch3.png");
  branch4 = loadImage("Branch4.png");
  branch5 = loadImage("GreenBranch.png");
  branch6 = loadImage("RedBranch.png");
  
  leaf1 = loadImage("GreenLeaf.png");
  leaf2 = loadImage("YellowLeaf.png");
  
  bgImg = loadImage("Asky.png")
}

function setup() {
  createCanvas = (400,400);
  
  bg = createSprite(200,200,400,400);
  bg.addImage(bgImg);
  bg.x = bg.width / 2;
  bg.velocityX = -9;
  bg.scale = 1.5;

  
  bird = createSprite(50,100,20,20);
  bird.addAnimation("flying", birdFly)
  bird.scale = 1.5;
  bird.setCollider("rectangle",0,0,40,30);
  
  debrisGroup = new Group();
}

function draw() {
  background(225);
  
  if(GameState === "play"){
    bg.velocityX = -9;

    if(keyDown(UP_ARROW)) {
      bird.setVelocity(0,-5);
    }
    else if(keyDown(DOWN_ARROW)) {
      bird.setVelocity(0,5);    
    }
    else if(keyDown(LEFT_ARROW)) {
      bird.setVelocity(-7,0);    
    }
    else if(keyDown(RIGHT_ARROW)) {
      bird.setVelocity(3,0);    
    }
    else{
      bird.setVelocity(0,0);
    }

    if (bg.x < 0) {
      bg.x = bg.width / 2
    }
    
    
    score = score + Math.round(frameCount / 300);
    
    
    if(debrisGroup.isTouching(bird)){
      GameState = "end"
      
    }
    

    debris();
    debris2();

  }
  
  else if(GameState === "end"){
    bird.velocityY = 14;
    debrisGroup.lifetime = -1;
    debrisGroup.setVelocityXEach(0);
    bg.velocityX = 0
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 300, 50);

}

function debris() {
  if (World.frameCount % 80 === 0) {
    branch = createSprite(400, 200, 20, 20);
    var r = Math.round(random(1, 6));
    switch (r) {
      case 1:
        branch.addImage(branch1);
        branch.setCollider("rectangle",0,0,240,40)
        break;
      case 2:
        branch.addImage(branch2);
        branch.setCollider("rectangle",0,0,240,50)
        break;
      case 3:
        branch.addImage(branch3);
        branch.setCollider("rectangle",0,0,240,50)
        break;
      case 4:
        branch.addImage(branch4);
        branch.setCollider("rectangle",0,0,240,40)
        break;
      case 5:
        branch.addImage(branch5);
        branch.setCollider("rectangle",10,0,260,120)
        break;
      case 6:
        branch.addImage(branch6);
        branch.setCollider("rectangle",10,0,260,100)

        break;
      default:
        break;
    }
    branch.y = Math.round(random(10, 390));
    branch.velocityX = -7;
    branch.setLifetime = 100;
    debrisGroup.add(branch);
  }
}

function debris2() {
  if (World.frameCount % 30 === 0) {
    leaf = createSprite(400, 200, 20, 20);
    var r = Math.round(random(1, 1));
    switch (r) {
      case 1:
        leaf.addImage(leaf1);
        leaf.scale = 0.005
        leaf.setCollider("rectangle",0,0,40,40)
        break;
      case 2:
        leaf.addImage(leaf2);
        leaf.scale = 0.1
        break;
      default:
        break;
    }
    leaf.y = Math.round(random(10, 390));
    leaf.velocityX = -14;
    leaf.setLifetime = 100;

    debrisGroup.add(leaf);
  }
}
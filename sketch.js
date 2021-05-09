const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var grid;
var bg, poem;
var size = 3;
var pot, potL, potR, potImg;
var flower, flower1, flower2, flower3, flower4, flower5, flower6, flowerCount = 0;
var waterCan, waterCanImg, waterCanTilt, waterCanSwitch = 0;
var rainDrops = [];
var hearts = [], heartsX, heartsY, heartsAmount = 0, heartsImg;

function preload(){
  bg = loadImage("images/pinkBackground.png");
  poem = loadImage("images/poem.png");
  flower1 = loadAnimation("images/flower_stage_1.png");
  flower2 = loadAnimation("images/flower_stage_2.png");
  flower3 = loadAnimation("images/flower_stage_3.png");
  flower4 = loadAnimation("images/flower_stage_4.png");
  flower5 = loadAnimation("images/flower_stage_5.png");
  flower6 = loadAnimation("images/flower_stage_6.png");
  potImg = loadImage("images/plantPot.png");
  waterCanImg = loadImage("images/wateringCan.png");
  waterCanTilt = loadImage("images/wateringCanTilt.png");
  heartsImg = loadImage("images/heartEmoji.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  engine = Engine.create();
  world = engine.world;
  
  pot = new Pot(displayWidth/2,displayHeight*.75-50,200,10);
  potL = new Pot2(displayWidth/2-100,displayHeight*.75-75,10,50);
  potR = new Pot2(displayWidth/2+100,displayHeight*.75-75,10,50);

  flower = createSprite(displayWidth/2,displayHeight*.575);
  flower.addAnimation("flower1", flower1);
  flower.addAnimation("flower2", flower2);
  flower.addAnimation("flower3", flower3);
  flower.addAnimation("flower4", flower4);
  flower.addAnimation("flower5", flower5);
  flower.addAnimation("flower6", flower6);
  flower.size = 100;

  waterCan = new Can(displayWidth*.75,displayHeight*.6,300,300);
}

function draw() {
  background(bg); 
  
  Engine.update(engine);

  imageMode(CENTER);
  image(poem,displayWidth/4,displayHeight*.6,575,450);
  
  textAlign(CENTER);
  textSize(80);
  textFont("Monospace");
  fill("#455657");
  textStyle("bold");
  text("Mother's Day: Grow The Flower",displayWidth/2,displayHeight/8);

  textSize(40);
  textFont("Candara")
  textStyle("normal");
  text("You must water your plants for it to grow!", displayWidth*.75-250, displayHeight*.4, 600)
  text("To move the watering can, left click and drag the screen.", displayWidth*.75-250, displayHeight*.8, 600)
  
  if (waterCanSwitch === 1){
    if (frameCount % 1 === 0){
      rainDrops.push(new Drop(random(mouseX-60, mouseX-30), mouseY+100 ,10));
    }
  }

  for (var j = 0; j < rainDrops.length; j++) {
    rainDrops[j].display();
  }

  if (frameCount % 200 === 0 && flowerCount > 0){
    flowerCount++
  }

  if(flowerCount <= 1) {
    flower.changeAnimation("flower1", flower1);
  }
  else if(flowerCount === 2) {
    flower.changeAnimation("flower2", flower2);
  }
  else if(flowerCount === 3) {
    flower.changeAnimation("flower3", flower3);
  }
  else if(flowerCount === 4) {
    flower.changeAnimation("flower4", flower4);
  }
  else if(flowerCount === 5) {
    flower.changeAnimation("flower5", flower5);
  }
  else if(flowerCount >= 6) {
    flower.changeAnimation("flower6", flower6);
  }

  if(flowerCount >= 6) {
    heartsX = Math.round(random(0,displayWidth));
    heartsY = Math.round(random(0,displayHeight*.1));

    if (heartsAmount < 100) {
      hearts.push(new Heart(heartsX, heartsY,100));
      heartsAmount++;
    }

    for (var y = 0; y < hearts.length; y++) {
      hearts[y].display();
    }
  }
  
  //console.log(displayWidth);
  //console.log(displayHeight);
  //console.log(frameCount);
  //console.log(flowerCount);

  drawSprites();

  imageMode(CENTER);
  image(potImg,displayWidth/2,displayHeight*.75,220,210);

  waterCan.display(waterCanImg, waterCanTilt);
}

function mouseDragged(){
  Matter.Body.setPosition(waterCan.body, {x: mouseX , y: mouseY});
  waterCanSwitch = 1;
  if (mouseX > displayWidth/2-100 && mouseX < displayWidth/2+100 && mouseY < displayHeight*.75) {
    if (waterCanSwitch === 0) {
      waterCanSwitch = 1;
    }
    if (flowerCount === 0) {
      flowerCount++;
    }
    if (frameCount > 200) {
      frameCount = 0;
    }
  }
}

function mouseReleased(){
  waterCanSwitch = 0;
}
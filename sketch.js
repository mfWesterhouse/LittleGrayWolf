var wolf, wolfImage;
var lrrh, lrrhImage;
var forest, backgroundImage1;
var breadImage, bushImage, poppyImage;
var breadGroup, bushGroup, poppyGroup;
var p1, p2, p3;
var path, shortcutscene;
var pathImage, shortcutImage, cottagePathImage;
var cottage, cottageImage;
var gameOver, gameOverImage;
var endScene, endSceneImage;
var book, book1, book2, book3;
var pawprint, pawprintImage;
var startScene, startSceneImage;
var edge1, edge2;
var bar1, bar2;

var barwidth = 100;

var start = 1;
var play = 2;
var pause = 4;
var shortcut = 5;
var cottage = 6;
var end = 7;
var gameOver = 8;
var gameState = start;

var score = 0;

var life = 3;

function preload(){

  backgroundImage1 = loadImage("pictures/Forest.png");
  pathImage = loadImage("pictures/forest3.png");
  shortcutImage = loadImage("pictures/shortcut2.png");
  cottageImage = loadImage("pictures/cottage2.png");

  gameOverImage = loadImage("pictures/gameover.png");
  endSceneImage = loadImage("pictures/happilyeverafter.png");
  startSceneImage = loadImage("pictures/trail.png");

  wolfImage = loadAnimation("pictures/wolf3.png");
  lrrhImage = loadAnimation("pictures/cloak.png");

  breadImage = loadImage("pictures/bread.png");
  bushImage = loadImage("pictures/bush.png");
  poppyImage = loadImage("pictures/Poppy.png");

  book1 = loadImage("pictures/book1.png");
  book2 = loadImage("pictures/book2.png");
  book3 = loadImage("pictures/book3.png");
  pawprintImage = loadImage("pictures/pawprint.png");

}

function setup() {
  createCanvas(500,windowHeight-50);

  path = createSprite(width/2,height/2-50,20,20);
  path.addImage("trail", pathImage);
  path.scale = 0.4;
  //path.velocityY = 3;
  path.visible = false;

  wolf = createSprite(width/2,500,20,20);
  wolf.addAnimation("wolf", wolfImage);
  wolf.scale = 0.3;
  wolf.visible = false;
  wolf.setCollider("circle",0,0,150);
  wolf.debug = true;

  lrrh = createSprite(width/2,200,20,20);
  lrrh.addAnimation("lrrh", lrrhImage);
  lrrh.scale = 0.1;
  lrrh.visible = false;

  cottage = createSprite(width/2,205,20,20);
  cottage.addImage("cottage", cottageImage);
  cottage.scale = 0.5;
  cottage.visible = false;

  shortcutscene = createSprite(205,250,20,20);
  shortcutscene.addImage("shortcut", shortcutImage);
  shortcutscene.visible = false;

  gameOver = createSprite(width/2,height/2,20,20);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  endScene = createSprite(width/2,height/2,20,20);
  endScene.addImage("endScene", endSceneImage);
  endScene.scale = 0.5;
  endScene.visible = false;

  startScene = createSprite(width/2,350,20,20);
  startScene.addImage("trail",startSceneImage);
  startScene.scale = 0.2;

  book = createSprite(width/2,height/2,20,20);
  book.addImage("book2",book2);
  book.addImage("book1",book1);
  book.addImage("book3",book3);
  book.scale = 0.5;
  book.visible = false;

  p1 = createSprite(370,50,20,20);
  p1.addImage("pawprint", pawprintImage);
  p1.scale = 0.04;
  p1.visible = false;

  p2 = createSprite(410,50,20,20);
  p2.addImage("pawprint", pawprintImage);
  p2.scale = 0.04;
  p2.visible = false;

  p3 = createSprite(450,50,20,20);
  p3.addImage("pawprint", pawprintImage);
  p3.scale = 0.04;
  p3.visible = false;

  edge1 = createSprite(50,height/2,5,height);
  edge1.visible = false;

  edge2 = createSprite(440,height/2,5,height);
  edge2.visible = false;

  bar1 = createSprite(410,100,125,20);
  bar1.visible = false;
  bar1.shapeColor = "black";

  bar2 = createSprite(410,100,100,10);
  bar2.shapeColor = "red";
  bar2.visible = false;

  breadGroup = new Group();
  bushGroup = new Group();
  poppyGroup = new Group();

}

function draw() {
  background("lightblue"); 

  if(gameState === start){
    book.visible = true;
    path.visible = false;
    gameOver.visible = false;
    wolf.visible = false;
    lrrh.visible = false;
    startScene.visible = true;

    if(keyDown(32)){
      gameState = play;
    }
    if(keyDown(RIGHT_ARROW)){
      book.changeImage("book1",book1);
    }
  }

  if(gameState === play){
    startScene.visible = false;
    book.visible = false;
    background("darkgreen");
    path.visible = true;
    wolf.visible = true;
    lrrh.visible = true;
    p1.visible = true;
    p2.visible = true;
    p3.visible = true;
    bar1.visible = true;
    bar2.visible = true;

    score = score + Math.round(getFrameRate()/60);
    bar2.width = barwidth;
    barwidth = barwidth -(1*score/600);

    spawnBushes();
    spawnBread();
    spawnBushes();

    path.velocityY = 3;
    if(path.y > 350){
      path.y = width/2;
    }

    if(keyDown(RIGHT_ARROW)){
      wolf.x = wolf.x + 10;
    }
    if(keyDown(LEFT_ARROW)){
      wolf.x = wolf.x - 10;
    }

    wolf.collide(edge1);
    wolf.collide(edge2);

    if(life === 2){
      p3.visible = false;
    }
    if(life === 1){
      p2.visible = false;
      p3.visible = false;
    }
    if(life === 0){
      gameState = gameOver;
      p1.visible = false;
      p2.visible = false;
      p3.visible = false;
    }

    if(bushGroup.isTouching(wolf)){
      life = life - 1;

      bushGroup.destroyEach();

      gameState = pause;

      if(life === 2){
        p3.visible = false;
      }
      if(life === 1){
        p2.visible = false;
        p3.visible = false;
      }
      if(life === 0){
        gameState = gameOver;
        p1.visible = false;
        p2.visible = false;
        p3.visible = false;
      }
    }

    if(breadGroup.isTouching(wolf)){
      barwidth = barwidth + 50;
      breadGroup.destroyEach();
    }
    if(poppyGroup.isTouching(wolf)){
      poppyGroup.destroyEach();
      gameState = shortcut;
    }

    if(barwidth <= 0){
      gameState = gameOver;
    }

    if(score >= 1000){
      gameState = cottage;
    }
  }

  if(gameState === shortcut){
    path.visible = false;
    wolf.visible = false;
    lrrh.visible = false;
    shortcutscene.visible = true;

    breadGroup.destroyEach();
    bushGroup.destroyEach();
    poppyGroup.destroyEach();

    if(keyDown(32)){
      gameState = cottage;
      shortcutscene.visible = false;
    }
  }

  if(gameState === cottage){
    cottage.visible = true;
    shortcutscene.visible = false;
    lrrh.visible = false;
    wolf.visible = false;
    p1.visible = false;
    p2.visible = false;
    p3.visible = false;
    bar1.visible = false;
    bar2.visible = false;
    
    if(keyDown(32)){
      gameState = end;
      cottage.visible = false;
    }
  }
  if (gameState === end){
    cottage.visible = false;
    endScene.visible = true;

    if(keyDown(32)){
      reset();
    }
  }

  if(gameState === gameOver){
    path.velocityY = 0;
    lrrh.visible = false;
    wolf.visible = false;
    bar1.visible = false;
    bar2.visible = false;
    p1.visible = false;
    p2.visible = false;
    p3.visible = false;
    bushGroup.destroyEach();
    breadGroup.destroyEach();
    poppyGroup.destroyEach();

    bushGroup.setVelocityYEach(0);
    breadGroup.setVelocityYEach(0);
    poppyGroup.setVelocityYEach(0);

    gameOver.visible = true;

    if(keyDown(32)){
      window.location.reload();
    }
  }

  if(gameState === pause){
    path.velocityY = 0;
    bushGroup.setVelocityYEach(0);
    breadGroup.setVelocityYEach(0);
    poppyGroup.setVelocityYEach(0);

    breadGroup.destroyEach();
    poppyGroup.destroyEach();

    wolf.velocityX = 0;
    wolf.velocityY = 0;

    background("darkgreen");

    if(keyDown(32)){
      gameState = play;
    }
  }

  drawSprites();

  if(gameState === start){

    fill("white");
    text("Press Right Arrow to Continue",150, 400);
  }

  if(gameState === pause){
    fill("white");
    textSize(20);
    text("Uh oh, you hit a bush", width/2 -100, height/2 - 100);
    text("Game is Paused", width/2-100, height/2);
    text("Hit space bar to resume", width/2-100, height/2 + 100);
  }

  if(gameState === play){
    textSize(15);
    fill("black");
    text("Distance : " + score, 400, 125);
  }

  if(gameState === shortcut){
    fill("white");
    textSize(20);
    text("You have found a magical poppy", width/2-200,height/2);
    text("which should you this secret shortcut to the cottage", width/2 - 300,height/2 + 100);
    text("Hit space bar to continue", width/2 - 150,height/2 + 200);
  }

  if(gameState === cottage){
    fill("white");
    textSize(20);
    text("You have caught Little Red Riding Hood", width/2 - 200, height/2 - 200);
    text("And you have won the game", width/2 - 200, height/2 - 100);
    text("Press spacebar to continue", width/2 - 200, height/2);
  }
}


function spawnBushes(){

  if(frameCount%60 === 0){
    var bush = createSprite(width/2,220,20,20);
    bush.x = Math.round(random(150,300));
    bush.addImage("bush",bushImage);
    bush.scale = 0.05;
    bush.velocityY = 3;
    bush.lifeTime = -1;
    bushGroup.add(bush);

  }
}

function spawnBread(){
  if(frameCount%120 === 0){
    var bread = createSprite(width/2,220,20,20);
    bread.x = Math.round(random(150,300));
    bread.addImage("bread", breadImage);
    bread.scale = 0.01;
    bread.velocityY = 3;
    bread.lifeTime = -1;
    breadGroup.add(bread);
  }

  if(frameCount%240 === 0){
    var poppy = createSprite(width/2,220,20,20);
    poppy.x = Math.round(random(150,300));
    poppy.addImage("poppy", poppyImage);
    poppy.scale = 0.05;
    poppy.velocityY = 3;
    poppy.lifeTime = -1;
    poppyGroup.add(poppy);
  }
}

function reset(){
  gameState = start;
  score = 0;
  life = life + 3;

  gameOver.visible = false;
}
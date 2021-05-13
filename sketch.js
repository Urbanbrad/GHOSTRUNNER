
var tower,towerimg;
var ghost,ghostimg;
var door,doorimg,doorgroup;
var climber,climberimg,climbergroup;
var invisibleblock,invisibleblockgroup;
var gameState="play";
function preload (){
  towerimg=loadImage("tower.png");
  ghostimg=loadImage("ghost-standing.png");
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerimg);
  tower.velocityY=1;
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage(ghostimg);
  doorgroup=new Group();
  climbergroup=new Group();
  invisibleblockgroup=new Group();
}
function draw(){
  background("black");
  if(gameState==="play"){
    
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-4;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+4;
  }
  if(keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+2;
  spawndoors(); 
  if(climbergroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleblockgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end"
  }
  drawSprites();
  } 
  if(gameState==="end"){
    strokeWeight(5);
    stroke("red");
    fill("green");
    textSize(50);
    text("GAME OVER",150,300)
  }
}
function spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorimg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorgroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage(climberimg);
    climber.x=door.x
    climber.velocityY=1;
    climber.lifetime=800;
    climbergroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleblock=createSprite(200,15,climber.width,2);
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    invisibleblock.lifetime=800;
    invisibleblock.visible=false;
    invisibleblockgroup.add(invisibleblock);
  } 
}
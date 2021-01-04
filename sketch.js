//Create variables here
var dog, dogImage, happyDog;
var database;
var foodS, foodStock;
var addFoodButton;

function preload(){
  dogImage = loadImage("images/dogImage.png");
  happyDog = loadImage("images/happyDogImage.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  database.ref("Food").on("value", readStock);
}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(happyDog);
  }

  fill("Yellow");
  textSize(40);
  text("SHREYA'S VIRTUAL PET!", 15, 50);

  fill("Black");
  textSize(22);
  text("Food remaining: " + foodStock, 125, 100);

  fill("White");
  textSize(18);
  text("Hint: Press the UP_ARROW key to feed Shreya's pet!", 35, 475)

  drawSprites();
}

function readStock(data){
  foodStock = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


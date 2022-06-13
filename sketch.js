// creating the variables
var user, bullets, bulletsGroup, armyMan, bulletImg;

var bk_song;
var gunshot;
score=0;

// loading the images.
function preload() {
	gameOverImg = loadImage("gameOver.png");
	armyManImg= loadImage("ArmyMan.png");
	bulletImg= loadImage("bullet.png");
	bk_song = loadSound('bk_song.mp3');
	gunshot = loadSound('gunshot.wav');
}

function setup() {

  // creating the canvas.
  createCanvas(1000,600);

  // creating the user.
  user = createSprite(width/2, 500, 40, 40);
  user.shapeColor = "red";
  user.addImage("ArmyMan",armyManImg);
user.scale=0.5;	
user.setCollider("circle",0,0,75);

  // creating the gameStates.
  gameState = 0;

  // creating the scores
  life = 3;

  // creating the bricks
  bulletsGroup = new Group();


	gameOver = createSprite(width/2, height/2, 10, 10);
  gameOver.visible= false;
  
  
}

function draw() {

  // making the background as green
  background(0);  

  // defining the gameState 0.
  if(gameState === 0){

  	// creating the neccessary text.
  	textSize(30);
  	textFont("Ayuthaya");
  	fill(123,12,89);
  	text("Welcome to the Game", 100, 100); 


  	textSize(30);
  	textFont("Ayuthaya");
  	fill(123,12,89);
  	text("Dodge from as many bullets as you can!", 100, 200); 
	text("If the bullets touch you, then you lose!",100,250);
	text("Scroll with your mouse to move",100,300);

  	textSize(30);
  	textFont("Ayuthaya");
  	fill(123,12,89);
  	text("Press SPACE to play", 100, 350); 
  }

  // gameState conversion.
  if(gameState === 0 && keyDown("space")){
    gameState = 1;
	bk_song.play();
    bk_song.setVolume(0.2);
  }

  // defining the gamestate 1
  if(gameState === 1){

  	// chaging the position of the user.
  	user.x = 100;
  	user.y = mouseY;

  	// the score system
  	textSize(30);
  	textFont("Ayuthaya");
  	fill(123,12,89);
  	text("Life= " + life, 750, 85); 

	textSize(30);
  	textFont("Ayuthaya");
  	fill(123,12,79);
  	text("Score:"+ score, 750, 140);

  	// spwning the bricks.
  	if(frameCount % 20 === 0){
  		var bullets = createSprite(1010, random(0, 600), 20,20);
		  bullets.addImage("bullet",bulletImg); 
		  bullets.scale=0.45;
  		bullets.velocityX = -(10 + 7*score/100);;
  		bullets.lifetime = 200;
  		bulletsGroup.add(bullets);
  	}

  	// life reducing .
  	if(bulletsGroup.isTouching(user)){
  		bulletsGroup.destroyEach();
  		life = life - 1;
		gunshot.play();
    	gunshot.setVolume(0.5);
  	}

	  if (gameState===1){
		score = score + Math.round(getFrameRate()/60);
		
	  }
  	// gameover state
  	if(life === 0){
  		user.destroy();
		  life=0
		bullets.destroy();
		var gameOver = createSprite(width/2, height/2, 10, 10);
  		gameOver.addImage(gameOverImg);
  		gameOver.scale = 3;
		gameOver.visible = true; 
		
	  }
	}


  // drawing the sprites
  drawSprites();
}
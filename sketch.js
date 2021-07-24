var canvas
var ground , groundImage
var mario,marioImage;
var cloudGroup, pipeGroup, enemyGroup, coinGroup
var PLAY=1
var END=0
var gameState=PLAY
var ivGround
var score=0
var life=3
localStorage["higestScore"]=0
var standM
var restart,restartImage
var gameOver,gameOverImage

function preload(){
    groundImage=loadImage("ground.png")
    marioImage=loadAnimation("7.png","8.png")
    cloudImage=loadImage("cloud.png")
    pipesImage=loadImage("5.png")
    enemyImage=loadImage("4.png")
    coinImage=loadImage("3 (1).png")
    standM=loadImage("6.png")
    restartImage=loadImage("restart.png")
    gameOverImage=loadImage("gameOver.png")
    backgroundImage=loadImage("Screenshot (77).png")
}


function setup(){
    canvas=createCanvas(windowWidth,windowHeight)
    ground=createSprite(width/2,height,width,20)
    ground.addImage("ground",groundImage)
    ground.x=ground.width/2 
    mario=createSprite(50,height-100,20,20)

    mario.addAnimation ("mario",marioImage)
    mario.scale=0.8

    restart=createSprite(width/2,height/2-100)
    restart.addImage("restart",restartImage)
    restart.visible=false
    

    ivGround=createSprite(width/2,height-10,width,20)
    ivGround.visible=false
    cloudGroup= new Group()
    pipeGroup= new Group()
    enemyGroup= new Group()
    coinGroup= new Group()
    score=0

}


function draw(){
    background ("");
    fill("black")
    textSize(35)
    text("Score : "+score,70,60)
    text("Life : "+life,300,60)
    mario.collide(ivGround)

    if (gameState===PLAY){
        ground.velocityX=-70
        if(ground.x<1000){
            ground.x = ground.width/2
        }

    if(keyDown("space")){
        mario.velocityY=-20
    }
    mario.velocityY=mario.velocityY+0.8
        spawnClouds()
        spawnPipes()
        spawnEnemy()
        spawnCoins()

        if(coinGroup.isTouching(mario)){
           score=score+1
           coinGroup[0].destroy

        }



        if(pipeGroup.isTouching(mario)){
            mario.addImage("mario",standM)
            life=life-1
            gameState=END

        }

        if(enemyGroup.isTouching(mario)){
            mario.addImage("mario",standM)
            life=life-1
            enemyGroup.destroyEach()
            gameState=END
        }

    }
   
else if (gameState===END){
    restart.visible=true
    mario.addImage("mario",standM)

    if(life===0){
        gameOver=createSprite(width/2,height/2-100)
    gameOver.addImage("gameOver",gameOverImage)
    restart.visible=false
    gameOver.visible=true
    }

    if (mousePressedOver(restart)&& life>0){
        reset()
        
    }

    ground.velocityX=0
    enemyGroup.setVelocityXEach(0)
    pipeGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
}
    drawSprites()
}

function spawnClouds(){
    if(frameCount%100===0){
        var cloud = createSprite(width+20,random(30,190),40,10)
        cloud.addImage(cloudImage)
        cloud.velocityX=-3
        cloud.scale=3
        cloudGroup.add(cloud)
    }
}

function spawnPipes(){
    if (frameCount%300===0){
var pipes = createSprite(width+10,height-120,40,60)
        pipes.addImage(pipesImage)
        pipes.velocityX=-4
        pipes.scale=0.5
        pipeGroup.add(pipes)
    }
}

function spawnEnemy(){
    if (frameCount%150===0){
var enemy = createSprite(width+10,height-60,30,20)
        enemy.addImage(enemyImage)
        enemy.velocityX=-4
        enemy.scale=0.3
        enemyGroup.add(enemy)
    }
    
    }

    function spawnCoins(){
        if (frameCount%170===0){
    var coin = createSprite(width+10,random(height-250,height-600),8,8)
            coin.addImage(coinImage)
            coin.velocityX=-8
            coin.scale=0.3
            coinGroup.add(coin)

        }

        
        }
    
    function reset(){
gameState=PLAY
restart.visible=false
if(localStorage["highestScore"]<score){
    localStorage["highestScore"]=score
}
score=0
enemyGroup.destroyEach()
cloudGroup.destroyEach()
coinGroup.destroyEach()
pipeGroup.destroyEach()
mario.addAnimation ("mario",marioImage)
mario.scale=0.8
}
let STAGE_WIDTH = 700,
    STAGE_HEIGHT = 700;

let TIME_PER_FRAME = 70;

let TEXT_PRELOADING = "Loading...",
    TEXT_PRELOADING_X = 200,
    TEXT_PRELOADING_Y = 200;

//Most of the text that will be displayed
let HOME_TEXT = "THE LEGEND OF THOMAS",
    HOME_TEXT_X = 30,
    HOME_TEXT_Y = 250,
    START_TEXT = "START GAME",
    START_TEXT_X = 250,
    START_TEXT_Y = 400,
    GAME_TEXT = "GAME OVER",
    GAME_TEXT_X = 200,
    GAME_TEXT_Y = 250,
    RETURN_TEXT = "RETURN TO MAIN MENU",
    RETURN_TEXT_X = 260,
    RETURN_TEXT_Y = 390,
    SCORE_TEXT = "SCORE: ",
    SCORE_TEXT_X = 280,
    SCORE_TEXT_Y = 300,
    warning = true;

let STAGE_FONT = "bold 50px sans-serif",
    START_FONT = "bold 30px sans-serif",
    RETURN_FONT = "bold 15px sans-serif",
    SCORE_FONT = "bold 15px sans-serif";

//SRC for my images 
let my_SRC = "images/me.png";
let arrow_SRC = "images/arrow.png";
let downA_SRC = "images/arrowdown.png";
let rightA_SRC = "images/arrowright.png";
let upA_SRC = "images/arrowup.png";
let skel_SRC = "images/skeleton.png";
let arrSp_SRC = "images/arrSpeed.png";
let final_SRC = "images/finalBoss.png";
let arena_SRC = "images/a2.png";
let heart_SRC = "images/heart.png";

//used for direction and shooting direction
let up = false,
    down = true,
    right = false,
    left = false;

let enemies = 0; //enemy count
let enemySpeed = 5; //speed of enemies
let sp = 0;
let p = 0; //power up id
let level = 0,
    gameover = false,
    score = 0,
    counter = 0;

//event handlers for mouse and key
document.onkeydown = checkKey;
document.onkeyup = st;
document.onmousedown = onDown;


//Arrow object
var arrow = {
    CHAR_WIDTH: 87,
    CHAR_HEIGHT: 16,
    CHAR_START_X: 0,
    CHAR_START_Y: 0,
    IMAGE_START_X: 0,
    IMAGE_START_Y: 23,
    right: false, //direction arrrow is moving
    left: false,
    up: false,
    down: false,
    ax: 0, //
    ay: 0,
    posx: 0, //pos of arrow x
    posy: 0, //pos of arrow y
    enem: false,
    
    Draw:
    function(image, x, y){
        ctx.drawImage(image, this.IMAGE_START_X, this.IMAGE_START_Y, this.CHAR_WIDTH, this.CHAR_HEIGHT, x, y, this.CHAR_WIDTH * 1/2, this.CHAR_HEIGHT * 1/2);
        this.posx = x;
        this.posy = y;
    }
    
}

//finalBoss object
var finalBoss = {
    CHAR_WIDTH: 110,
    CHAR_HEIGHT: 118,
    CHAR_START_X: 200,
    CHAR_START_Y: 10,
    IMAGE_START_X: 48,
    IMAGE_START_Y: 30,
    posx: 0,
    posy: 0,
    life: 15,
    sc: 15, //shooter counter for delay 
    left: true, //what side of cannon is shooting
    right: false,
    middle: false,
    
    Draw:
    function(bossImage){
        ctx.drawImage(bossImage, this.IMAGE_START_X, this.IMAGE_START_Y, this.CHAR_WIDTH, this.CHAR_HEIGHT, this.CHAR_START_X, this.CHAR_START_Y, this.CHAR_WIDTH, this.CHAR_HEIGHT);
        this.posx = this.CHAR_START_X;
        this.posy = this.CHAR_START_Y;
        
    
    }
}

//skeleton object
var skeleton = {
    CHAR_WIDTH: 64,
    CHAR_HEIGHT: 65,
    CHAR_START_X: 350,
    CHAR_START_Y: 350,
    IMAGE_START_X: 0,
    IMAGE_START_Y: 643,
    SPRITE_WIDTH: 576,
    life: 3,
    x: 0,
    y: 0,
    posx: 0,
    posy: 0,
    shooting: false,
    dying: false, //flags if in process of dying
    arr: false,
    sc: 15,  //delay in shooting 
    id: 1, //id of skeleton
    
    Draw: 
    function(skelImage, x, y){
        ctx.drawImage(skelImage, x, y, this.CHAR_WIDTH, this.CHAR_HEIGHT, this.CHAR_START_X, this.CHAR_START_Y, this.CHAR_WIDTH, this.CHAR_HEIGHT);
        this.posx = this.CHAR_START_X;
        this.posy = this.CHAR_START_Y;
    }
    
}


var me = {
    CHAR_WIDTH: 64,
    CHAR_HEIGHT: 65,
    CHAR_START_X: 330,
    CHAR_START_Y: 450,
    IMAGE_START_X: 0,
    IMAGE_START_Y: 643,
    SPRITE_WIDTH: 576,
    myLife: 3, //life count
    posx: 0,
    posy: 0,
    dying: false, //dying flag
    
    Draw:
    function(myImage, myX, myY){
        ctx.drawImage(myImage, myX, myY, me.CHAR_WIDTH, me.CHAR_HEIGHT, this.CHAR_START_X, this.CHAR_START_Y, me.CHAR_WIDTH, me.CHAR_HEIGHT);
        this.posx = this.CHAR_START_X;
        this.posy = this.CHAR_START_Y;
    }
    
}


var powerUp = {
    CHAR_WIDTH: 88,
    CHAR_HEIGHT: 42,
    CHAR_START_X: 0,
    CHAR_START_Y: 0,
    IMAGE_START_X: 3,
    IMAGE_START_Y: 17,
    posx: 0,
    posy: 0,
    pid: 0,
    
    Draw:
    function(image){
        ctx.drawImage(image, this.IMAGE_START_X, this.IMAGE_START_Y, this.CHAR_WIDTH, this.CHAR_HEIGHT, this.CHAR_START_X, this.CHAR_START_Y, this.CHAR_WIDTH * 1/2, this.CHAR_HEIGHT * 1/2);
        this.posx = this.CHAR_START_X;
        this.posy = this.CHAR_START_Y;
    }
    
    
}

let stage = document.getElementById("gameCanvas");

stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;

let ctx = stage.getContext("2d");
ctx.fillStyle = "white";
ctx.font = STAGE_FONT;

gameCanvas.style.border = '2px solid #000';


//preloading images
var myImage = new Image();
myImage.ready = false;
myImage.onload = setAssetReady;
myImage.src = my_SRC;

var arrowImage = new Image();
arrowImage.ready = false;
arrowImage.onload = setAssetReady;
arrowImage.src = arrow_SRC;

var downA = new Image();
downA.ready = false;
downA.onload = setAssetReady;
downA.src = downA_SRC;

var rightA = new Image();
rightA.ready = false;
rightA.onload = setAssetReady;
rightA.src = rightA_SRC;

var upA = new Image();
upA.ready = false;
upA.onload = setAssetReady;
upA.src = upA_SRC;

var skelImage = new Image();
skelImage.ready = false;
skelImage.onload = setAssetReady;
skelImage.src = skel_SRC;

var arrSpeed = new Image();
arrSpeed.ready = false;
arrSpeed.onload = setAssetReady;
arrSpeed.src = arrSp_SRC;

var hImage = new Image();
hImage.ready = false;
hImage.onload = setAssetReady;
hImage.src = heart_SRC;

var boss = new Image();
boss.ready = false;
boss.onload = setAssetReady;
boss.src = final_SRC;

var arena = new Image();
arena.ready = false;
arena.onload = setAssetReady;
arena.src = arena_SRC;

//d bool for level delay
var d = false;
var bl = 15;

//arrays for arrows, skeletons, and power ups
var arrows = [];
var skeletons = [];
var pUp = [];


//function is used for image preloading
function setAssetReady()
{
	this.ready = true;
}

ctx.fillRect(0, 0, stage.width, stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);

var preloader = setInterval(preloading, TIME_PER_FRAME);

var myX, myY, sX, sY, aindex;
//myX, myY, sX, sY deal with sprite animation
//aindex is used for arrow insertion in array

let finalscore = 0;

myX = me.IMAGE_START_X;
myY = me.IMAGE_START_Y;

var game;

function preloading()
{	
	if (myImage.ready)
	{
		clearInterval(preloader);
		game = setInterval(update, TIME_PER_FRAME);	
	}
}

//function that creates and spawns skeleton at x,y
function spawn(x, y){
    enemy = Object.create(skeleton);
    enemy.CHAR_START_X = x;
    enemy.CHAR_START_Y = y;
    enemy.x = enemy.IMAGE_START_X;
    enemy.y = enemy.IMAGE_START_Y;
    enemy.posx = x;
    enemy.posy = y;
    enemy.id = enemies + enemy.id; //skeleton id alters
    return enemy; 
}

//AI function for skeleton movement based on id
function AI(s){
    //id one mainly moves horizontly with player movement
    if(s.id == 1){
        if(!s.shooting){
            if(s.posx == me.CHAR_START_X){
                s.shooting = true; //if skeleton has same x position as player will trigger shoot function
            }

            //right movement of skeleton
            else if(s.posx < me.CHAR_START_X){
                s.CHAR_START_X += 5;
                s.y = 703;
                s.x += s.CHAR_WIDTH;
                if(s.x >= s.SPRITE_WIDTH)
                    s.x = 0;
            }
            
            //left movement of skeleton
            else if(s.posx > me.CHAR_START_X){
                s.CHAR_START_X -= 5;
                s.y = 575;
                s.x += s.CHAR_WIDTH;
                if(s.x >= s.SPRITE_WIDTH)
                    s.x = 0;
            }

        }
        else {
            enemyShoot(s); //shoot function for enemy
        }
    }
    
    //this skeleton primarily has veritcal movement with player
    if(s.id == 2){
        console.log(s.posy + " , " + me.CHAR_START_Y);
        if(!s.shooting){
            if(s.posy == me.CHAR_START_Y){
                s.shooting = true; //trigger for shooting
            }
            
            //down movement of skeleton
            else if(s.posy < me.CHAR_START_Y){
                s.CHAR_START_Y += 5;
                s.y = 638;
                s.x += s.CHAR_WIDTH;
                if(s.x >= s.SPRITE_WIDTH)
                    s.x = 0;
            }
            
            //up movement of skeleton
            else if(s.posy > me.CHAR_START_Y){
                s.CHAR_START_Y -= 5;
                s.y = 510;
                s.x += s.CHAR_WIDTH;
                if(s.x >= s.SPRITE_WIDTH)
                    s.x = 0;
            }
        }
        
        else {
            enemyShoot(s);
        }
        
    }
        
}

//function that deals with key press event 
function checkKey(e){
    //moves only if player is alive
    if(!me.dying && me.myLife > 0){
        e = e || window.event;

        //w key (up)
        if(e.keyCode == '87'){
            clearD();
            up = true;
            if(me.CHAR_START_Y > 10){
                me.CHAR_START_Y -= 10;
                myY = 510;
                myX += me.CHAR_WIDTH;
                if(myX >= me.SPRITE_WIDTH)
                    myX = 0;
            }
        }

        //a key (left)
        if(e.keyCode == '65'){
            clearD();
            left = true;
            if(me.CHAR_START_X > 0){
                me.CHAR_START_X -= 10;
                myY = 575;
                myX += me.CHAR_WIDTH;
                if(myX >= me.SPRITE_WIDTH)
                    myX = 0;
            }
        }

        //s key (down)
        if(e.keyCode == '83'){
            clearD();
            down = true;
            if(me.CHAR_START_Y < stage.height - 90){
                me.CHAR_START_Y += 10;
                myY = 638;
                myX += me.CHAR_WIDTH;
                if(myX >= me.SPRITE_WIDTH)
                    myX = 0;
            }
        }

        //d key (right)
        if(e.keyCode == '68'){
            clearD();
            right = true;
            if(me.CHAR_START_X < stage.width - 70){
                me.CHAR_START_X += 10;
                myY = 703;
                myX += me.CHAR_WIDTH;
                if(myX >= me.SPRITE_WIDTH)
                    myX = 0;
            }

        }

        //space bar (shoot)
        if(e.keyCode == '32'){
            shoot();
        }
    }
}

//clears direction of player if not moving or change of key press
function clearD(){
    up = false; down = false; left = false;
    right = false;
}

//sets user back to starting position animation
function st(e){
    if(me.myLife > 0){
    	myX = 0;
    }
}

//creates arrow object at x,y
function fire(x, y){
    arr = Object.create(arrow);
    arr.ax = x
    arr.ay = y;
    aindex = arrows.length;
    return arr
}

function shoot(){
    //if character is up fire animation is up and arrow is fired up
    if(up){
        //41, 4
        myY = 1027;
        myX += me.CHAR_WIDTH;
        if(myX >= 817){
            myX = 0;
        }
    
        if(myX >= 650 && myX < 650 + me.CHAR_WIDTH){
            value = fire(me.CHAR_START_X + 25, me.CHAR_START_Y - 30);
            arrows.push(value);
            arrows[aindex].up = true; //direction of arrow
            arrows[aindex].IMAGE_START_X = 41;
            arrows[aindex].IMAGE_START_Y = 4;
            arrows[aindex].CHAR_WIDTH = 16;
            arrows[aindex].CHAR_HEIGHT = 85;
            arrows[aindex].Draw(upA, arrows[aindex].ax, arrows[aindex].ay);
        }
    }
    
    //if character is moving down or facing down 
    if(down){
        myY = 1150;
        myX += me.CHAR_WIDTH;
        if(myX >= 817)
            myX = 0;
        
        if(myX >= 650 && myX < 650 + me.CHAR_WIDTH){
            value = fire(me.CHAR_START_X + 22, me.CHAR_START_Y + 30);
            arrows.push(value);
            arrows[aindex].down = true; //direction of arrow
            arrows[aindex].IMAGE_START_X = 40;
            arrows[aindex].IMAGE_START_Y = 5;
            arrows[aindex].CHAR_WIDTH = 16;
            arrows[aindex].CHAR_HEIGHT = 85;
            arrows[aindex].Draw(downA, arrows[aindex].ax, arrows[aindex].ay);
        }
    }
    
    //if player is facing left 
    if(left){
        myY = 1088;
        myX += me.CHAR_WIDTH;
        
        if(myX >= 817)
            myX = 0;
        
        if(myX >= 650 && myX < 650 + me.CHAR_WIDTH){
            value = fire(me.CHAR_START_X, me.CHAR_START_Y + 30);
            arrows.push(value);
            arrows[aindex].left = true; //direction of arrow
            arrows[aindex].Draw(arrowImage, arrows[aindex].ax, arrows[aindex].ay);
        }
            
    }
    
    //if player is facing right
    if(right){
        myY = 1216;
        myX += me.CHAR_WIDTH;
        if(myX >= 817)
            myX = 0;
        
        if(myX >= 650 && myX < 650 + me.CHAR_WIDTH){
            value = fire(me.CHAR_START_X + 30, me.CHAR_START_Y + 30);
            arrows.push(value);
            arrows[aindex].IMAGE_START_X = 6;
            arrows[aindex].IMAGE_START_Y = 38;
            arrows[aindex].CHAR_WIDTH = 87;
            arrows[aindex].CHAR_HEIGHT = 16;
            arrows[aindex].right = true;
            arrows[aindex].Draw(rightA, arrows[aindex].ax, arrows[aindex].ay);
        }
        
    }
}

//function that deals with enemies that are shooting
function enemyShoot(s){
    //if skeleton is id 1 and shooting down
    if(s.id == 1 && s.posy < me.posy){
        s.y = 1150;
        //sc deals with delay in enemy shooting multiple arrows
        if(s.sc < 15){
            s.sc++;
            s.x = 0;
        }
        else {
            s.x += me.CHAR_WIDTH;
        }
        if(s.x >= 817){
            s.x = 0;
            s.shooting = false;
            s.sc = 0;
        }
        
        if(s.x >= 650 && s.x < 650 + s.CHAR_WIDTH && s.sc == 15){
        value = fire(s.CHAR_START_X + 22, s.CHAR_START_Y + 30);
        arrows.push(value);
        arrows[aindex].enem = true; //enemy arrow indicator
        arrows[aindex].IMAGE_START_X = 40;
        arrows[aindex].IMAGE_START_Y = 5;
        arrows[aindex].CHAR_WIDTH = 16;
        arrows[aindex].CHAR_HEIGHT = 85;
        arrows[aindex].down = true; //direction of arrow
        arrows[aindex].Draw(downA, arrows[aindex].ax, arrows[aindex].ay);
        }
    }
    
    //if skeleton is id 1 and shooting up at player
    else if(s.id == 1 && s.posy > me.posy){
        s.y = 1027;
        if(s.sc < 15){
            s.sc++;
            s.x = 0;
        }
        else {
            s.x += me.CHAR_WIDTH;
        }
        if(s.x >= 817){
            s.x = 0;
            s.shooting = false;
            s.sc = 0;
        }
        
        if(s.x >= 650 && s.x < 650 + s.CHAR_WIDTH && s.sc == 15){
            value = fire(s.CHAR_START_X + 25, s.CHAR_START_Y - 30);
            arrows.push(value);
            arrows[aindex].up = true;
            arrows[aindex].enem = true;
            arrows[aindex].IMAGE_START_X = 41;
            arrows[aindex].IMAGE_START_Y = 4;
            arrows[aindex].CHAR_WIDTH = 16;
            arrows[aindex].CHAR_HEIGHT = 85;
            arrows[aindex].Draw(upA, arrows[aindex].ax, arrows[aindex].ay);
        }
    }
    
    //if skeleton is id 2 and shooting right at player
    if(s.id == 2 && s.posx < me.posx){
        s.y = 1216;
        if(s.sc < 15){
            s.sc++;
            s.x = 0;
        }
        else {
            s.x += me.CHAR_WIDTH;
        }
        
        if(s.x >= 817){
            s.x = 0;
            s.shooting = false;
            s.sc = 0;
        }
        
        if(s.x >= 650 && s.x < 650 + s.CHAR_WIDTH){
            value = fire(s.CHAR_START_X + 30, s.CHAR_START_Y + 30);
            arrows.push(value);
            arrows[aindex].IMAGE_START_X = 6;
            arrows[aindex].IMAGE_START_Y = 38;
            arrows[aindex].CHAR_WIDTH = 87;
            arrows[aindex].CHAR_HEIGHT = 16;
            arrows[aindex].right = true;
            arrows[aindex].enem = true;
            arrows[aindex].Draw(rightA, arrows[aindex].ax, arrows[aindex].ay);
        }
        
    }
    
    //if skeleton is id 2 and shooting left at player
    else if(s.id == 2 && s.posx > me.posx){
        s.y = 1088;
        if(s.sc < 15){
            s.sc++;
            s.x = 0;
        }
        else {
            s.x += me.CHAR_WIDTH;
        }
        
        if(s.x >= 817){
            s.x = 0;
            s.shooting = false;
            s.sc = 0;
        }
        
        if(s.x >= 650 && s.x < 650 + s.CHAR_WIDTH){
            value = fire(s.CHAR_START_X, s.CHAR_START_Y + 30);
            arrows.push(value);
            arrows[aindex].left = true;
            arrows[aindex].enem = true;
            arrows[aindex].Draw(arrowImage, arrows[aindex].ax, arrows[aindex].ay);
        }
    }
        
}

//checks if player arrow hits enemy
function checkArrow(a, s){
    hit = false; //hit bool
    //checks if in bounds of skeleton enemy 
    if(a.posx < s.posx + 45 && a.posx + a.CHAR_WIDTH + 4 > s.posx + 32 && a.posy < s.posy + 35 && a.posy + a.CHAR_HEIGHT + 5 > s.posy + 40){
        hit = true;
        s.life--; //subtracts enemy life
    }
    return hit;
    
}

//checks if player arrow hits boss
function checkBArrow(a, b){
    hit = false; //hit indicator
    //checks if arrow is in bounds of boss
    if(a.posx < b.posx + 100 && a.posx + a.CHAR_WIDTH + 4 > b.posx + 10 && a.posy < b.posy + 100 && a.posy + a.CHAR_HEIGHT + 5 > b.posy + 115){
        hit = true;
        b.life--; //subtracts boss life
    }
    return hit;
}

//checks if enemy arrow hits player
function checkEArrow(a){
    hit = false;
    //checks if arrow is in bounds of player
    if(a.posx < me.posx + 45 && a.posx + a.CHAR_WIDTH + 4 > me.posx + 32 && a.posy < me.posy + 35 && a.posy + a.CHAR_HEIGHT + 5 > me.posy + 40){
        hit = true;
        me.myLife--; //subtracts from players life
    }
    return hit;
}

//function that checks if player grabs power up
function grab(p){
    gr = false; //grab indicator
    //checks if player touches power up
    if(me.posx < p.posx + 45 && me.posx + me.CHAR_WIDTH  > p.posx + 32 && me.posy < p.posy + 35 && p.posy + me.CHAR_HEIGHT > p.posy + 40 && p.pid == 2){
        gr = true;
    }
    else if(me.posx < p.posx && me.posx + me.CHAR_WIDTH > p.posx && me.posy < p.posy && p.posy + me.CHAR_HEIGHT > p.posy && p.pid == 1){
        gr = true;
    }
    return gr;
}

//checks life of skeleton and triggers death if life = 0
//retruns true if skeleton's death animation is complete
function checkSlife(s, i){
    //starts animation of skeleton dying
    if(s.life <= 0 && s.dying === false){ 
        s.x = 0;
        s.y = 1289;
        s.dying = true; //dying indicator
        return false;
    }

    if(s.dying === true){
        if(s.x > 386){
            return true; //death animation is complete
        }
        else {
            s.x += s.CHAR_WIDTH;
            return false;
        }
    }
}

//checks life of player
function checklife(me){
    if(me.myLife === 0 && myY != 1289){
        myX = 0;
        myY = 1289;
        me.dying = true; //player dying indicator
    }
    if(me.myLife === 0 && myY == 1289){
        if(myX > 386){
            gameOver(); //if death animation is over triggers game over
        }
        else {
            myX += me.CHAR_WIDTH;
        }
    }
}

//checks if arrow is out of bounds
function outofBounds(a){
    if(a.ax > stage.width || a.ax < 0 || a.ay > stage.height || a.ay < 0){
        return true;
    }
    else {
        return false;
    }
}

//creates a heart power up
function heart(){
    h = Object.create(powerUp);
    h.IMAGE_START_X = 26;
    h.IMAGE_START_Y = 20;
    h.CHAR_HEIGHT = 41;
    h.CHAR_WIDTH = 44;
    h.x = h.IMAGE_START_X;
    h.y = h.IMAGE_START_Y;
    h.CHAR_START_X = me.CHAR_START_X;
    h.CHAR_START_Y = me.CHAR_START_Y - 50;
    h.pid = 1;
    return h;
}

//creates arrow Speed up power up
function arrowSpeed(){
    speedUp = Object.create(powerUp);
    speedUp.x = speedUp.IMAGE_START_X;
    speedUp.y = speedUp.IMAGE_START_X;
    speedUp.CHAR_START_X = me.CHAR_START_X;
    speedUp.CHAR_START_Y = me.CHAR_START_Y - 100;
    speedUp.pid = 2;
    return speedUp;
}

//creates final boss object
function final(){
    finalboss = Object.create(finalBoss);
    return finalboss;
}

//AI for final boss
function bossAI(b){
    if(b.posx + 20 < me.CHAR_START_X){
        b.CHAR_START_X += 2;          
    }

    else if(b.posx > me.CHAR_START_X){
        b.CHAR_START_X -= 2;
    }
    
    if(b.sc == 15){
        bossShoot(b); //shooting function of boss
        b.sc = 0; //shooting lag for boss
    }
    else {
        b.sc++;
    }
}

function bossShoot(b){
    //boss pattern shooting is left, right, middle
    //if left cannon is ready to fire makes arrow 
    if(b.left){
        value = fire(b.CHAR_START_X + 20, b.CHAR_START_Y + 80);
        arrows.push(value);
        arrows[aindex].down = true;
        arrows[aindex].enem = true;
        arrows[aindex].IMAGE_START_X = 40;
        arrows[aindex].IMAGE_START_Y = 5;
        arrows[aindex].CHAR_WIDTH = 16;
        arrows[aindex].CHAR_HEIGHT = 85;
        arrows[aindex].Draw(downA, arrows[aindex].ax, arrows[aindex].ay);
        b.left = false; 
        b.right = true;
    }
    
    //if right cannon is ready to fire
    else if(b.right){
        value = fire(b.CHAR_START_X + 80, b.CHAR_START_Y + 80);
        arrows.push(value);
        arrows[aindex].down = true;
        arrows[aindex].enem = true;
        arrows[aindex].IMAGE_START_X = 40;
        arrows[aindex].IMAGE_START_Y = 5;
        arrows[aindex].CHAR_WIDTH = 16;
        arrows[aindex].CHAR_HEIGHT = 85;
        arrows[aindex].Draw(downA, arrows[aindex].ax, arrows[aindex].ay);
        b.right = false;
        b.middle = true;
    }
    
    //if middle cannon is ready to fire
    else if(b.middle){
        value = fire(b.CHAR_START_X + 50, b.CHAR_START_Y + 80);
        arrows.push(value);
        arrows[aindex].down = true;
        arrows[aindex].enem = true;
        arrows[aindex].IMAGE_START_X = 40;
        arrows[aindex].IMAGE_START_Y = 5;
        arrows[aindex].CHAR_WIDTH = 16;
        arrows[aindex].CHAR_HEIGHT = 85;
        arrows[aindex].Draw(downA, arrows[aindex].ax, arrows[aindex].ay);
        b.middle = false;
        b.left = true;
    }
    
    //if player tries to go above boss creates onslaught of arrows
    if(me.posy <= b.posy + b.CHAR_HEIGHT){
        value = fire(b.CHAR_START_X, b.CHAR_START_Y + 40)
        arrows.push(value);
        arrows[aindex].left = true;
        arrows[aindex].enem = true;
        arrows[aindex].Draw(arrowImage, arrows[aindex].ax, arrows[aindex].ay);
        
        value = fire(b.CHAR_START_X + b.CHAR_WIDTH, b.CHAR_START_Y + 40);
        arrows.push(value);
        arrows[aindex].right = true;
        arrows[aindex].enem = true;
        arrows[aindex].IMAGE_START_X = 6;
        arrows[aindex].IMAGE_START_Y = 38;
        arrows[aindex].CHAR_WIDTH = 87;
        arrows[aindex].CHAR_HEIGHT = 16;
        arrows[aindex].Draw(rightA, arrows[aindex].ax, arrows[aindex].ay);
        
    }
    
}

//checks where mouse is clicked, primarily used for start and game over screens
function onDown(evt){
    console.log(evt.clientX);
    console.log(evt.clientY);
    if(evt.clientX >= 240 && evt.clientX <= 460 && evt.clientY >= 365 && evt.clientY <= 410 && level == 0){
        level++;
    }
    else if(evt.clientX >= 240 && evt.clientX <= 460 && evt.clientY >= 365 && evt.clientY <= 410 && gameover == true){
        level = 0;
        enemies = 0;
        me.myLife = 3;
        me.dying = false;
        gameover = false;
        myX = 0;
        myY = 643;
        finalscore = "";
        score = 0;
        counter = 0;
    }
}

//game over function that triggers game over screen and deallocates arrows and skeletons
function gameOver(){
    gameover = true;
    console.log("Game Over");
    finalscore = SCORE_TEXT + score;
    warning = true; //boss warning message
    enemies = 0;
    arrows = [];
    skeletons = [];
    p = 0;
    
}

//main function of game
function update(){
    
    ctx.fillStyle = "#dfbf9f";
	ctx.fillRect(0, 0, stage.width, stage.height);
    
    //background of canvas
    ctx.drawImage(arena, 0, 0, 700, 700, 0, 0, 700, 700);

    
    if(level == 3 && warning == true){
        ctx.fillStyle = "white";
        ctx.fillRect(0, stage.height - 50, stage.width, 50);
        ctx.fillStyle = "#000";
        ctx.font = START_FONT;
        ctx.fillText("BOSS INCOMING...", 200, stage.height - 15);
        if(counter == 40){
            warning = false;
        }
        
    }
    
    //Start screen display
    if(level == 0){
        ctx.fillStyle = "#dfbf9f";
        ctx.fillRect(0, 0, stage.width, stage.height);
        ctx.font = STAGE_FONT;
        ctx.fillStyle = "#000";
        ctx.fillText(HOME_TEXT, HOME_TEXT_X, HOME_TEXT_Y);
        ctx.fillStyle = "white";
        ctx.fillRect(240, 365, 220, 50);
        ctx.fillStyle = "#000";
        ctx.font = START_FONT;
        ctx.fillText(START_TEXT, START_TEXT_X, START_TEXT_Y);
        ctx.font = RETURN_FONT;
        ctx.fillText("W-up A-left S-down D-right", 240, 600);
        ctx.fillText("SPACE(HOLD)-shoot", 265, 650);
	ctx.fillText("*Please be full screen to see the entire game", 180, 680);
    }
    
    //creates enemies based on level and level delay
    if (enemies == 0 && level > 0 && !gameover && counter == 40){
        //spawns one skeleton
        if(level == 1){
            value = spawn(0, 150);
            skeletons.push(value);
            enemies++;
            d = true;
            p = 1;
        }
        //spawns two skeletons
        if(level == 2){
            value = spawn(0, 200);
            skeletons.push(value);
            enemies++;
            value1 = spawn(600, 250);
            skeletons.push(value1);
            enemies++;
            d = true;
            p = 2
        }
        //spawns boss 
        if(level == 3){
            finalBoss = final();
            enemies++;
            d = true;
            p = 1;
        }
        //spawns three skeletons
        if(level >= 4){
            value = spawn(0, 200);
            skeletons.push(value);
            enemies++;
            value1 = spawn(20, 200);
            skeletons.push(value1);
            enemies++;
            value2 = spawn(600, 250);
            value2.id = 2;
            skeletons.push(value2);
            enemies++;
            p = 2;
            d= true;
        }
        
    }

    //increments delay in between levels 
    if(level > 0 && enemies == 0){
        counter++;
    }
    
    //if not game over draw player
    if(!gameover){  
        me.Draw(myImage, myX, myY);
        checklife(me);
    }
    
    //checks if skeleton is alive and automates accordingly
    for(var i = 0; i < skeletons.length; i++){
        var dead = checkSlife(skeletons[i], i);
        if(dead){
            skeletons[i].Draw(skelImage, skeletons[i].x, skeletons[i].y);
            skeletons.splice(i, 1);
            score += 100;
            enemies--;
            break;
        }
        //automates skeleton based on player location
        if(!skeletons[i].dying){
            AI(skeletons[i]);
        }
        skeletons[i].Draw(skelImage, skeletons[i].x, skeletons[i].y);
    }
    
    //automates arrows that exist and are flying
    for(var i = 0; i < arrows.length; i++){
        if(arrows[i].left){
            //enemy arrows fly slower
            if(arrows[i].enem){
                arrows[i].ax -= 8;
            }
            //player arrows
            else {
                arrows[i].ax -= 30 + sp;
            }
            arrows[i].Draw(arrowImage, arrows[i].ax, arrows[i].ay);
        }
        if(arrows[i].right){
            if(arrows[i].enem){
                arrows[i].ax += 8;
            }
            else {
                arrows[i].ax += 30 + sp;
            }
            arrows[i].Draw(rightA, arrows[i].ax, arrows[i].ay);
        }
        
        if(arrows[i].down){
            if(arrows[i].enem){
                arrows[i].ay += 8;
            }
            else {
                arrows[i].ay += 30 + sp;
            }
            arrows[i].Draw(downA, arrows[i].ax, arrows[i].ay);
            
        }
        
        if(arrows[i].up){
            if(arrows[i].enem){
                arrows[i].ay -= 8;
            }
            else {
                arrows[i].ay -= 30 + sp;
            }
            arrows[i].Draw(upA, arrows[i].ax, arrows[i].ay);
        }
        
    }
    
    //checks if arrows hit enemy or player or if they are out of bounds
    //splices arrow from array if condition is satisfied
    for(var i = 0; i < arrows.length; i++){
        if(outofBounds(arrows[i])){
            arrows.splice(i, 1);
            continue;
        } 
        if(arrows[i].enem){
            var hit = checkEArrow(arrows[i]);
            if(hit){
                arrows.splice(i, 1);
                continue;
            }
        }
        for(var j = 0; j < skeletons.length; j++){
            if(!arrows[i].enem && checkArrow(arrows[i], skeletons[j])){
                arrows.splice(i, 1);
                break;       
            }
        }
        
    }
    
    //draws power up if it exists
    for(var i = 0; i < pUp.length; i++){
        var gr = grab(pUp[i]);
        if(gr){
            if(pUp[i].pid == 1){
                me.myLife++;
            }
            else {
                sp += 5;
            }
            pUp.splice(i, 1);
            break;
        }
        if(pUp[i].pid == 1){
            pUp[i].Draw(hImage);
        }
        else {
            pUp[i].Draw(arrSpeed);
        }
    }
    
    //draws boss if on appropriate level
    if(level == 3){
        ctx.fillStyle = "red";
        ctx.fillRect(finalboss.posx - 20, 0, bl * 10, 10);
        ctx.fillStyle = "#339933";
        ctx.fillRect(finalboss.posx - 20, 0, finalboss.life * 10, 10);
        if(finalboss.life == 0){
            enemies--;
            score += 1000;
            counter = 0;
        }
        else {
            bossAI(finalboss);
            finalboss.Draw(boss);
        }
        //checks bosses arrows
        for(var i = 0; i < arrows.length; i++){
            if(!arrows[i].enem && checkBArrow(arrows[i], finalboss)){
                arrows.splice(i, 1);
            }
        }
        
    }
    
    //spawns speed power up after first level
    if(enemies == 0 && p == 1 && !gameover && d){
        pUp.push(arrowSpeed());
        counter = 0;
        level++; 
        d = false;
    }
    
    else if(enemies == 0 && p == 2 && !gameover && d){
        pUp.push(heart());
        counter = 0;
        level++;
        d = false;
    }
    

    //displays current score and lives if game is running 
    if(!gameover && level > 0){
        ctx.fillStyle = "white";
        ctx.fillRect(0, stage.height - 20, stage.width, 20);
        ctx.fillStyle = "#000";
        ctx.font = SCORE_FONT;
        ctx.fillText("SCORE: " + score, 590, stage.height - 6);
        ctx.fillText("Level: " + level, 300, stage.height- 6);
        ctx.fillText("Lives: " + me.myLife, 0, stage.height - 6);
    
    }
    

    
    //displays gameover screen
    if(gameover){
        ctx.fillStyle = "#dfbf9f";
        ctx.fillRect(0, 0, stage.width, stage.height);
        ctx.font = STAGE_FONT;
        ctx.fillStyle = "#000";
        ctx.fillText(GAME_TEXT, GAME_TEXT_X, GAME_TEXT_Y);
        ctx.font = START_FONT;
        ctx.fillText(finalscore, SCORE_TEXT_X, SCORE_TEXT_Y);
        ctx.fillStyle = "white";
        ctx.fillRect(240, 365, 220, 50);
        ctx.fillStyle = "#000";
        ctx.font = RETURN_FONT;
        ctx.fillText(RETURN_TEXT, RETURN_TEXT_X, RETURN_TEXT_Y);
    }
      
    
    
}

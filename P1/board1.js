function makeNoteDom(a,b,c){var e=document.createElement("div");a=document.createTextNode(a);e.appendChild(a);a=document.createElement("div");b=document.createTextNode(b);a.appendChild(b);b=document.createElement("div");b.appendChild(e);b.appendChild(a);c.appendChild(b)}function makeNotes(a,b){for(var c=0;c<a.length;c++)makeNoteDom(a[c].title,a[c].content,b)}
function main(){var a=document.getElementById("notes");makeNotes([{title:"Note 1",content:"Content of Note 1"},{title:"Note 2",content:"Content of Note 2"}],a)}main();var STAGE_WIDTH=700,STAGE_HEIGHT=700,TIME_PER_FRAME=70,TEXT_PRELOADING="Loading...",TEXT_PRELOADING_X=200,TEXT_PRELOADING_Y=200,HOME_TEXT="THE LEGEND OF THOMAS",HOME_TEXT_X=30,HOME_TEXT_Y=250,START_TEXT="START GAME",START_TEXT_X=250,START_TEXT_Y=400,GAME_TEXT="GAME OVER",GAME_TEXT_X=200,GAME_TEXT_Y=250,RETURN_TEXT="RETURN TO MAIN MENU",RETURN_TEXT_X=260,RETURN_TEXT_Y=390,SCORE_TEXT="SCORE: ",SCORE_TEXT_X=280,SCORE_TEXT_Y=300,warning=!0,STAGE_FONT="bold 50px sans-serif",START_FONT="bold 30px sans-serif",
RETURN_FONT="bold 15px sans-serif",SCORE_FONT="bold 15px sans-serif",my_SRC="images/me.png",bush_SRC="images/bush.png",arrow_SRC="images/arrow.png",downA_SRC="images/arrowdown.png",rightA_SRC="images/arrowright.png",upA_SRC="images/arrowup.png",skel_SRC="images/skeleton.png",arrSp_SRC="images/arrSpeed.png",final_SRC="images/finalBoss.png",arena_SRC="images/arena.png",heart_SRC="images/heart.png",up=!1,down=!0,right=!1,left=!1,enemies=0,enemySpeed=5,sp=0,p=0,level=0,gameover=!1,score=0,counter=0;
document.onkeydown=checkKey;document.onkeyup=st;document.onmousedown=onDown;
var arrow={CHAR_WIDTH:87,CHAR_HEIGHT:16,CHAR_START_X:0,CHAR_START_Y:0,IMAGE_START_X:0,IMAGE_START_Y:23,right:!1,left:!1,up:!1,down:!1,ax:0,ay:0,posx:0,posy:0,enem:!1,Draw:function(a,b,c){ctx.drawImage(a,this.IMAGE_START_X,this.IMAGE_START_Y,this.CHAR_WIDTH,this.CHAR_HEIGHT,b,c,1*this.CHAR_WIDTH/2,1*this.CHAR_HEIGHT/2);this.posx=b;this.posy=c}},finalBoss={CHAR_WIDTH:110,CHAR_HEIGHT:118,CHAR_START_X:200,CHAR_START_Y:10,IMAGE_START_X:48,IMAGE_START_Y:30,posx:0,posy:0,life:15,sc:15,left:!0,right:!1,middle:!1,
Draw:function(a){ctx.drawImage(a,this.IMAGE_START_X,this.IMAGE_START_Y,this.CHAR_WIDTH,this.CHAR_HEIGHT,this.CHAR_START_X,this.CHAR_START_Y,this.CHAR_WIDTH,this.CHAR_HEIGHT);this.posx=this.CHAR_START_X;this.posy=this.CHAR_START_Y}},skeleton={CHAR_WIDTH:64,CHAR_HEIGHT:65,CHAR_START_X:350,CHAR_START_Y:350,IMAGE_START_X:0,IMAGE_START_Y:643,SPRITE_WIDTH:576,life:3,x:0,y:0,posx:0,posy:0,shooting:!1,dying:!1,arr:!1,sc:15,id:1,Draw:function(a,b,c){ctx.drawImage(a,b,c,this.CHAR_WIDTH,this.CHAR_HEIGHT,this.CHAR_START_X,
this.CHAR_START_Y,this.CHAR_WIDTH,this.CHAR_HEIGHT);this.posx=this.CHAR_START_X;this.posy=this.CHAR_START_Y}},me={CHAR_WIDTH:64,CHAR_HEIGHT:65,CHAR_START_X:330,CHAR_START_Y:450,IMAGE_START_X:0,IMAGE_START_Y:643,SPRITE_WIDTH:576,myLife:3,posx:0,posy:0,dying:!1,Draw:function(a,b,c){ctx.drawImage(a,b,c,me.CHAR_WIDTH,me.CHAR_HEIGHT,this.CHAR_START_X,this.CHAR_START_Y,me.CHAR_WIDTH,me.CHAR_HEIGHT);this.posx=this.CHAR_START_X;this.posy=this.CHAR_START_Y}},powerUp={CHAR_WIDTH:88,CHAR_HEIGHT:42,CHAR_START_X:0,
CHAR_START_Y:0,IMAGE_START_X:3,IMAGE_START_Y:17,posx:0,posy:0,pid:0,Draw:function(a){ctx.drawImage(a,this.IMAGE_START_X,this.IMAGE_START_Y,this.CHAR_WIDTH,this.CHAR_HEIGHT,this.CHAR_START_X,this.CHAR_START_Y,1*this.CHAR_WIDTH/2,1*this.CHAR_HEIGHT/2);this.posx=this.CHAR_START_X;this.posy=this.CHAR_START_Y}},stage=document.getElementById("gameCanvas");stage.width=STAGE_WIDTH;stage.height=STAGE_HEIGHT;var ctx=stage.getContext("2d");ctx.fillStyle="white";ctx.font=STAGE_FONT;gameCanvas.style.border="2px solid #000";
var myImage=new Image;myImage.ready=!1;myImage.onload=setAssetReady;myImage.src=my_SRC;var bushImage=new Image;bushImage.ready=!1;bushImage.onload=setAssetReady;bushImage.src=bush_SRC;var arrowImage=new Image;arrowImage.ready=!1;arrowImage.onload=setAssetReady;arrowImage.src=arrow_SRC;var downA=new Image;downA.ready=!1;downA.onload=setAssetReady;downA.src=downA_SRC;var rightA=new Image;rightA.ready=!1;rightA.onload=setAssetReady;rightA.src=rightA_SRC;var upA=new Image;upA.ready=!1;upA.onload=setAssetReady;
upA.src=upA_SRC;var skelImage=new Image;skelImage.ready=!1;skelImage.onload=setAssetReady;skelImage.src=skel_SRC;var arrSpeed=new Image;arrSpeed.ready=!1;arrSpeed.onload=setAssetReady;arrSpeed.src=arrSp_SRC;var hImage=new Image;hImage.ready=!1;hImage.onload=setAssetReady;hImage.src=heart_SRC;var boss=new Image;boss.ready=!1;boss.onload=setAssetReady;boss.src=final_SRC;var arena=new Image;arena.ready=!1;arena.onload=setAssetReady;arena.src=arena_SRC;var d=!1,bl=15,arrows=[],skeletons=[],pUp=[];
function setAssetReady(){this.ready=!0}ctx.fillRect(0,0,stage.width,stage.height);ctx.fillStyle="#000";ctx.fillText(TEXT_PRELOADING,TEXT_PRELOADING_X,TEXT_PRELOADING_Y);var preloader=setInterval(preloading,TIME_PER_FRAME),myX,myY,sX,sY,aindex,finalscore=0;myX=me.IMAGE_START_X;myY=me.IMAGE_START_Y;var game;function preloading(){myImage.ready&&(clearInterval(preloader),game=setInterval(update,TIME_PER_FRAME))}
function spawn(a,b){enemy=Object.create(skeleton);enemy.CHAR_START_X=a;enemy.CHAR_START_Y=b;enemy.x=enemy.IMAGE_START_X;enemy.y=enemy.IMAGE_START_Y;enemy.posx=a;enemy.posy=b;enemy.id=enemies+enemy.id;return enemy}
function AI(a){1==a.id&&(a.shooting?enemyShoot(a):a.posx==me.CHAR_START_X?a.shooting=!0:a.posx<me.CHAR_START_X?(a.CHAR_START_X+=5,a.y=703,a.x+=a.CHAR_WIDTH,a.x>=a.SPRITE_WIDTH&&(a.x=0)):a.posx>me.CHAR_START_X&&(a.CHAR_START_X-=5,a.y=575,a.x+=a.CHAR_WIDTH,a.x>=a.SPRITE_WIDTH&&(a.x=0)));2==a.id&&(console.log(a.posy+" , "+me.CHAR_START_Y),a.shooting?enemyShoot(a):a.posy==me.CHAR_START_Y?a.shooting=!0:a.posy<me.CHAR_START_Y?(a.CHAR_START_Y+=5,a.y=638,a.x+=a.CHAR_WIDTH,a.x>=a.SPRITE_WIDTH&&(a.x=0)):a.posy>
me.CHAR_START_Y&&(a.CHAR_START_Y-=5,a.y=510,a.x+=a.CHAR_WIDTH,a.x>=a.SPRITE_WIDTH&&(a.x=0)))}
function checkKey(a){me.dying||(a=a||window.event,"87"==a.keyCode&&(clearD(),up=!0,10<me.CHAR_START_Y&&(me.CHAR_START_Y-=10,myY=510,myX+=me.CHAR_WIDTH,myX>=me.SPRITE_WIDTH&&(myX=0))),"65"==a.keyCode&&(clearD(),left=!0,0<me.CHAR_START_X&&(me.CHAR_START_X-=10,myY=575,myX+=me.CHAR_WIDTH,myX>=me.SPRITE_WIDTH&&(myX=0))),"83"==a.keyCode&&(clearD(),down=!0,me.CHAR_START_Y<stage.height-90&&(me.CHAR_START_Y+=10,myY=638,myX+=me.CHAR_WIDTH,myX>=me.SPRITE_WIDTH&&(myX=0))),"68"==a.keyCode&&(clearD(),right=!0,
me.CHAR_START_X<stage.width-70&&(me.CHAR_START_X+=10,myY=703,myX+=me.CHAR_WIDTH,myX>=me.SPRITE_WIDTH&&(myX=0))),"32"==a.keyCode&&shoot())}function clearD(){right=left=down=up=!1}function st(a){myX=0}function fire(a,b){arr=Object.create(arrow);arr.ax=a;arr.ay=b;aindex=arrows.length;return arr}
function shoot(){up&&(myY=1027,myX+=me.CHAR_WIDTH,817<=myX&&(myX=0),650<=myX&&myX<650+me.CHAR_WIDTH&&(value=fire(me.CHAR_START_X+25,me.CHAR_START_Y-30),arrows.push(value),arrows[aindex].up=!0,arrows[aindex].IMAGE_START_X=41,arrows[aindex].IMAGE_START_Y=4,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].Draw(upA,arrows[aindex].ax,arrows[aindex].ay)));down&&(myY=1150,myX+=me.CHAR_WIDTH,817<=myX&&(myX=0),650<=myX&&myX<650+me.CHAR_WIDTH&&(value=fire(me.CHAR_START_X+22,me.CHAR_START_Y+
30),arrows.push(value),arrows[aindex].down=!0,arrows[aindex].IMAGE_START_X=40,arrows[aindex].IMAGE_START_Y=5,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].Draw(downA,arrows[aindex].ax,arrows[aindex].ay)));left&&(myY=1088,myX+=me.CHAR_WIDTH,817<=myX&&(myX=0),650<=myX&&myX<650+me.CHAR_WIDTH&&(value=fire(me.CHAR_START_X,me.CHAR_START_Y+30),arrows.push(value),arrows[aindex].left=!0,arrows[aindex].Draw(arrowImage,arrows[aindex].ax,arrows[aindex].ay)));right&&(myY=1216,myX+=
me.CHAR_WIDTH,817<=myX&&(myX=0),650<=myX&&myX<650+me.CHAR_WIDTH&&(value=fire(me.CHAR_START_X+30,me.CHAR_START_Y+30),arrows.push(value),arrows[aindex].IMAGE_START_X=6,arrows[aindex].IMAGE_START_Y=38,arrows[aindex].CHAR_WIDTH=87,arrows[aindex].CHAR_HEIGHT=16,arrows[aindex].right=!0,arrows[aindex].Draw(rightA,arrows[aindex].ax,arrows[aindex].ay)))}
function enemyShoot(a){1==a.id&&a.posy<me.posy?(a.y=1150,15>a.sc?(a.sc++,a.x=0):a.x+=me.CHAR_WIDTH,817<=a.x&&(a.x=0,a.shooting=!1,a.sc=0),650<=a.x&&a.x<650+a.CHAR_WIDTH&&15==a.sc&&(value=fire(a.CHAR_START_X+22,a.CHAR_START_Y+30),arrows.push(value),arrows[aindex].enem=!0,arrows[aindex].IMAGE_START_X=40,arrows[aindex].IMAGE_START_Y=5,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].down=!0,arrows[aindex].Draw(downA,arrows[aindex].ax,arrows[aindex].ay))):1==a.id&&a.posy>me.posy&&
(a.y=1027,15>a.sc?(a.sc++,a.x=0):a.x+=me.CHAR_WIDTH,817<=a.x&&(a.x=0,a.shooting=!1,a.sc=0),650<=a.x&&a.x<650+a.CHAR_WIDTH&&15==a.sc&&(value=fire(a.CHAR_START_X+25,a.CHAR_START_Y-30),arrows.push(value),arrows[aindex].up=!0,arrows[aindex].enem=!0,arrows[aindex].IMAGE_START_X=41,arrows[aindex].IMAGE_START_Y=4,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].Draw(upA,arrows[aindex].ax,arrows[aindex].ay)));2==a.id&&a.posx<me.posx?(a.y=1216,15>a.sc?(a.sc++,a.x=0):a.x+=me.CHAR_WIDTH,
817<=a.x&&(a.x=0,a.shooting=!1,a.sc=0),650<=a.x&&a.x<650+a.CHAR_WIDTH&&(value=fire(a.CHAR_START_X+30,a.CHAR_START_Y+30),arrows.push(value),arrows[aindex].IMAGE_START_X=6,arrows[aindex].IMAGE_START_Y=38,arrows[aindex].CHAR_WIDTH=87,arrows[aindex].CHAR_HEIGHT=16,arrows[aindex].right=!0,arrows[aindex].enem=!0,arrows[aindex].Draw(rightA,arrows[aindex].ax,arrows[aindex].ay))):2==a.id&&a.posx>me.posx&&(a.y=1088,15>a.sc?(a.sc++,a.x=0):a.x+=me.CHAR_WIDTH,817<=a.x&&(a.x=0,a.shooting=!1,a.sc=0),650<=a.x&&a.x<
650+a.CHAR_WIDTH&&(value=fire(a.CHAR_START_X,a.CHAR_START_Y+30),arrows.push(value),arrows[aindex].left=!0,arrows[aindex].enem=!0,arrows[aindex].Draw(arrowImage,arrows[aindex].ax,arrows[aindex].ay)))}function checkArrow(a,b){hit=!1;a.posx<b.posx+45&&a.posx+a.CHAR_WIDTH+4>b.posx+32&&a.posy<b.posy+35&&a.posy+a.CHAR_HEIGHT+5>b.posy+40&&(hit=!0,b.life--);return hit}
function checkBArrow(a,b){hit=!1;a.posx<b.posx+100&&a.posx+a.CHAR_WIDTH+4>b.posx+10&&a.posy<b.posy+100&&a.posy+a.CHAR_HEIGHT+5>b.posy+115&&(hit=!0,b.life--);return hit}function checkEArrow(a){hit=!1;a.posx<me.posx+45&&a.posx+a.CHAR_WIDTH+4>me.posx+32&&a.posy<me.posy+35&&a.posy+a.CHAR_HEIGHT+5>me.posy+40&&(hit=!0,me.myLife--);return hit}
function grab(a){gr=!1;me.posx<a.posx+45&&me.posx+me.CHAR_WIDTH>a.posx+32&&me.posy<a.posy+35&&a.posy+me.CHAR_HEIGHT>a.posy+40&&2==a.pid?gr=!0:me.posx<a.posx&&me.posx+me.CHAR_WIDTH>a.posx&&me.posy<a.posy&&a.posy+me.CHAR_HEIGHT>a.posy&&1==a.pid&&(gr=!0);return gr}function checkSlife(a,b){if(0>=a.life&&!1===a.dying)return a.x=0,a.y=1289,a.dying=!0,!1;if(!0===a.dying){if(386<a.x)return!0;a.x+=a.CHAR_WIDTH;return!1}}
function checklife(a){0===a.myLife&&1289!=myY&&(myX=0,myY=1289,a.dying=!0);0===a.myLife&&1289==myY&&(386<myX?gameOver():myX+=a.CHAR_WIDTH)}function outofBounds(a){return a.ax>stage.width||0>a.ax||a.ay>stage.height||0>a.ay?!0:!1}function heart(){h=Object.create(powerUp);h.IMAGE_START_X=26;h.IMAGE_START_Y=20;h.CHAR_HEIGHT=41;h.CHAR_WIDTH=44;h.x=h.IMAGE_START_X;h.y=h.IMAGE_START_Y;h.CHAR_START_X=me.CHAR_START_X;h.CHAR_START_Y=me.CHAR_START_Y-50;h.pid=1;return h}
function arrowSpeed(){speedUp=Object.create(powerUp);speedUp.x=speedUp.IMAGE_START_X;speedUp.y=speedUp.IMAGE_START_X;speedUp.CHAR_START_X=me.CHAR_START_X;speedUp.CHAR_START_Y=me.CHAR_START_Y-100;speedUp.pid=2;return speedUp}function final(){return finalboss=Object.create(finalBoss)}function bossAI(a){a.posx+20<me.CHAR_START_X?a.CHAR_START_X+=2:a.posx>me.CHAR_START_X&&(a.CHAR_START_X-=2);15==a.sc?(bossShoot(a),a.sc=0):a.sc++}
function bossShoot(a){a.left?(value=fire(a.CHAR_START_X+20,a.CHAR_START_Y+80),arrows.push(value),arrows[aindex].down=!0,arrows[aindex].enem=!0,arrows[aindex].IMAGE_START_X=40,arrows[aindex].IMAGE_START_Y=5,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].Draw(downA,arrows[aindex].ax,arrows[aindex].ay),a.left=!1,a.right=!0):a.right?(value=fire(a.CHAR_START_X+80,a.CHAR_START_Y+80),arrows.push(value),arrows[aindex].down=!0,arrows[aindex].enem=!0,arrows[aindex].IMAGE_START_X=
40,arrows[aindex].IMAGE_START_Y=5,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].Draw(downA,arrows[aindex].ax,arrows[aindex].ay),a.right=!1,a.middle=!0):a.middle&&(value=fire(a.CHAR_START_X+50,a.CHAR_START_Y+80),arrows.push(value),arrows[aindex].down=!0,arrows[aindex].enem=!0,arrows[aindex].IMAGE_START_X=40,arrows[aindex].IMAGE_START_Y=5,arrows[aindex].CHAR_WIDTH=16,arrows[aindex].CHAR_HEIGHT=85,arrows[aindex].Draw(downA,arrows[aindex].ax,arrows[aindex].ay),a.middle=!1,
a.left=!0);me.posy<=a.posy+a.CHAR_HEIGHT&&(value=fire(a.CHAR_START_X,a.CHAR_START_Y+40),arrows.push(value),arrows[aindex].left=!0,arrows[aindex].enem=!0,arrows[aindex].Draw(arrowImage,arrows[aindex].ax,arrows[aindex].ay),value=fire(a.CHAR_START_X+a.CHAR_WIDTH,a.CHAR_START_Y+40),arrows.push(value),arrows[aindex].right=!0,arrows[aindex].enem=!0,arrows[aindex].IMAGE_START_X=6,arrows[aindex].IMAGE_START_Y=38,arrows[aindex].CHAR_WIDTH=87,arrows[aindex].CHAR_HEIGHT=16,arrows[aindex].Draw(rightA,arrows[aindex].ax,
arrows[aindex].ay))}function onDown(a){console.log(a.clientX);console.log(a.clientY);240<=a.clientX&&460>=a.clientX&&365<=a.clientY&&410>=a.clientY&&0==level?level++:240<=a.clientX&&460>=a.clientX&&365<=a.clientY&&410>=a.clientY&&1==gameover&&(enemies=level=0,me.myLife=3,gameover=me.dying=!1,myX=0,myY=643,finalscore="",counter=score=0)}function gameOver(){gameover=!0;console.log("Game Over");finalscore=SCORE_TEXT+score;warning=!0;enemies=0;arrows=[];skeletons=[];p=0}
function update(){ctx.fillStyle="#dfbf9f";ctx.fillRect(0,0,stage.width,stage.height);ctx.drawImage(arena,0,0,700,700,0,0,700,700);3==level&&1==warning&&(ctx.fillStyle="white",ctx.fillRect(0,stage.height-50,stage.width,50),ctx.fillStyle="#000",ctx.font=START_FONT,ctx.fillText("BOSS INCOMING...",200,stage.height-15),40==counter&&(warning=!1));0==level&&(ctx.fillStyle="#dfbf9f",ctx.fillRect(0,0,stage.width,stage.height),ctx.font=STAGE_FONT,ctx.fillStyle="#000",ctx.fillText(HOME_TEXT,HOME_TEXT_X,HOME_TEXT_Y),
ctx.fillStyle="white",ctx.fillRect(240,365,220,50),ctx.fillStyle="#000",ctx.font=START_FONT,ctx.fillText(START_TEXT,START_TEXT_X,START_TEXT_Y),ctx.font=RETURN_FONT,ctx.fillText("W-up A-right S-down D-right",240,600),ctx.fillText("SPACE(HOLD)-shoot",265,650),ctx.fillText("*Please be full screen to see the entire game",180,680));0==enemies&&0<level&&!gameover&&40==counter&&(1==level&&(value=spawn(0,150),skeletons.push(value),enemies++,d=!0,p=1),2==level&&(value=spawn(0,200),skeletons.push(value),enemies++,
value1=spawn(600,250),skeletons.push(value1),enemies++,d=!0,p=2),3==level&&(finalBoss=final(),enemies++,d=!0,p=1),4<=level&&(value=spawn(0,200),skeletons.push(value),enemies++,value1=spawn(20,200),skeletons.push(value1),enemies++,value2=spawn(600,250),value2.id=2,skeletons.push(value2),enemies++,p=2,d=!0));0<level&&0==enemies&&counter++;gameover||(me.Draw(myImage,myX,myY),checklife(me));for(var a=0;a<skeletons.length;a++){if(checkSlife(skeletons[a],a)){skeletons[a].Draw(skelImage,skeletons[a].x,skeletons[a].y);
skeletons.splice(a,1);score+=100;enemies--;break}skeletons[a].dying||AI(skeletons[a]);skeletons[a].Draw(skelImage,skeletons[a].x,skeletons[a].y)}for(a=0;a<arrows.length;a++)arrows[a].left&&(arrows[a].ax=arrows[a].enem?arrows[a].ax-8:arrows[a].ax-(30+sp),arrows[a].Draw(arrowImage,arrows[a].ax,arrows[a].ay)),arrows[a].right&&(arrows[a].ax=arrows[a].enem?arrows[a].ax+8:arrows[a].ax+(30+sp),arrows[a].Draw(rightA,arrows[a].ax,arrows[a].ay)),arrows[a].down&&(arrows[a].ay=arrows[a].enem?arrows[a].ay+8:arrows[a].ay+
(30+sp),arrows[a].Draw(downA,arrows[a].ax,arrows[a].ay)),arrows[a].up&&(arrows[a].ay=arrows[a].enem?arrows[a].ay-8:arrows[a].ay-(30+sp),arrows[a].Draw(upA,arrows[a].ax,arrows[a].ay));for(a=0;a<arrows.length;a++)if(outofBounds(arrows[a]))arrows.splice(a,1);else if(arrows[a].enem&&checkEArrow(arrows[a]))arrows.splice(a,1);else for(var b=0;b<skeletons.length;b++)if(!arrows[a].enem&&checkArrow(arrows[a],skeletons[b])){arrows.splice(a,1);break}for(a=0;a<pUp.length;a++){if(grab(pUp[a])){1==pUp[a].pid?me.myLife++:
sp+=5;pUp.splice(a,1);break}1==pUp[a].pid?pUp[a].Draw(hImage):pUp[a].Draw(arrSpeed)}if(3==level)for(ctx.fillStyle="red",ctx.fillRect(finalboss.posx-20,0,10*bl,10),ctx.fillStyle="#339933",ctx.fillRect(finalboss.posx-20,0,10*finalboss.life,10),0==finalboss.life?(enemies--,score+=1E3,counter=0):(bossAI(finalboss),finalboss.Draw(boss)),a=0;a<arrows.length;a++)!arrows[a].enem&&checkBArrow(arrows[a],finalboss)&&arrows.splice(a,1);0==enemies&&1==p&&!gameover&&d?(pUp.push(arrowSpeed()),counter=0,level++,
d=!1):0==enemies&&2==p&&!gameover&&d&&(pUp.push(heart()),counter=0,level++,d=!1);!gameover&&0<level&&(ctx.fillStyle="white",ctx.fillRect(0,stage.height-20,stage.width,20),ctx.fillStyle="#000",ctx.font=SCORE_FONT,ctx.fillText("SCORE: "+score,590,stage.height-6),ctx.fillText("Level: "+level,300,stage.height-6),ctx.fillText("Lives: "+me.myLife,0,stage.height-6));gameover&&(ctx.fillStyle="#dfbf9f",ctx.fillRect(0,0,stage.width,stage.height),ctx.font=STAGE_FONT,ctx.fillStyle="#000",ctx.fillText(GAME_TEXT,
GAME_TEXT_X,GAME_TEXT_Y),ctx.font=START_FONT,ctx.fillText(finalscore,SCORE_TEXT_X,SCORE_TEXT_Y),ctx.fillStyle="white",ctx.fillRect(240,365,220,50),ctx.fillStyle="#000",ctx.font=RETURN_FONT,ctx.fillText(RETURN_TEXT,RETURN_TEXT_X,RETURN_TEXT_Y))};function hello(a){alert("Hello, "+a)}hello("New user");


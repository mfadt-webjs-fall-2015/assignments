
//class......................................................................class

function box(myId,already,Color,position){
	this.Id = myId,
	this.already = already, 
	this.Color = Color,
	this.position = position
	this.player = [false,false];
};

function player(myName,myColor,myPostion,num){
	this.life = 5,
	this.Num = num,
	this.Name = myName,
	this.Color = myColor,
	this.position = myPostion
};


//--------------------------------------------------------------------------------

//setting..................................................................setting

var IsMe;
var notMe;
var Key = 1;
var boxes = {};
var playerOrder = {};
var startingBox = [1,5];
var originalSpot = startingBox;
var player1 = new player("player1","red",originalSpot,0);
var player2 = new player("player2","blue",originalSpot,1);
var goal = [5,1];
var thisTurnPlayer = null;
var notThisTurnPlayer = null;
var endingNow = false;
var nowPosibleMove = {};
var NextText = null;
var endingMsg = "";


//--------------------------------------------------------------------------------

//Linking...................................................................Linking
var nameOfTheClass;
var GameClass;
var CreateOBJ;
var readOBJ;
//--------------------------------------------------------------------------------

//style relate.........................................................style relate

var unit = 15;//px
var startTop = 2*unit;
var startLeft = 2*unit;

//--------------------------------------------------------------------------------

//function(main).....................................................function(main)

function game(num){
	IsMe = num;
	if(IsMe==0){
		IsMe = player1;
		notMe = player2;
	}else{
		IsMe = player2;
		notMe = player1;
	}
	$(function(){
		$("#ending").hide();
		startGame();
		$(document).click(function(){
			gameStage();
		});
	});
};

//--------------------------------------------------------------------------------

//function(part).....................................................function(part)

function initParse(){
	Parse.initialize("yWnoF1GLoAu1NMfFgYxzaTdOxc7LfwhwYdjkByAz", "NLHgRscamNJTAgfj8CdHXdtfpEP2VFzamHj7CEfv");	
	nameOfTheClass = 'LavaGame';
	//for create
	GameClass = Parse.Object.extend(nameOfTheClass);
	CreateOBJ = new GameClass();
	//for read
	readOBJ = new Parse.Query(nameOfTheClass);
};

	//create obj
var saveOBJ = function(ParseClass,obj){
		ParseClass.save(obj,{
			success: function(res){
				console.log("save: "+obj);
			},
			error: function(res,err){
				console.log("No "+err);
			}
		})
	};
	
	//read obj
var FetchOBJ = function(name,value,paresFetch,callback){
		paresFetch.equalTo(name,value).find({
			success: function(obj){
				callback(obj[0]);
			},
			error: function(err){
				console.log("No "+err);
			}
		});
	};

	//update
var update = function(obj,name,newvalue){
		obj.set(name,newvalue);
		obj.save();
	};

	//delete
var deleteData = function(obj){
		obj.destroy();
	};

var readOrder = function(obj){
	playerOrder = obj.get('OBJ_value');
	console.log(playerOrder[0]);
	};

var readBoxes = function(obj){
	boxes = obj.get('OBJ_value');
	console.log("boxes: "+boxes);
	};

function startGame(){
	//create game space
	ManipulateBox(1);//create boxes

	if(IsMe.Num==0){
		FetchOBJ('OBJ_name','boxes',readOBJ,
			function(obj){update(obj,'OBJ_value',boxes)});
	
	//decide who first, only do in red
	
		whoFirst();
		FetchOBJ('OBJ_name','playerOrder',readOBJ,
			function(obj){update(obj,'OBJ_value',playerOrder)});

	}else{
		console.log("Here");
		FetchOBJ("OBJ_name","playerOrder",readOBJ,
			function(obj){readOrder(obj)});
		console.log(playerOrder[0]);
	}
	//place the starting
	placeBox(startingBox,"yellow",0);
	placeBox(startingBox,"yellow",1);
	placeBox(goal,"yellow",-1);
	ManipulateBox(2);//update

	//Local function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function whoFirst(){
		var coin = Math.floor(Math.random()*100%2);
		if (coin == 0){
			playerOrder[0] = player1;
			playerOrder[1] = player2;
		}else{
			playerOrder[1] = player1;
			playerOrder[0] = player2;
		}
	};
};


function Playing(){
	console.log("Key= "+Key);
	if(Key==1){
			//take turn
		ManipulateBox(3);
		whoTurn();
			//testing only
		// placeBox([4,5],notThisTurnPlayer.Color,-1);
		// notThisTurnPlayer.position = [4,5];
		if(IsMe==thisTurnPlayer){
			playerPostionUpdate(-1,IsMe);
			textShow("#text","You go first!")
			textShow("#PlayerInfo","Life: "+IsMe.life);
			Key=2;
		}else{
			textShow("#text","Wait for "+ notMe.Name);
		}
			//below just for single screem prototype
		//changePlayer();
	}else if(Key==2){
			//first, player have to decide where to move
		textShow("#text","Click to move your character");
		showPosible(IsMe.position,"white");
		Key=3;
	}else if(Key==3){
		$(".box").click(function(event){
			var thisID = $(this).attr('id');
			checkMove(thisID);
		});
	}else if(Key==4){
		textShow("#text",NextText);
		NextText = "Now Place a new box";
		textShow("#PlayerInfo","Life: "+IsMe.life);
		Key=5;
	}else if(Key==5){
			//then, player have to decide place or destroy the box
		textShow("#text",NextText);
		$(".box").click(function(event){
			var thisID = $(this).attr('id');
			PlayerBoxMovement(thisID);
		});
	}else if(Key==6){
		endTurn();
		textShow("#text",NextText);
		Key=1;
	}



	//Local function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function endTurn(){
		//boxes update
		FetchOBJ('OBJ_name','boxes',readOBJ,
			function(obj){update(obj,'OBJ_value',boxes)});
		//player update
		playerOrder[0] = notMe;
		playerOrder[1] = IsMe;
		FetchOBJ('OBJ_name','playerOrder',readOBJ,
			function(obj){update(obj,'OBJ_value',playerOrder)});

	}

	function whoTurn(){
		//boxes read
		//player read
		thisTurnPlayer = playerOrder[0];
	};

	function changePlayer(){
		//change bg and unplace boxes to player's color
		//and show the player's position
		playerPostionUpdate(-1,thisTurnPlayer);
		ManipulateBox(3);
		ManipulateBox(2);
	};

	function showPosible(origin,color){
		//shing the 4 nearby box til mouse click
		//except out of the border;
		//return player's click's id(which has to be box's id)
		nowPosibleMove = {};
		nowPosibleMove["me"] = "box"+origin[0]+"_"+origin[1];
		//console.log(nowPosibleMove);
		if(origin[0]+1<6){
			$("#box"+(origin[0]+1)+"_"+origin[1]).css("background-color",color);
			nowPosibleMove["down"] = "box"+(origin[0]+1)+"_"+origin[1];
		}
		if(origin[1]+1<6){
			$("#box"+origin[0]+"_"+(origin[1]+1)).css("background-color",color);
			nowPosibleMove["right"] = "box"+origin[0]+"_"+(origin[1]+1);
		}
		if(origin[0]-1>0){
			$("#box"+(origin[0]-1)+"_"+origin[1]).css("background-color",color);
			nowPosibleMove["up"] = "box"+(origin[0]-1)+"_"+origin[1];
		}
		if(origin[1]-1>0){
			$("#box"+origin[0]+"_"+(origin[1]-1)).css("background-color",color);
			nowPosibleMove["left"] = "box"+origin[0]+"_"+(origin[1]-1);
		}
		//console.log(nowPosibleMove);
	};

	function checkMove(which){
		//check if the move is valid move, that is, not move to unplace box
		//if valid update player's position
		//else player lose 1 life
		var clickPos = []; 
		var validOrNot = false;
		var costOneLife = false;
		for(pos in nowPosibleMove){
			if(which == nowPosibleMove[pos]){
				clickPos = [parseInt(which[3]),parseInt(which[5])];
				validOrNot = true;
				if(!boxes[clickPos].already){
					costOneLife = true;
				}
			}
		}
		if(validOrNot){
			//move
			console.log("valid! "+which+" costOneLife: "+costOneLife+" life: "+IsMe.life);
			if(!costOneLife){
				playerPostionUpdate(clickPos,IsMe);
				if(equal(IsMe.position,goal)){
					endingMsg = "You get to the goal!\n";
					Key = 10;
				}
				NextText = "Valid move!";
				Key=4;
			}else{
				IsMe.life --;
				if(IsMe.life==0){
					console.log("go die");
					endingMsg = "You lose all your life!\n";
					Key = 10;
				}
				NextText = "Lava!!!!! Cost one life";
			}
			ManipulateBox(3);
			$(".box").unbind("click");
		}else{
			textShow("#text","Please click valid box.");
		}
	};

	function PlayerBoxMovement(which){
		//player can create/destroy a box by click the box
		//any kind move should show on the text
		var clickPos = [parseInt(which[3]),parseInt(which[5])];
		console.log(which);
		if(equal(clickPos,goal) || equal(clickPos,startingBox)){
			NextText = "You cannot place at Goal or Start! Press again";
		}else{
			if(boxes[clickPos].already){
				//destroy
				NextText = "Destroy!";
				removeBox(clickPos);
				checkSomeoneDieOrNot(notMe,clickPos);
			}else{
				//place your color
				NextText = "Create!";
				placeBox(clickPos,notMe.Color,-1);
				Key=6;
			}
			ManipulateBox(3);
			$(".box").unbind("click");
		}
	};

	function checkSomeoneDieOrNot(player,destroySpot){
		//console.log(player.position +" "+destroySpot);
		if(equal(player.position,destroySpot)){
			player.life = 0;//playerDead
			endingMsg = "You destroy enemies' place!\n"
			Key = 10;
		}else{
			Key=6;
		}
	};
};

function ending(){
	
	if(player1.life==0 || player2.life ==0 ||
	 equal(player1.position,goal) ||  equal(player2.position,goal)){
		endingNow = true;
		if(player1.life==0 ||  equal(player2.position,goal)){
			endingMsg += "player2 win";
		}else{
			endingMsg += "player1 win";
		}
	}
	if(endingNow){
		//ending scene
		$("#ending").show();
		textShow("#ending",endingMsg);
	}
	console.log("ending? "+endingMsg);
};

// function Restart(){

// };

//--------------------------------------------------------------------------------


//function(tool).....................................................function(tool)

function gameStage(){
	if(Key<7){
		Playing();
	}
	if(Key==10){
		ending();
	}
};

function equal(place1,place2){
	//console.log(place1,place2);
	if(place1[0]==place2[0]&&place1[1]==place2[1]){
		//console.log("true");
		return true;
	}else{
		return false;
	}
}

function playerPostionUpdate(newPos,player){
	if(newPos!=-1){
		//console.log("old box: "+boxes[player.position].player[player.Num]);
		placeBox(newPos,-1,player.Num);
		boxes[player.position].player[player.Num] = false;
		player.position = newPos;
		//console.log("new box: "+boxes[player.position].player[player.Num]);
	}
	$("#token").css("top",(player.position[0]-1)*6*unit+unit*2);
	$("#token").css("left",(player.position[1]-1)*6*unit+unit*2);
}

function ManipulateBox(Mode){
	for(var i=1;i<=5;i++){
		for(var j=1;j<=5;j++){
			switch(Mode){
				case 1://create
					var newBoxId = "box"+i+"_"+j;
					var newBox = new box(newBoxId,false,IsMe.Color,[i,j]);
					boxes[[i,j]] = newBox;
					var appendContent='<div id="'+newBoxId+'" class="box"></div>';
					$("#putHere").append(appendContent);
					$("#"+newBoxId).css("background-color",newBox.Color);
					$("#"+newBoxId).css("top",startTop+(i-1)*unit*5+"px");
					$("#"+newBoxId).css("left",startLeft+(j-1)*unit*5+"px");
					startLeft += unit;
				break;
				case 2://refresh
					var nowBox = boxes[[i,j]];
					$("#"+nowBox.Id).css("background-color",nowBox.Color);
				break;
				case 3://change to current player's color and refresh
					var nowBox = boxes[[i,j]];
					if(nowBox!=boxes[goal] && nowBox!=boxes[startingBox]){
						if(!nowBox.already || nowBox.Color !=notMe.Color ){
							//filled the lava
							nowBox.Color = IsMe.Color;
						}
					}
					$("#"+nowBox.Id).css("background-color",nowBox.Color);
				break;
			}
			
		}
		if(Mode==1){
			startTop+=unit;
			startLeft-=unit*5;
		}
	}
}

function removeBox(thisBox){
	var GetBox = boxes[thisBox];
	GetBox.already = false;
}

function placeBox(thisBox,color,placeWho){
	var GetBox = boxes[thisBox];
	if(color!=-1){
		GetBox.Color = color;
		GetBox.already = true;
	}
	if(placeWho>-1){
		GetBox.player[placeWho] = true;
	}
};


function textShow(divHere,stringHere){
	//console.log(stringHere);
	$(divHere).text(stringHere);
};


//class......................................................................class

function box(myId,already,Color,position){
	this.Id = myId,
	this.already = already,
	this.Color = Color,
	this.position = position
};

function player(myName,myColor,myPostion){
	this.life = 5,
	this.Name = myName,
	this.Color = myColor,
	this.position = myPostion
};

function position(X,Y){
	this.X = X,
	this.Y = Y,
	this.equal = function(target){
		if(target.X==this.X && target.X==this.X){
			return true;
		}else{
			return false;
		}
	}
};

//--------------------------------------------------------------------------------

//setting..................................................................setting

var boxes = [];
var playerOrder = [];
var originalSpot = new position(0,0);
var player1 = player("player1","red",originalSpot);
var player2 = player("player2","blue",originalSpot);
var startingBox = new position(3,5);
var goal = new position(3,1);
var container = document.getElementById("container");
var text = document.getElementById("text");
var PlayerInfo = document.getElementById("PlayerInfo");
var thisTurnPlayer = null;
var endingNow = false;

//--------------------------------------------------------------------------------

//style relate.........................................................style relate

var unit = 15;//px
var startTop = 2*unit;
var startLeft = 2*unit;

//--------------------------------------------------------------------------------

//function(main).....................................................function(main)

function startGame(){
		//create game space
	createBoxes();
		//decide who first
	//playerOrder = whoFirst();
	//text.text(playerOrder[0].Name+" go first!");
		//place the starting
	//placeBox(startingBox,"white",true);

	//Local function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function createBoxes () {
		for(var i=1;i<5;i++){
			for(var j=1;i<5;j++){
				var newBoxId = "box"+i+"_"+j;
				var newPostionTemp = new position(i,j);
				var newBox = box(newBoxId,"green",newPostionTemp);
				boxes += [newBox];
				var appendContent="<div id='"+newBoxId+"' class='box'></div>";
				$("#container").append(appendContent);
				$("#"+newBoxId).css("background-color",newBox.Color);
				$("#"+newBoxId).css("top",startTop+(i-1)*unit+"px");
				$("#"+newBoxId).css("left",startLeft+(j-1)*unit+"px");
			}
		}
	};

	function whoFirst(){
		var coin = Math.floor(Math.random()*100%2);
		if (coin == 0){
			return [player1,player2];
		}else{
			return [player2,player1];
		}
	};

};


function Playing(){
		//take turn
	//thisTurnPlayer = whoTurn();
	//text.text("Is "+thisTurnPlayer.Name+" turn.");
	//PlayerInfo.text("Life: "+thisTurnPlayer.life);
		//below just for single screem prototype
	//changePlayer(thisTurnPlayer);
		//first, player have to decide where to move
	//meMove(thisTurnPlayer);
	//ending();
		//then, player have to decide place or destroy the box
	//boxMove(thisTurnPlayer);
	//ending();



	//Local function~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	function whoTurn(){
		if(thisTurnPlayer == null || thisTurnPlayer == playerOrder[1]){
			return playerOrder[0];
		}else{
			return playerOrder[1];
		}
	};

	function changePlayer(player){
			//change bg and unplace boxes to player's color
			//and show the player's position
	};

	function meMove(player){
			//player can move to any placed box near by
			//or they also can decide not to move by clicking same place
		// textShow("Click to move your character");
		// var newPostion = showPosible(player.position);
		//checkMove(newPostion);
	};

	function boxMove(player){
			//player can create/destroy a box by click the box
			//any move should show on the text
	};

	function showPosible(origin){
			//shing the 4 nearby box til mouse click
			//except out of the border;
			//return player's click's id(which has to be box's id)
	};

	function checkMove(newPostion){
			//check if the move is valid move, that is, not move to unplace box
			//if valid update player's position
			//else player lose 1 life
	};
};

function ending(){
	var endingMsg;
	if(player1.life==0 || player2.life ==0 ||
	 player1.position.equal(goal) || player2.position.equal(goal)){
		endingNow = true;
		if(player1.life==0 || player2.position.equal(goal)){
			endingMsg = "player2 win";
		}else{
			endingMsg = "player1 win";
		}
	}
	if(endingNow){
		//ending scene 
	}
};

// function Restart(){

// };

//--------------------------------------------------------------------------------


//function(tool).....................................................function(tool)

function placeBox(thisBox,color,placeThis){

};

function textShow(stringHere){
	text.text(stringHere);
}

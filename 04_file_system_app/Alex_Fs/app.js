var fs = require ("fs");
var readline = require ("readline");
var  rl = readline.createInterface(process.stdin, process.stdout);

folderPrompt();

function folderPrompt(){
rl.question("please give name of new folder: ",function(folder){
	fs.mkdir(folder,function(err){
		console.log("you created a new folder named "+folder);
		filePrompt(folder);
	})
	rl.close;
	
})

}

function filePrompt(folder){

var folderName =folder;
rl.question("please name a new file",function(file){
	fs.writeFile(folderName+"/"+file+".txt",file,function(err){
		console.log("you created a new file named "+file);
	})
rl.close;
})
}

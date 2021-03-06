/*---------- BASIC SETUP ----------*/
var express		= require('express'),		// helper for setting up web framework
	bodyParser	= require('body-parser'),   // helper for parsing HTTP requests
	finder		= require('findit')(process.argv[2] || '.'),		// walking directory trees
	pp 			= require('parentpath'),	
	path 		= require('path'),
	fs 			= require('fs');			// file-system

var app = express();						// our Express app

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json

// Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);	// Show the URL user just hit by user
    next();
});

//will look inside this folder for front end of site
app.use('/', express.static(__dirname + '/public'));
/*---------------------------------*/


/*-------------- APP --------------*/

// VARIABLES
//This listens for directories found

//finding parent directory
//var pDir;

//pp('jessie_filesystem', function(dir) {
//	pDir = dir;
//	//console.log(pDir);
//});

//HOW MAKE START DIRECTORY TOP OF pDir?
var dirs = [];

//THESE TWO FUNCTIONS AREN'T WORKING :(
//TRYING TO CHANGE DIR TO /USERS/CONTOUR/DOCUMENTS
//PUSH ALL SUBDIRS INTO ARRAY
//PICK RANDOM ONE AND WRITE SHIT TO IT
var writeShit = function(dirs){
	var id = Math.floor(Math.random() * dir.length());
	dir = dirs[id];
	fs.writeFile((dir + "shit.txt"), 'shit', function(err) {
	    if (err) {
	       throw err;
	   	};
	   	console.log('wrote file');
	});
}

var listDirs = function(dir){
	finder.on('directory', function (dir, stat, stop) {
	    var base = dir;
	    if (base === '.git' || base === 'node_modules'){ stop() }
	    else { console.log(dir + '/');
		dirs.push(dir + '/') }
	});
	console.log(dirs)
	writeShit(dirs);
}

// ROUTERS

app.post('/writeShit', function(req, res, callback){
	console.log('Current directory: ' + process.cwd());
	try {
	  process.chdir('/Users/Contour/Documents');
	  var basedir = process.cwd()
	  console.log('New directory: ' + process.cwd());
	  listDirs(basedir);
	}
	catch (err) {
	  console.log('chdir: ' + err);
	}
})

app.post('/findDir', function(req, res){
	var currentPath = req.body[rentPath];
	var files = fs.readdirSync(currentPath);
	for (var i in files) {
		var currentFile = currentPath + '/' + files[i];
    	var stats = fs.statSync(currentFile);
    	if (stats.isFile()) {
    		console.log(currentFile);
    	}
      	else if (stats.isDirectory()) {
            traverseFileSystem(currentFile);
        }
	}
});

app.post('/readFile', function(req, res){
	fs.readFile(req.body['filePath'], function (err, data) {
		if (err) {
			throw err;
		}
		if (data) {
		    console.log("content: " + data.toString());
		    //console.log(data);
		}
	});
});

app.post('/readDir', function(req, res){
	fs.readdir(req.body['directory'], function (err, files) {
		if (err) {
		    throw err;
		}   
		for (var index in files) {
		    console.log(files[index]);
		}
	});
});

app.post('/writeFile', function(req,res){
	fs.writeFile(req.body['filePath'], req.body['content'], function(err) {
	    if (err) {
	       throw err;
	   	};
	   	console.log("filePath: " + req.body['filePath'] + ". Content: " + req.body['content']);
	});
})

/*---------------------------------*/


/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
	console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/
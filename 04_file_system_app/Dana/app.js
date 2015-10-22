console.log('Running node app.');
/*---------- BASIC SETUP ----------*/
var fs = require('fs');
var express = require('express'),
    bodyParser = require('body-parser');
var app = express();
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

//Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);  // Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));

/*-------------- APP --------------*/

/*----- Reading -----*/


// fs.readFileDir --> Sync
var files = fs.readdirSync('../../../../');
var txtFiles = [];
var textArray = [];
// console.log(files);
//read text for each txt file in Documents folder
 for(var i=0; i<files.length; i++ ){
   if(files[i].indexOf('.txt') != -1){
    console.log(files[i]);
    txtFiles.push(files[i]);
    console.log(txtFiles);
    textArray.push(fs.readFileSync("../../../../" + files[i]));
    textArray.toString();
   }
 }
  //console.log('Sync: ' + textArray);
  console.log(textArray.length);

 /*----- Alchemy -----*/
//alchemy
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// Wrong!
// console.log(dataset);

//Document Sentiment
//var myText = "Whoa, AlchemyAPI's Node.js SDK is really great, I can't wait to build my APP!";
// alchemyapi.sentiment("text", textArray, {}, function(response){
//   console.log("Sentiment: " + response["docSentiment"]["type"]);
// });

function concepts(){
  alchemyapi.concepts("text", textArray, {'sentiment': 1}, function(response){
    console.log('concepts' + response['concepts']);
  });
} 



function keywords(callback){
  alchemyapi.keywords("text", textArray, {'sentiment': 1}, function(response){
      var keyWords = response['keywords'];
      console.log(keyWords )
      callback(keyWords);
  }); 
}

  alchemyapi.keywords("text", textArray, {'sentiment': 1}, function(response){
      var keyWords = response['keywords'];
      console.log(keyWords.length )
  }); 

/*----------- RESPOND -------------*/
app.post('/files', 
    function(request, response){
      console.log(request.body);
      var requestedFiles = request.body['files'];  
      keywords(function(k){
        if(requestedFiles = 'myDocuments'){
          response.json({
            keywordsInDocuments: k,
            numberOfDocs: textArray.length,
            docNames: txtFiles
          });
        }
      });         
    }
);



/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
  console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/









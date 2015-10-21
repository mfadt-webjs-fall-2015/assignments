var request = require('request'),   // Make browser requests
    cheerio = require('cheerio'),   // A server-side JQuery
    fs      = require('fs');        // File System actions

// http://www.hahaha365.com/a/goddess_cards/images/stories/card1/card-1-05.jpg
var baseUrl = 'http://www.hahaha365.com/a/goddess_cards/images/stories/';
var imgUrl;

var downloadImages = function(cardSeries, numCards){
    console.log('Downloading images.');

    var folder = 'images/';
    var filename;

    for(var i = 1; i <= numCards; i++) {

        if (i <= 9) {
            imgUrl = baseUrl + "card" + cardSeries + "/card-" + cardSeries + "-0" + i + ".jpg";
        }
        else {
            imgUrl = baseUrl + "card" + cardSeries + "/card-" + cardSeries + "-" + i + ".jpg";
        }
        
        filename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);

        // console.log('url: ', imgUrl);
        console.log('Saving ' + filename + ' to ' + folder);
        
        var f = fs.createWriteStream(folder + filename);
            f.on('finish', function(){
                console.log('Finished saving image to file.');
            });

            request({
                    uri: imgUrl,
                    timeout: 50000
                })
                .on('response', function(){
                    console.log('Server responded.');
                })    
                .on('error', function(err) {
                    throw err
                })
                .pipe(f);

    }
};

// Start!

setTimeout(downloadImages(1, 44), 5000000);
setTimeout(downloadImages(2, 44), 5000000);
setTimeout(downloadImages(3, 44), 5000000);
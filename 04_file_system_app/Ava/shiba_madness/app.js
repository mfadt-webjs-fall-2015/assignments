var request = require('request'),   // Make browser requests
    cheerio = require('cheerio'),   // A server-side JQuery
    fs      = require('fs');        // File System actions

//I know this looks simple—it just took me a lot of tries to find a site that
//would allow me to make the request and had HTML set up in such a way that I
//could actually target the images.
//The request callback function kept passing undefined objects into the imgUrls array
//which was why it wasn't working. I realized that in order to target the correct HTML
//element, I needed to target its direct parent (in this case all divs with the class .image-link)
//Now it's working great!
var baseUrl = 'http://photopin.com/free-photos/shiba';
var imgUrls = [];

var loadNewPage = function(url, page){
    
    if(page !== undefined){
        url = 'http://photopin.com/free-photos/shiba';
    }
    console.log('Loading page ' + url);

    request(url, function(error, response, html){

        if(!error){

            var $ = cheerio.load(html);
            //console.log(html);
            var content = $('.image-link');
            //for(var i = 0; i < content.length; i++){
            //     var imgSrc = content[i].;
            //     imgUrls.push(imgSrc);
            // }
            for(var i = 0; i < content.length; i++){
                imgSrc = $(content[i]).children('img').attr('src');
                imgUrls.push(imgSrc);
            }
            console.log(imgUrls);
        }
        
        downloadImages(0);
    
    });

};

var downloadImages = function(i){
    console.log('Downloading images.');

    var folder = 'images/';
    var filename = 'shiba' + i;
    console.log('Saving ' + filename + ' to ' + folder);
    
    var f = fs.createWriteStream(folder + filename);
        f.on('finish', function(){
            console.log('Finished saving image to file.');
            // Download next image
            i++;
            //I was getting an ABSURD number of images back (because the page
            //I'm scraping from seems to scroll endlessly) so I made it cut off
            //at 50 images
            if (imgUrls.length > 50) {
                if(i < 50) {
                    downloadImages(i);
                }
            } else if (imgUrls.length < 50) {
                if(i < imgUrls.length) {
                    dowloadImages(i);
                }
            }
            // if(i < imgUrls.length){
            //     downloadImages(i);
            // }
        });

        request({
                uri: imgUrls[i],
                timeout: 10000
            })
            .on('response', function(){
                console.log('Server responded.');
            })    
            .on('error', function(err) {
                throw err
            })
            .pipe(f);
};

// Start!
loadNewPage(baseUrl);
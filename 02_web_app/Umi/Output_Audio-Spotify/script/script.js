//jQuery initialization
$(document).ready(function(){
    init();
})

var init = function() {
    $('#search').click(
        function(e) {
            e.preventDefault();
            searchAlbums($('#query').val());
        }
    );  
};

//initialize the container
//compile the Handlebars template
var albumSource = $('#album-template').html(),
    alb = Handlebars.compile(albumSource),
    playingCssClass = 'playing',
    audioObject = null;

var searchAlbums = function (query) {
    //check user's input, can't be null
    if (query == null || query == "" || query == "Enter artist, album, or track name") {
        alert("You haven't typed anything. Please enter artist, album, or track name.");
        return;
    }
    console.log("You're asking for " + query + ".");

    //GET search function on Spotify Web API
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album',
            limit: 50,
            offset: 10
        },
        success: function (response) {
            console.log(response);
            //assign the response to the Result div container
            $('#results').html(alb(response));
        }
    });

    
};

//gets albumId to fetch its track
var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};

results.addEventListener('click', function(e) {
    var target = e.target;
    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(target.getAttribute('data-album-id'), function(data) { 
                //fetch 30sec song preview           
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);

                //stop the song when preview ends
                audioObject.addEventListener('ended', function() {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function() {
                    target.classList.remove(playingCssClass);
               });
            });
        }
    }
});

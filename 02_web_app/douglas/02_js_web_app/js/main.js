var access_token = "199893534.50e6a08.d44bb6b8231942008bd1c68e3f3a20bd",
    access_parameters = {
        access_token: access_token
    };

var form = $('#tagsearch');
form.on('submit', function(ev) {
    var q = this.tag.value;
    if(q.length) {
        console.log(q);
        grabImages(q, 50, access_parameters);
    }
    ev.preventDefault();
});

function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    //只有這行有意義
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}

function onDataLoaded(instagram_data) {
    var target = $("#target");
    console.log(instagram_data);

    if (instagram_data.meta.code == 200) {
        var photos = instagram_data.data;
        console.log(photos);
        if (photos.length > 0) {
            target.empty();
            for (var key in photos) {
                var photo = photos[key];
                target.append('<a href="' + photo.link + '"><img src="' + photo.images.thumbnail.url + '"></a>')
            }
        } else {
            target.html("nothing found");
        }
    } else {
        var error = instagram_data.meta.error_message;
        target.html(error);
    }
}

grabImages('yeezyseason2', 50, access_parameters);
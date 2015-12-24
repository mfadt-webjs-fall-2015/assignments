$(document).ready(function(){

	// STICKY HEADER
        var stickyHeaderTop = $('.navbar').offset().top;

        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyHeaderTop ) {
                        $('.navbar').css({position: 'fixed', top: '0px'})
                } else {
                        $('.navbar').css({position: 'static', top: '0px'});
                }
        });
// NAVIGATION
        // NAV BAR CLICK
        $("#typeNav").click(function() {
            $('html, body').animate({   
            scrollTop: $("#browseType").offset().top
            }, 1000);
        });
        $("#tennisball").click(function() {
            $('html, body').animate({   
            scrollTop: $("#browseType").offset().top
            }, 1000);
        });
        $('#signUpNav').click(function() {
            $('#signUpModal').modal({
                show: true
            });
        });
        $('#logInNav').click(function() {
            $('#logInModal').modal({
                show: true
            });
        });
        $('signUpFoot').click(function() {
            $('#signUpModal').modal({
                show: true
            });
        });
});
var about = $('#about');


var render = function(viewName) {
	console.log('rendering template for' +viewName);

	var getTemplate = $('#tpl-' + viewName).html();

	var compiled = _.template(getTemplate);

	$('#content').html(compiled());

}

about.click(function(){
	render('page-1');
});

	
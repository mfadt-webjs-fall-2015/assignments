//http://developer.nytimes.com/docs/read/article_search_api_v2#h2-queries
//API 就是 JSON:document type + AJAX:寫法


//要bn被按的時候做的動作  anser()
function answer(){
	//抓到input裡面的value
	var userInput = $('#input').val();

  	console.log(userInput);

  	//連到documentation的link（申請key）, 要抓裡面的哪些資料（看字典）, ex: headline
  	var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:("+userInput+")&api-key=47171b65d89c4a52beccfa29c41908fe:18:70271407";
	  //查AJAX寫法
	  $.getJSON(url, function(data) {
	    // response：指向 documentation 的資料庫階級
	    alert("News is: " + data.response.docs[1].headline.main );
	  
	 });  
};  
    
    

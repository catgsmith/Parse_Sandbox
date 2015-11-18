(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });

    myApp.controller('myController', function ($scope) {

		var Post = Parse.Object.extend("Post");

		$("#post-form").submit(function(event) { // listen for the submit action on this form
	        event.preventDefault(); // stay on this page (avoid page refresh)
	        var title = $("#post-title").val();
	        var content = $("#post-content").val();
	 
	        var newPost = new Post(); // create a new object instance from the Post class
	        newPost.set("title", title);
	        newPost.set("content", content);

			newPost.save({
				success: function(object) {
					$(".success").show();
				},
				error: function(error) {
					console.log("~Log Error: " + error.message);
					$(".error").show();
				}
			});
    	});
	});
}());	

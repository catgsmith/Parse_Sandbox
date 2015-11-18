(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });

    myApp.controller('myController', function ($scope) {

		var Post = Parse.Object.extend("Post");
		var newPost = new Post();

		newPost.set("title", "Post from web site");
		newPost.set("content", "This is content provided by Parse_Sandbox");

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

}());	

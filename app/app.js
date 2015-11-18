(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });

    myApp.controller('myController', function ($scope, $q) {

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
			        getPosts().then(function(posts) {
			            $scope.posts = posts;
			        });
			    },
			    error: function(error) {
			        console.log("~Log Error: " + error.message);
			        $(".error").show();
			    }
			});

    	});

		function getPosts() {
	 	  var defer = $q.defer();
		  var posts = [];

	      var query = new Parse.Query('Post');
	      query.find({
	          success: function(results) { // return an array of parse objects
	              

	              angular.forEach(results, function(parse_post) {
	                  var post = {};
	                  post.title = parse_post.get("title");
	                  post.content = parse_post.get("content");
	                  posts.push(post);
	              });
	              
	              defer.resolve(posts);
	          },
	          error: function(error) {
	              console.log("Query Error: " + error.message);
	              defer.reject(error);
	          }
	      });
	      return defer.promise;
	  	}

	  	getPosts().then(function(posts){
	  		$scope.posts = posts;	  		
	  	});
	});  // controller
}());	

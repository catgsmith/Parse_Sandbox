(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });

    myApp.controller('myController', function ($scope) {

		var TestObject = Parse.Object.extend("TestObject");
		var testObject = new TestObject();

		testObject.save({foo: "bar"}, {
			success: function(object) {
				$(".success").show();
			},
			error: function(model, error) {
				$(".error").show();
			}
		});


    });

}());	

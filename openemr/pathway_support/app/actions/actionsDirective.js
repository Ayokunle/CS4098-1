var KERNEL_REQUEST_URL = "/cgi-bin/kernel_request.py";
//var KERNEL_REQUEST_URL = "/openemr/pathway_support/test/kernel_request.php";

var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute', 'rootScope']);

app.directive('actionbuttons', function() {
	return {
		restrict: 'E',
		controller: function($scope, $rootScope) {
			$scope.start = function() { peos_request($scope, $rootScope, "START") };
			$scope.finish = function() { peos_request($scope, $rootScope, "FINISH") };
			$scope.suspend = function() { peos_request($scope, $rootScope, "SUSPEND") };
			$scope.abort = function() { peos_request($scope, $rootScope, "ABORT") };
		},
		scope: {
			pathwayAction : '=action'
		},
		templateUrl: '/openemr/pathway_support/app/actions/actions.html'
	}
});


function peos_request($scope, $rootScope, event_type) {
	getdata = {event : event_type,
				login_name : $scope.pid,
				action_name : $scope.pathwayAction["@name"],
				process_id : $scope.pathwayAction["@process_id"] };

	//The function that runs when the http request succeeds
	done = function(result, status, xhr) {
		console.log()
  		if (xhr.status=="200") {
  			$scope.$parent.getpathways();
		}
		else {
			console.log("Failed request");
			$scope.pathwayAction["@state"] = "Failed request";
		}
  		$rootScope.$digest(); //Force update of ui
	};

	//The function that runs when the http request fails
	fail =  function(xhr, status, error) {
		alert( xhr.responseText);
		console.log("error: " + error);
	};

	//Send a get request
	$.get(
		KERNEL_REQUEST_URL,
		getdata)
			.done(done)
			.fail(fail);
}
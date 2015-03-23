var KERNEL_REQUEST_URL = "/cgi-bin/kernel_request.py";
var KERNEL_REQUEST_URL_DEBUG = "/test/kernel_request.php";

var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);

app.directive('actionbuttons', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.start = function() { peos_request($scope, "START") };
			$scope.finish = function() { peos_request($scope, "FINISH") };
			$scope.suspend = function() { peos_request($scope, "SUSPEND") };
			$scope.abort = function() { peos_request($scope, "ABORT") };
		},
		scope: {
			pathwayAction : '=action'
		},
		templateUrl: '/openemr/pathway_support/app/actions/actions.html'
	}
});


function peos_request($scope, event_type) {
	getdata = {event : event_type,
				login_name : $scope.pid,
				action_name : $scope.pathwayAction["@name"],
				process_id : $scope.pathwayAction["@process_id"] };

	//The function that runs when the http request succeeds
	done = function(result, status, xhr) {
  		if (xhr.status=="200") {
  			$scope.pathwayAction["@state"] = result.new_state;
  			$scope.$digest(); //Force update of ui
		}
		else {
			console.log("Failed request");
			$scope.pathwayAction["@state"] = "Failed request";
		}
	};

	//The function that runs when the http request fails
	fail =  function(xhr, status, error) {
		alert( xhr.responseText);
		console.log("error: " + error);
	};

	//Send a get request
	$.get(
		KERNEL_REQUEST_URL_DEBUG,
		getdata)
			.done(done)
			.fail(fail);
}
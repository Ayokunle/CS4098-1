var actionApp = angular.module('actionApp', ['ngRoute']);

var KERNEL_REQUEST_URL = ':13930';

actionApp.controller('action_controller', function($scope) {
	$scope.action_name = "Action1";
	$scope.action_state = "None";
	$scope.patient_name = "TestPatient";
	$scope.process_id = 0;

	$scope.start = function() { peos_request($scope, "START") };
	$scope.finish = function() { peos_request($scope, "FINISH") };
});

function peos_request($scope, event_type) {
	getdata = {event : event_type,
				login_name : $scope.patient_name,
				action_name : $scope.action_name,
				process_id : $scope.process_id };

	//The function that runs when the http request succeeds
	done = function(result, status, xhr) {
  		if (xhr.status=="200") {

  			data = JSON.parse(result);

  			$scope.action_state = data.new_state;
  			$scope.$apply(); //Force update of ui
		}
		else {
			console.log("Failed request");
			$scope.action_state = "Failed request";
		}
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
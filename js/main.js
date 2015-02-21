var app = angular.module('myApp', []);
var popupapp = angular.module('popupApp', []);

var KERNEL_REQUEST_URL = 'backend/test_request.php';


function action_controller($scope) {
	$scope.action_name = "Action1";
	$scope.action_state = "None";
	$scope.patient_name = "TestPatient";
	$scope.process_id = 0;

	$scope.start = function() { peos_request($scope, "START") };
	$scope.finish = function() { peos_request($scope, "FINISH") };
}

function peos_request($scope, event_type) {
	postdata = {"event" : event_type,
				login_name : $scope.patient_name,
				action_name : $scope.action_name,
				process_id : $scope.process_id };

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

	fail =  function(xhr, status, error) {
		alert( xhr.responseText);
		console.log("error: " + error);
	};

	$.post(
		KERNEL_REQUEST_URL,
		postdata)
			.done(done)
			.fail(fail);
}
var KERNEL_REQUEST_URL = "/cgi-bin/kernel_request.py";
//var KERNEL_REQUEST_URL = "/openemr/pathway_support/test/kernel_request.php";

//Error constants
var ERROR = "error"
var ERROR_CODE = "error_code"
var ERR_USER_NOT_EXIST = 1
var ERR_SCRIPT_FAIL = 2


var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute', 'rootScope']);

app.directive('actionbuttons', function() {
	return {
		restrict: 'E',
		controller: function($scope, $rootScope) {
			$scope.start = function() { peos_request($scope, $rootScope, "start") };
			$scope.finish = function() { peos_request($scope, $rootScope, "finish") };
			$scope.suspend = function() { peos_request($scope, $rootScope, "suspend") };
			$scope.abort = function() { peos_request($scope, $rootScope, "abort") };
		},
		scope: {
			pathwayaction : '=action',
			pathway : '=pathway',
			active_pid: '=patient',
			oncompleterequest: '=oncompleterequest'
		},
		templateUrl: '/openemr/pathway_support/app/actions/actions.html'
	}
});


function peos_request($scope, $rootScope, event_type) {
	getdata = {event : event_type,
				login_name : $scope.active_pid,
				action_name : $scope.pathwayaction["@name"],
				process_id : $scope.pathway["@pid"] };


	//The function that runs when the http request succeeds
	done = function(data) {
		if (ERROR in data) {
			console.log(data);
		}
		else {
  			if (data["status"] == "success") {
  				console.log(data);
  				$scope.oncompleterequest();
  			}
  			else {
  				console.log("Unexpected output from backend:\n");
  				console.log(data);
  			}
  		}
  		$rootScope.$digest(); //Force update of ui
	};

	//The function that runs when the http request fails
	fail =  function(data) {
		console.log("fail");
        console.log("http " + data.status + ":\n" + data.responseText);
	};

	//Send a get request
	$.getJSON(
		KERNEL_REQUEST_URL,
		getdata)
			.done(done)
			.fail(fail);
}
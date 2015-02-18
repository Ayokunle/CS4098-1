var app = angular.module('myApp', []);
var popupapp = angular.module('popupApp', []);

var hello_world = "hello"
function test () {
	hello_world = "hi world"
}

function actionController($scope) {
	$scope.actionName = "Action1";
	$scope.actionState = "None";

	$scope.start = 
		function process_start() {
			xmlhttp=new XMLHttpRequest();
			console.log("Starting " + $scope.actionName);
			xmlhttp.onreadystatechange=function() {
		  		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		  			$scope.actionState = "Started";
				}
				else {
					$scope.actionState = "Failed request";
				}
			}

			xmlhttp.open("GET","backend/kernel_request.py",true);
			xmlhttp.send();
		};
}
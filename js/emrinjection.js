var app = angular.module('popupApp', ['ngRoute']);

app.controller("injection_controller", function($scope, $sce) {
	$.get("popup.html").done(function(data){
		console.log(data);
		$scope.InjectLocation = $sce.trustAsHtml(data);
		$scope.$digest();
	});
});
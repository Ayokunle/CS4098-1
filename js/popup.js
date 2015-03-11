var app
if (app == null)
        app = angular.module('popupApp', ['ngRoute']);

app.controller('pathway_controller', function($scope) {
        console.log("Starting pathway controller");
        $scope.openDialog = function() {
                console.log(window.active_pid);
                $scope.active_pid = window.active_pid;
                getPathway(window.active_pid, function(data){
                        $scope.result = data;
                });
        };
});
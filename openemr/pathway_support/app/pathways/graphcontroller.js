var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);

app.controller('graphcontroller', function($scope) {
    console.log("Starting graph controller");
});
//Constants
//var KERNEL_REQUEST_URL = "/cgi-bin/kernel_request.py";
var KERNEL_REQUEST_URL = "/test/kernel_request.php";
//Error constants
var ERROR = "error"
var ERROR_CODE = "error_code"
var ERR_USER_NOT_EXIST = 1

var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);

app.controller('pathwaycontroller', function($scope) {
    console.log("Starting pathway controller");

    $scope.active_pid = getUrlParameter("patient_id");
    $scope.selectedPathway = -1;

    $scope.deletepathway = deletepathway;
    $scope.opengraph = opengraph;
    $scope.selectpathway = function(pathwayindex) {
        selectpathway($scope, pathwayindex);
    }

    $scope.createpathway = function() {
        createpathway($scope);
    };
    
    console.log("$scope.active_pid: " + $scope.active_pid)
    
    if ($scope.active_pid != null) {
        ongetpathway = function(data) {
            console.log(data)
            if (ERROR in data) {
                console.log("An error was returned from backend")
                if (data[ERROR_CODE] == ERR_USER_NOT_EXIST) {
                    console.log("The user does not exist in peos")
                   $scope.pathways = {}
                }
            }
            else {
                //Display the list of pathways
                console.log("Displaying list of pathways")
                $scope.pathways = data["process_table"]["process"];
            }
            $scope.$digest();
        };
        getPathway($scope.active_pid, ongetpathway);
    }
});

function selectpathway($scope, pathwayindex) {
    $scope.selectedPathway = pathwayindex;
    console.log(pathwayindex);
    //$scope.$digest();
}

function createpathway($scope) {
    getdata = {"event" : "CREATE", "login_name" : $scope.active_pid, "pathway_name" : "test_commit.pml"};
    console.log("Requesting backend to create process")
    $.get(KERNEL_REQUEST_URL, getdata, datatype = 'json')
    .done(function(data){
        if (ERROR in data) {
            console.log("error[" + data[ERROR_CODE] + "]: " + data[ERROR]);
        }
        else {
            $scope.pathways= data["process_table"]["process"];
        }
        $scope.$digest();
    })
    .fail(function(data){
        console.log("fail");
        console.log(data);
    });
}

function deletepathway(pathway) {
    alert("Delete pathway \"" + pathway["@pid"] + "\": Not Yet Implemented");
}
function opengraph(pathway) {
    alert("Open graph for pathway \"" + pathway["@pid"] + "\": Not Yet Implemented");
}

function getPathway(pid, ondone, onfail) {
        getdata = {"event" : "GETLIST", "login_name" : pid};
        console.log("PID: " + pid)
        console.log("Requesting pathways from backend")
        $.get(KERNEL_REQUEST_URL, getdata, datatype = 'json')
        .done(function(data){
                console.log("Request successful")
                ondone(data);
        })
        .fail(function(data) {
                console.log("Request failed")
                console.log(data);
                if (onfail != null)
                    onfail(data);
        });
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

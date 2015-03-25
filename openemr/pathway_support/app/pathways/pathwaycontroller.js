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

    $scope.deletepathway = deletepathway;
    $scope.opengraph = opengraph;
    $scope.createpathway = function() {
        createpathway($scope);
    };

    if ($scope.active_pid != null) {
        ongetpathway = function(data) {
            if (ERROR in data) {
                if (data[ERROR_CODE] == ERR_USER_NOT_EXIST) {
                   $scope.pathways = {}
                }
            }
            else {
                //Display the list of pathways
                $scope.pathways = data["process_table"]["process"];
            }
            $scope.$digest();
        };
        getPathway($scope.active_pid, ongetpathway);
    }
});

function createpathway($scope) {
    getdata = {"event" : "CREATE", "login_name" : $scope.active_pid, "pathway_name" : "test_commit.pml"};

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

        $.get(KERNEL_REQUEST_URL, getdata, datatype = 'json')
        .done(function(data){
                ondone(data);
        })
        .fail(function(data) {
                console.log("fail");
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

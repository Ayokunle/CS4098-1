//Constants
var KERNEL_REQUEST_URL = "/cgi-bin/kernel_request.py";
//var KERNEL_REQUEST_URL = "/openemr/pathway_support/test/kernel_request.php";

var PATHWAY_SELECT = 0;
var PATHWAY_NOTIFY = 1;
var PATHWAY_GRAPH = 2;

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
    $scope.selectedpathway = -1;

    $scope.deletepathway = deletepathway;
    $scope.opengraph = function (pathwayindex) { 
        opengraph($scope, pathwayindex);
    }

    $scope.openpathwayselect = function() {
        openpathwayselect($scope);
    };
    $scope.getpathways = function() {
        getpathways($scope);
    };

    $scope.selectpathway = function(pathwayindex) {
        selectpathway($scope, pathwayindex);
    };

    $scope.createpathway = function() {
        createpathway($scope);
    };

    $scope.currentscreen = PATHWAY_SELECT;

    $scope.ispathwayselectscreen = function () { return $scope.currentscreen == PATHWAY_SELECT; };
    $scope.ispathwaynotifyscreen = function () { return $scope.currentscreen == PATHWAY_NOTIFY; };
    $scope.ispathwaygraphscreen = function () { return $scope.currentscreen == PATHWAY_GRAPH; };
});

function openpathwayselect($scope) {
    $scope.selectedpathway = -1;
    $scope.currentscreen = PATHWAY_SELECT;
}

function selectpathway($scope, pathwayindex) {
    $scope.selectedpathway = pathwayindex;
    $scope.currentscreen = PATHWAY_NOTIFY;
}

function createpathway($scope) {
    getdata = {"event" : "CREATE", "login_name" : $scope.active_pid, "pathway_name" : "test_commit.pml"};

    $.getJSON(KERNEL_REQUEST_URL, getdata, datatype = 'json')
    console.log("Requesting backend to create process")
    .done(function(data){
        if (ERROR in data) {
            console.log("error[" + data[ERROR_CODE] + "]: " + data[ERROR]);
        }
        else {
            $scope.getpathways()
        }
    })
    .fail(function(data){
        console.log("fail");
        console.log("http " + data.status + ":\n" + data.responseText);
    });
}

function deletepathway(pathway) {
    alert("Delete pathway \"" + pathway["@pid"] + "\": Not Yet Implemented");
}
function opengraph($scope, pathwayindex) {
    $scope.selectedpathway = pathwayindex;
    $scope.currentscreen = PATHWAY_GRAPH;
}

function getpathways($scope) {
    if ($scope.active_pid != null) {
        getdata = {"event" : "GETLIST", "login_name" : $scope.active_pid};

        $.getJSON(KERNEL_REQUEST_URL, getdata, datatype = 'json')
        .done(function(data){
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
        })
        .fail(function(data) {
                console.log("fail");
                console.log("http " + data.status + ":\n" + data.responseText);

        });
    }
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

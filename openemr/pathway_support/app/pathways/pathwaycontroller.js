//Constants
//var KERNEL_REQUEST_URL = "/cgi-bin/kernel_request.py";
var KERNEL_REQUEST_URL = "/openemr/pathway_support/test/kernel_request.php";

var PATHWAY_SELECT = 0;
var PATHWAY_NOTIFY = 1;
var PATHWAY_GRAPH = 2;

//Error constants
var ERROR = "error"
var ERROR_CODE = "error_code"
var ERR_USER_NOT_EXIST = 1
var ERR_SCRIPT_FAIL = 2

var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);

app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            if (text != null) {

                //Remove the quotes from the start and end of the html string
                if (text.charAt(1) == "\"") {
                    text = text.substring(2);
                }
                if (text.charAt(text.length - 2) == "\"") {
                    text = text.substring(0, text.length - 2);
                }
                return $sce.trustAsHtml(text);
            }
            else
            {
                return "";
            }
        };
    }]);

app.controller('pathwaycontroller', function($scope) {
    console.log("Starting pathway controller");
    //
    //Assign scope member functions
    //

    $scope.fixname = fixname;
    $scope.opengraph = function (pathwayindex) { 
        opengraph($scope, pathwayindex);
    }

    $scope.openpathwayselect = function() {
        openpathwayselect($scope);
    };
    $scope.openpathwaycreate = function() {
        openpathwaycreate($scope);
    }


    $scope.getpathways = function(oncompleterequest) {
        getpathways($scope, oncompleterequest);
    };

    $scope.selectpathway = function(pathwayindex) {
        selectpathway($scope, pathwayindex);
    };
    $scope.createpathway = function(pathwayname) {
        createpathway($scope, pathwayname);
    };
    $scope.deletepathway = function(pathwayname) {
        deletepathway($scope, pathwayname);
    };

    $scope.closepathwaycreate = function() {
        closepathwaycreate($scope);
    };


    $scope.ispathwayselectscreen = function () { return $scope.currentscreen == PATHWAY_SELECT; };
    $scope.ispathwaynotifyscreen = function () { return $scope.currentscreen == PATHWAY_NOTIFY; };
    $scope.ispathwaygraphscreen = function () { return $scope.currentscreen == PATHWAY_GRAPH; };
    
    //
    //Initialize pathway selection
    //
    $scope.currentscreen = PATHWAY_SELECT;
    $scope.active_pid = getUrlParameter("patient_id");
    $scope.getpathways();

    $scope.pathways = {};
    $scope.getselectedpathway = function () { return $scope.pathways[$scope.selectedpathway];
        console.log("getting selected pathway"); };

    $scope.selectedpml = "";
});

function openpathwayselect($scope) {
    $scope.selectedpathway = -1;
    $scope.currentscreen = PATHWAY_SELECT;
}

function openpathwaycreate($scope) {
    getdata = {"event" : "GETLIST_PEOS"};

    $.getJSON(KERNEL_REQUEST_URL, getdata, datatype = 'json')
    .done(function(data) {
        if (ERROR in data) {
            console.log("error[" + data[ERROR_CODE] + "]: " + data[ERROR]);
        }
        else {
            console.log(data);

            //Now display the dropdown list of pml files and ok/cancel buttons
            $scope.iscreatingpathway = true;
            $scope.pmlfiles = data;
            $scope.selectedpml = data[0];
            $scope.$digest();
        }
    })
    .fail(function(data){
        console.log("fail");
        console.log("http " + data.status + ":\n" + data.responseText);  
    });
}

function closepathwaycreate($scope) {
    $scope.iscreatingpathway = false;
}

function selectpathway($scope, pathwayindex) {
    console.log("selecting pathway: ");
    console.log(pathwayindex);
    $scope.selectedpathway = pathwayindex;
    $scope.currentscreen = PATHWAY_NOTIFY;
}

function createpathway($scope, pathwayname) {
    getdata = {"event" : "CREATE", "login_name" : $scope.active_pid, "pathway_name" : pathwayname};

    $scope.closepathwaycreate();
    console.log("Requesting backend to create process: " + pathwayname);

    $.getJSON(KERNEL_REQUEST_URL, getdata, datatype = 'json')
    .done(function(data){
        if (ERROR in data) {
            console.log("error[" + data[ERROR_CODE] + "]: " + data[ERROR]);
        }
        else {
            console.log(data);
            $scope.getpathways();
        }
    })
    .fail(function(data){
        console.log("fail");
        console.log("http " + data.status + ":\n" + data.responseText);
    });
}

function deletepathway($scope, pathway) {
    if (window.confirm("Are you sure you want to DELETE the pathway " + fixname(pathway["model"]) + "? \n\nOnce a pathway is DELETED it cannot be recovered!")) {
        getdata = {"event" : "DELETE", "login_name" : $scope.active_pid, "process_id" : pathway["pid"]};

        console.log("Requesting backend to delete process: " + pathway["model"] + " with process id = " + pathway["pid"]);

        $.getJSON(KERNEL_REQUEST_URL, getdata, datatype = 'json')
        .done(function(data){
            if (ERROR in data) {
                console.log("error[" + data[ERROR_CODE] + "]: " + data[ERROR]);
            }
            else {
                console.log(data);
                $scope.getpathways();
            }
        })
        .fail(function(data){
            console.log("fail");
            console.log("http " + data.status + ":\n" + data.responseText);
        });
    }
}
function opengraph($scope, pathwayindex) {
    $scope.selectedpathway = pathwayindex;
    $scope.currentscreen = PATHWAY_GRAPH;
}

function getpathways($scope, oncompleterequest) {
    if ($scope.active_pid != null) {
        getdata = {"event" : "GETLIST", "login_name" : $scope.active_pid};

        console.log("Getting list of pathways");
        $.getJSON(KERNEL_REQUEST_URL, getdata, datatype = 'json')
        .done(function(data) {
            console.log(data);
            if (ERROR in data) {
                if (data[ERROR_CODE] == ERR_USER_NOT_EXIST) {
                   $scope.pathways = {}
                }
            }
            else {
                //Display the list of pathways
                $scope.pathways = data["process_table"]["process"];
            }
            if (oncompleterequest != null)
            {
                oncompleterequest();
            }

            $scope.$digest();
        })
        .fail(function(data) {
                console.log("fail");
                console.log("http " + data.status + ":\n" + data.responseText);
        });
    }
}

//Added function for replacing all occurences of an item in a string
String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};

//Fix a name such as "diabetes_assessment.pml" to a more human readable "Diabetes assessment"
function fixname(name)
{
    if (name == null)
    {
        return "";
    }
    //Strip off the parent folders in the path until we get the filename
    pathparts = name.split("/");
    modelfile = pathparts[pathparts.length-1];

    //Strip off the file extension
    fileparts = modelfile.split(".");
    filename = fileparts[0]

    //Make it more readable
    filename = filename.replaceAll("_", " ");
    return filename.charAt(0).toUpperCase() + filename.slice(1);
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

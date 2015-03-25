

//var actionList = {State:"Ready", required_resources:{patient_record:"001671458.hl7"}, provided_resources:{patient_symptoms:"001671458.spt"}};

//var actionList = {State:"Ready", required_resources:"001671458.hl7", provided_resources:{patient_symptoms:"001671458.spt"}};

var app;
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);

app.controller('actionController', function($scope) {
			    
			    $scope.selectedPathway = {};
			    $scope.selectedPathway.action = [{"@state": "BLOCKED", "req_resource": {"@name": "working_dir", "@value": "{}", "@qualifier": ""}, "@name": "update_status_report", "script": "\"If all tests passed, you are finished; add this to your\n    list of accomplishments for today.  If not, go back and fix any\n    failures uncovered.\""}, {"@state": "NONE", "req_resource": {"@name": "working_dir", "@value": "{}", "@qualifier": ""}, "@name": "complete_commit", "script": "\"You are finished.  Get a cup of coffee!\""}];
				
				$scope.expand = function(){
					$(".expanded, .collapsed").toggle();
				};


			});

$(document).ready(function() {
    $(".expanded").hide();
});
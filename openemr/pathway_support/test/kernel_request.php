<?php
	header("Content-Type: application/json");
	if ($_GET["event"] == "GETLIST") {
		if ($_GET["login_name"] == "exists") {
			echo '{"process_table": {"process": [{"status": "2", "model": "./../../models/diabetes_assessment.pml", "pid": "1", "children": [{"action": {"state": "SATISFIED", "name": "Assess_patient_symptoms", "children": [{"script": {}}, {"req_resource": {"name": "patient_symptoms", "value": "\"${patient_symptoms}\"", "qualifier": ""}}, {"prov_resource": {"name": "assessment", "value": "\"${assessment}\"", "qualifier": ""}}]}}, {"branch": {"children": [{"sequence": {"action": {"state": "NONE", "name": "Glucose_test", "children": [{"script": {}}, {"req_resource": {"name": "assessment", "value": "\"${assessment}\"", "qualifier": ""}}, {"prov_resource": {"name": "blood_test", "value": "\"${blood_test}\"", "qualifier": ""}}]}}}, {"sequence": {"action": {"state": "NONE", "name": "Cholesterol_test", "children": [{"script": {}}, {"req_resource": {"name": "assessment", "value": "\"${assessment}\"", "qualifier": ""}}, {"prov_resource": {"name": "blood_test", "value": "\"${blood_test}\"", "qualifier": ""}}]}}}]}}, {"action": {"state": "NONE", "name": "Assess_diabetes", "children": [{"script": {}}, {"req_resource": {"name": "blood_test", "value": "\"${blood_test}\"", "qualifier": ""}}, {"prov_resource": {"name": "diagnosis", "value": "\"${diagnosis}\"", "qualifier": ""}}]}}]}]}}';
}
		else {
			echo '{"error" : "User does not exist", "error_code" : 1}';
		}
	} else if($_GET["event"] == "CREATE") {
		echo '{"status" : "success" }';
		//echo '{"error" : "API not yet implemented", "error_code" : 2}';
	} else if ($_GET["event"] == "GETLIST_PEOS") {
		$output = [0 => "test_commit", 1 => "xyz", 2 => "abc" ];
		echo json_encode($output);
	}
	else { 
		$x = $_GET;
		if ($_GET["event"] == "start") {
			$x["status"] = "success";
		}
		else if ($_GET["event"] == "finish") {
			$x["status"] = "success";
		}
		else if ($_GET["event"] == "suspend") {
			$x["status"] = "success";
		}
		else if ($_GET["event"] == "abort") {
			$x["status"] = "success";
		}
		echo json_encode($x);
	}
?>
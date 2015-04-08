<?php
	header("Content-Type: application/json");
	if ($_GET["event"] == "GETLIST") {
		if ($_GET["login_name"] == "exists") {
			echo '{"process_table": {"process": {"status": "2", "model": "./../../models/Diabetes_assessment.pml", "pid": "0", "children": [{"action": {"state": "SATISFIED", "name": "Assess_patient_symptoms", "children": [{"script": "\n&quot;Diabetes symptoms:&lt;br&gt;\n\t\t\t\t\tIncreased urination.&lt;br&gt;\n\t\t\t\t\tIncreased appetite or loss of appetite.&lt;br&gt;\n\t\t\t\t\tExcessive thirst.&lt;br&gt;\n\t\t\t\t\tVisible weight loss.&lt;br&gt;\n\t\t\t\t\tBlurred vision.&lt;br&gt;\n\t\t\t\t\tRecurrent skin infections.&lt;br&gt;\n\t\t\t\t\tFatigue.&lt;br&gt;\n\t\t\t\t\tVaginal infections or infections of the foreskin in uncircumcised men.&lt;br&gt;\n\t\t\t\t\tSlowly healing sores.&lt;br&gt;&quot;\n"}, {"req_resource": {"name": "patient_symptoms", "value": "\"\\${patient_symptoms}\"", "qualifier": ""}}, {"prov_resource": {"name": "assessment", "value": "\"\\${assessment}\"", "qualifier": ""}}]}}, {"branch": {"children": [{"sequence": {"action": {"state": "AVAILABLE", "name": "Glucose_test", "children": [{"script": "\n&quot;Fasting blood sugar (FBS) measures blood glucose after you have not eaten for at least 8 hours\n\t\t\t\t\t\t(normal: 70 and100 milligrams per deciliter (mg/dL)).&quot;\n"}, {"req_resource": {"name": "assessment", "value": "\"\\${assessment}\"", "qualifier": ""}}, {"prov_resource": {"name": "blood_test", "value": "\"\\${blood_test}\"", "qualifier": ""}}]}}}, {"sequence": {"action": {"state": "AVAILABLE", "name": "Cholesterol_test", "children": [{"script": "\n&quot;Diabetes tends to lower HDL cholesterol levels and raise triglyceride and LDL cholesterol levels, which increases the risk for heart disease and stroke.&lt;br&gt;\n\t\t\t\t\t\tNormal values&lt;br&gt;\n\t\t\t\t\t\tTotal: below 200 mg/dL&lt;br&gt;\n\t\t\t\t\t\tLDL: below 70 mg/dL&lt;br&gt;\n\t\t\t\t\t\tHDL: 40 mg/dL and above (men)&lt;br&gt;\n\t\t\t\t\t\t\t50 mg/dL and above (women) &lt;br&gt;\n\t\t\t\t\t\tTriglycerides: below 150 mg/dL&lt;br&gt;&quot;\n"}, {"req_resource": {"name": "assessment", "value": "\"\\${assessment}\"", "qualifier": ""}}, {"prov_resource": {"name": "blood_test", "value": "\"\\${blood_test}\"", "qualifier": ""}}]}}}]}}, {"action": {"state": "SATISFIED", "name": "Assess_diabetes", "children": [{"script": "\n&quot;Fasting blood sugar (FBS) glucose level of 100-125mg/dL means impaired fasting glucose, a type of prediabetes. This increases the risk for type 2 diabetes.&lt;br&gt;\n\t\t\t\tFasting blood sugar (FBS) glucose level of 126 mg/dL and higher most often means diabetes. &lt;br&gt;&lt;br&gt;\n\t\t\t\tCholesterol test levels do not influence the diabetes diagnosis but are a risk factor that should be considered and assesed.&lt;br&gt;&quot;\n"}, {"req_resource": {"name": "blood_test", "value": "\"\\${blood_test}\"", "qualifier": ""}}, {"prov_resource": {"name": "diagnosis", "value": "\"\\${diagnosis}\"", "qualifier": ""}}]}}]}}}';
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
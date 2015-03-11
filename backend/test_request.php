<?php

$x = $_POST;

if ($x["event"] == "START") {
	$x["new_state"] = "Started";
}
else if  ($x["event"] == "FINISH") {
	$x["new_state"] = "Finished";
}
echo json_encode($x);
?>
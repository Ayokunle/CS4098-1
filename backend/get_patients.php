<?php
	$output = shell_exec('mysqldump --xml -u root openemr patient_data');
	//echo $output;

	$file = 'patient_data.xml';
	// Write the contents back to the file
	file_put_contents($file, $output);
?>
<?php
	$output = shell_exec('python3 python_gateway.py event=' . $_GET["event"] . ' ' . 'login_name=' . $_GET["login_name"] . ' ' . 'pathway_name=' . $_GET["pathway_name"] . ' ' . 'action_name=' . $_GET["action_name"]);
    echo $output;
?>
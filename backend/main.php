
<?php 

$name = $_POST["name"]);

$fp = fopen('results.json', 'w');

fwrite($fp, json_encode($name));

fclose($fp);
?>

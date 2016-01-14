<?php
require("Red-Fox-API-Framework/RFS-API.php");
$route = explode('/',@$_GET['q']);

if($route[0] == "api"){
  $api = new RFS_API($route);
  echo($api->data);
}



?>

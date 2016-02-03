<?php
class RFS_API_Config{

  //Tells the API Framework to allow Cross Domain
  public $allowCORS = true;
  //public $allowedMethods = array("POST","GET","PUT","DELETE");

  public $allowedMethods = array("POST","GET");

  public $HTTPstatus = array(  
              200 => 'OK',
              404 => 'Not Found',
              405 => 'Method Not Allowed',
              500 => 'Internal Server Error',
          );
}
?>

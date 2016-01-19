<?php
require("RFS-API-Loader.php");
require("API-Datalink.php");
class RFS_API{

  private $header = "";
  public $config = null;
  private $method = "";
  public $data = "";
  private $HTTPstatus = array(
              200 => 'OK',
              404 => 'Not Found',
              400 => 'Bad Request',
              405 => 'Method Not Allowed',
              500 => 'Internal Server Error',
          );

  public function __construct($args){
    $config = new RFS_API_Config();

    if($config->allowCORS){
      $this->addHeader("Access-Control-Allow-Origin: *");
      $this->addHeader("Access-Control-Allow-Methods: *");
    }
    $this->addHeader("X-API-Server: iScout by Red Fox Scouts API Server");
    $this->addHeader("Content-Type: application/json");

    $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
    if(in_array($this->method,$config->allowedMethods)){
        /*Application Logic Here*/

        //ROUTING
        if(is_array($args)){

          //API Version
          if($args[0] == "api"){
            $dataLink = new API_datalink();
            //Controller

            //Staff
            if($args[1] == "staff"){
              if($args[2]){
                if($args[2] == "42"){
                  $this->_return(array("Error" => "Request resource cannot be found","HTTPStatus" => 404, "Input" => $args),404);
                }else{
                  $this->_return($dataLink->getStaffByStaffID($args[2]));
                }
              }else{
                $this->_return($dataLink->getAllStaff());
              }
            }else if($args[1] == "MarkingSchemeAssignment"){

              if(@$_GET['staffID']){
                $this->_return($dataLink->getStudentsAssignedToStaff(@$_GET['staffID']));
              }

            }

            else{
              $this->_return(array("Error" => "Request resource cannot be found","HTTPStatus" => 404, "Input" => $args),404);
            }
          }else{
            $this->_return(array("Error" => "Input is malformed! Routing failed!","HTTPStatus" => 400, "Input" => $args),400);
          }
        }else{
          $this->_return(array("Error" => "No input array is specified. Routing failed!","HTTPStatus" => 400, "Input" => $args),400);
        }

    }else{
        $this->_return(array("Error" => "Method Not Allowed"),405);
    }
  }

  private function _returnError($code){
    $responseCode = "";
    if($this->HTTPstatus[$code]){
        return $this->HTTPstatus[$code];
    }else{
       return $this->HTTPstatus[500];
    }
  }

  private function _return($data,$responseCode = 200){
    $this->addHeader("HTTP/1.1 " . $responseCode . " " . $this->_returnError($responseCode));
    $this->data = json_encode($data);
  }

  private function addHeader($header){
    header($header);
  }
}
?>

<?php
class API_Datalink {
  public $APIURL = "http://192.168.1.25/SIP-Grading-Client/Test-API-Server/";
  /*STAFF Controller*/
  public function getAllStaff(){
    $staff = array(
      array(
          "staffid" => 1,
          "username" => "JohnCena",
          "permssn" => "Admin"
      ),
      array(
          "staffid" => 2,
          "username" => "ChengKai",
          "permssn" => "Staff"
      ),
      array(
          "staffid" => 3,
          "username" => "PatrickLee",
          "permssn" => "Staff"
      ),
      array(
          "staffid" => 4,
          "username" => "ShawnLim",
          "permssn" => "Staff"
      )
    );

    return $staff;
  }

  public function getStaffByStaffID($id){
    $staff = array(
        "staffid" => intval($id),
        "username" => "JohnCena",
        "permssn" => "Admin"
    );

    return $staff;
  }

  public function getStudentsAssignedToStaff($staffID){

    $assignment = array(
      "staffid" => intval($staffID),
      "students" => array(
        array(
          "studid" => 1,
          "name" => "Bobby Tan",
          "adminno" => "130222A",
          "studentImage" => $this->APIURL."images/user-image-default-4.png",
          "dip" => "Information Technology",
          "assignmentID" => 2
        ),
        array(
          "studid" => 3,
          "name" => "Tommas Toh",
          "adminno" => "130212A",
          "studentImage" =>  $this->APIURL."images/user-image-default.png",
          "dip" => "Psychology Studies",
          "assignmentID" => 4
        ),
        array(
          "studid" => 4,
          "name" => "Ben Toh",
          "adminno" => "130998D",
          "studentImage" =>  $this->APIURL."images/user-image-default-3.png",
          "dip" => "Game Design",
          "assignmentID" => 5
        ),
      )
    );
    return $assignment;
  }
}
?>

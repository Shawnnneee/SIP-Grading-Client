<?php
class API_Datalink {

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

    $assigment = array(
      "staffid" => intval($staffID),
      "students" => array(
        array(
          "studid" => 1,
          "name" => "John Tan",
          "adminno" => "130222A",
          "studentImage" => "#",
          "assigmentID" => 2
        ),
        array(
          "studid" => 3,
          "name" => "Tommas Toh",
          "adminno" => "130212A",
          "studentImage" => "#",
          "assigmentID" => 4
        ),
        array(
          "studid" => 4,
          "name" => "Ben Toh",
          "adminno" => "130998D",
          "studentImage" => "#",
          "assigmentID" => 5
        ),
      )
    );
    return $assigment;
  }
}
?>

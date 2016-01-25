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
        array(
            "studid" => 5,
            "name" => "Jesmond Heng",
            "adminno" => "1309298D",
            "studentImage" =>  $this->APIURL."images/user-image-default.png",
            "dip" => "Game Design",
            "assignmentID" => 6
        ),
        array(
            "studid" => 6,
            "name" => "Patrick Lee",
            "adminno" => "1303298D",
            "studentImage" =>  $this->APIURL."images/user-image-default-2.png",
            "dip" => "Media Design",
            "assignmentID" => 7
        )
      )
    );
    return $assignment;
  }

    public function GetMarkingSchemeByAssignmentID($asid){
        $markingScheme = array(
            "Student" => array(
                "studid" => 6,
                "name" => "Patrick Lee",
                "adminno" => "1303298D",
                "studentImage" =>  $this->APIURL."images/user-image-default-2.png",
                "dip" => "Media Design",
            ),
            "MarkingSchemeID" => 1,
            "AssignmentID" => intVal($asid),
            "ComponentAssigned" => array(
                array(
                    "Id" => 1,
                    "Name" => "Student Performance",
                    "Description" => "This component assesses the student's performance during the internship",
                    "Min" => 0,
                    "Max" => 10,
                    "Weightage" => 0.2 //20%
                ),
                array(
                    "Id" => 2,
                    "Name" => "Derivables",
                    "Description" => "This component assesses the project submitted",
                    "Min" => 0,
                    "Max" => 20,
                    "Weightage" => 0.488 //48.8%
                ),
                array(
                    "Id" => 3,
                    "Name" => "Report",
                    "Description" => "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
                    "Min" => 0,
                    "Max" => 5,
                    "Weightage" => 0.20 //20%
                )
            )
        );
        return $markingScheme;
    }
}
?>

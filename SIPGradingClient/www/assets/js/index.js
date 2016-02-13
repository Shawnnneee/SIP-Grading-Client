var template;
var ajaxRunning;

$(document).ready(function () {
    sipGrading.protectPage();

    ajaxRunning = false;

    console.log("Index.js is Running!");

    //Load the students info
    template = "<div class=\"lv-main-container \">"+$('.index-stud-container').html()+"</div>";
    $('.index-stud-container').remove();
    loadStudentsAssignedToStaff();

    //When user clicks on a student
    $(document).on('click','.assignment-id',function () {
        var assignmentID = $(this).attr('data-assignment-id');
        console.log(assignmentID);

        if($(this).attr('data-assessment-sumitted') == "true"){
            window.location = "assessmentView.html#/assessment/"+assignmentID;
        }else{
            window.location = "assessment.html#/assessment/"+assignmentID;
        }

    });
});

function loadStudentsAssignedToStaff(){
    console.log("Loading List of Students");
    if(!ajaxRunning){
        ajaxRunning = true;
        $('.lv-main-container').html("").remove();
        $('.lv-refresh').addClass("lv-refresh-active");
        sipGrading.ajaxHelper("assignment/?staffid="+sipGrading.getCurrentUserInfo().userID,"GET","",function (data) {

            var studentObject = data;

            for(var x = 0; x<studentObject.length; x++){
                var tmp = template;
                tmp = tmp.replace("[{index-stud-name}]",studentObject[x].name);
                tmp = tmp.replace("[{index-stud-adminno}]",studentObject[x].matricno);
                //tmp = tmp.replace("[{index-stud-image}]",studentObject[x].studentImage);
                tmp = tmp.replace("[{index-stud-image}]",'http://sipgradingapi.mjrredfox.org/images/user-image-default.png');
                tmp = tmp.replace("[{index-stud-dip}]",studentObject[x].dip);
                tmp = tmp.replace("[{index-assignment-id}]",studentObject[x].assignid);
                //assessmentSubmitted
                tmp = tmp.replace("[{data-assessment-sumitted}]",studentObject[x].assessmentSubmitted);
                if(studentObject[x].assessmentSubmitted){
                    tmp = tmp.replace("[{index-submission-status-class}]","lv-meta-i-success");
                    tmp = tmp.replace("[{index-submission-status}]","Submitted");
                }else{
                    if(localStorage.getItem("SIP-Grading-Client-Assessment-Draft-"+studentObject[x].assignid)){
                        tmp = tmp.replace("[{index-submission-status-class}]","lv-meta-i-primary");
                        tmp = tmp.replace("[{index-submission-status}]","Draft");
                    }else{
                        tmp = tmp.replace("[{index-submission-status-class}]","lv-meta-i-info");
                        tmp = tmp.replace("[{index-submission-status}]","New");
                    }

                }
                $('.stud-assignment-lv').append(tmp);

            }

            $('.lv-refresh').removeClass("lv-refresh-active");
            ajaxRunning = false;
        });
    }

}
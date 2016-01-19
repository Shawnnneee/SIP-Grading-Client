var template;
var ajaxRunning;

$(document).ready(function () {
    sipGrading.protectPage();

    ajaxRunning = false;

    //Load the students info
    template = "<div class=\"lv-main-container \">"+$('.index-stud-container').html()+"</div>";
    $('.index-stud-container').remove();
    loadStudentsAssignedToStaff();

    //When user clicks on a student
    $(document).on('click','.assignment-id',function () {
        console.log($(this).attr('data-assignment-id'));
    });
});

function loadStudentsAssignedToStaff(){
    if(!ajaxRunning){
        ajaxRunning = true;
        $('.lv-main-container').html("").remove();
        $('.lv-refresh').addClass("lv-refresh-active");
        sipGrading.ajaxHelper("MarkingSchemeAssignment/?staffID=1","GET","",function (data) {

            var studentObject = data.students;

            for(var x = 0; x<studentObject.length; x++){
                var tmp = template;
                tmp = tmp.replace("[{index-stud-name}]",studentObject[x].name);
                tmp = tmp.replace("[{index-stud-adminno}]",studentObject[x].adminno);
                tmp = tmp.replace("[{index-stud-image}]",studentObject[x].studentImage);
                tmp = tmp.replace("[{index-stud-dip}]",studentObject[x].dip);
                tmp = tmp.replace("[{index-assignment-id}]",studentObject[x].assigmentID);
                $('.stud-assignment-lv').append(tmp);

            }

            $('.lv-refresh').removeClass("lv-refresh-active");
            ajaxRunning = false;
        });
    }

}
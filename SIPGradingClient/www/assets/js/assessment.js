var ajaxRunning = false;

$(document).ready(function () {
    var assessment = location.hash;
    assessment = assessment.split("/")[2];

    console.log("[INFO] assessment.js is running!");
    getAssessmentScheme(assessment);
});

function getAssessmentScheme(assessmentID){
    if(!ajaxRunning){
        ajaxRunning = true;
        console.log("[INFO] Getting Assessment Scheme of "+assessmentID);
        sipGrading.ajaxHelper("GetMarkingSchemeByAssignmentID?assignmentID="+assessmentID,"GET","",function (data) {
            var assessmentTemplate = "";
            assessmentTemplate += " <div class=\"col-md-4\">";
            assessmentTemplate += " <div class=\"student-info\">";
            assessmentTemplate += "<div class=\"rfs-profile-image\"><img src=\""+data.Student.studentImage+"\" /></div>";
            assessmentTemplate += "<div class=\"rfs-profile-info\">";

            assessmentTemplate += "<div class=\"rfs-profile-line\">";
            assessmentTemplate += "<dl>";
            assessmentTemplate += "<dt>Name</dt>";
            assessmentTemplate += "<dd>"+data.Student.name+"</dd>";
            assessmentTemplate += "</dl>";
            assessmentTemplate += "</div>";

            assessmentTemplate += "<div class=\"rfs-profile-line\">";
            assessmentTemplate += "<dl>";
            assessmentTemplate += "<dt>Admission Number</dt>";
            assessmentTemplate += "<dd>"+data.Student.adminno+"</dd>";
            assessmentTemplate += "</dl>";
            assessmentTemplate += "</div>";

            assessmentTemplate += "<div class=\"rfs-profile-line\">";
            assessmentTemplate += "<dl>";
            assessmentTemplate += "<dt>Diploma</dt>";
            assessmentTemplate += "<dd>"+data.Student.dip+"</dd>";
            assessmentTemplate += "</dl>";
            assessmentTemplate += "</div>";

            assessmentTemplate += "</div>"
            assessmentTemplate += "</div>";
            assessmentTemplate += "</div>";


            assessmentTemplate += "<div class=\"col-md-8\">";
            assessmentTemplate += "<div class=\"marking-scheme-container\">";

            for(var x = 0; x<data.ComponentAssigned.length;x++){
                var component = data.ComponentAssigned[x];
                assessmentTemplate += "<div class=\"marking-scheme-item\" data-component-id=\""+component.Id+"\">";
                assessmentTemplate += "<div class=\"marking-scheme-title\">";
                assessmentTemplate += (x + 1)+". "+component.Name+" ";
                assessmentTemplate += "<span class=\"marking-scheme-weightage\">["+parseFloat(component.Weightage * 100)+"%]</span> ";
                assessmentTemplate += "</div>";
                assessmentTemplate += "<div class=\"marking-scheme-description\">";
                assessmentTemplate += component.Description;
                assessmentTemplate += "</div>";
                assessmentTemplate += "<div class=\"marking-scheme-slider\">";
                assessmentTemplate += " <div class=\"marking-scheme-slider-header\">Score:</div>";
                assessmentTemplate += " <div class=\"rfs-forms-slider\" data-min=\""+component.Min+"\" data-max=\""+component.Max+"\"></div>";
                assessmentTemplate += "</div>";
                assessmentTemplate += "<div class=\"marking-scheme-remarks\">";
                assessmentTemplate += "<div class=\"marking-scheme-slider-header\">Remarks:</div>";
                assessmentTemplate += "<div class=\"marking-scheme-remarks-textarea\">";
                assessmentTemplate += "<textarea class=\"rfs-forms-textarea\" placeholder=\"Enter your remarks here\"></textarea>";
                assessmentTemplate += "</div>";
                assessmentTemplate += "</div>";
                assessmentTemplate += "</div>";
            }

            assessmentTemplate += "</div>";

            assessmentTemplate += "</div>";

            $('.assessment-component').html(assessmentTemplate);
            iscout_red_fox_slider();
        });
    }
}
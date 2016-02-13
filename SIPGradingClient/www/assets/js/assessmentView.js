var assessmentComponentLoaded = false;
var assessment = 0;
var ajaxRunning = false;

$(document).ready(function () {
    assessment = location.hash;
    assessment = assessment.split("/")[2];
    if(!ajaxRunning) {
        ajaxRunning = true;
        sipGrading.ajaxHelper("assignment?assignid="+assessment,"GET","",function (data) {
            var assessmentTemplate = "";
            console.log(data);
            assessmentTemplate += " <div class=\"col-md-4\">";
            assessmentTemplate += " <div class=\"student-info\">";
            //assessmentTemplate += "<div class=\"rfs-profile-image\"><img src=\""+data.Student.studentImage+"\" /></div>";
            assessmentTemplate += "<div class=\"rfs-profile-image\"><img src=\"http://sipgradingapi.mjrredfox.org/images/user-image-default.png\" /></div>";
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
            assessmentTemplate += "<dd>"+data.Student.matricno+"</dd>";
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

            assessmentTemplate += "<div class=\"rfs-g assessment-confirmation-content-view-a\">";

            assessmentTemplate += "<div class=\"rfs-g assessment-confirmation-content-view-b\">";

            for(var x = 0; x<data.ComponentAssigned.length;x++){
                var component = data.ComponentAssigned[x];


                assessmentTemplate += "<div class=\"assessment-confirmation-item assessment-component-"+component.Id+"\" data-component-id=\""+component.Id+"\">";

                assessmentTemplate += "<div class=\"assessment-confirmation-item-title\">";
                assessmentTemplate += (x + 1)+". "+component.Name+" ";
                assessmentTemplate += "<span class=\"marking-scheme-weightage\">["+component.Weightage+"%]</span> ";
                assessmentTemplate += "</div>";

                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-grade\">";
                assessmentTemplate += "Your Score: ";
                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-grade-box\">";

                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-grade-box-score\">";
                assessmentTemplate += "</div>";

                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-grade-box-max\">";
                assessmentTemplate += "/"+component.Max;
                assessmentTemplate += "</div>";

                assessmentTemplate += "</div>";
                assessmentTemplate += "</div>";

                assessmentTemplate += "<div class=\"clearfix\"></div>";

                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-comments\">";
                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-comments-title\">Your Remarks:</div>";
                assessmentTemplate += "<div class=\"assessment-confirmation-content-item-comments-body\"></div>";
                assessmentTemplate += "</div>";

                assessmentTemplate += "</div>"


            }

            assessmentTemplate += "</div>";

            assessmentTemplate += "</div>";

            assessmentTemplate += "</div>";

            assessmentTemplate += "</div>";
            $('body').find('.assessment-student-name').text(data.Student.name);
            $('.assessment-component').html(assessmentTemplate);

            sipGrading.ajaxHelper('assignment/?submittedAssessmentId='+assessment,'GET','',function (data_) {
                var submittedResults = JSON.parse(data_.submittedAssessment);
                console.log(submittedResults);
                for(var x = 0; x<submittedResults.length; x++){
                    var t = $('.assessment-confirmation-content-view-b').find('.assessment-component-'+submittedResults[x].componentID);

                    t.find('.assessment-confirmation-content-item-grade-box-score').text(submittedResults[x].score);

                    if(submittedResults[x].remarks){
                        t.find('.assessment-confirmation-content-item-comments-body').html(submittedResults[x].remarks);
                    }else{
                        t.find('.assessment-confirmation-content-item-comments-body').html("<i>No Remarks</i>");
                    }

                }
            });


            //Housekeeping
            ajaxRunning = false;
            assessmentComponentLoaded = true;
        });
    }
});
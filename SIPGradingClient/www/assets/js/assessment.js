var ajaxRunning = false;
var assessmentComponentLoaded = false;
var checkingModalActive = false;
var assessment = 0;
var assessmentSubmissionScheme = {
    componentID : 0,
    score : 0,
    remarks : ""
};

$(document).ready(function () {
    assessment = location.hash;
    assessment = assessment.split("/")[2];

    console.log("[INFO] assessment.js is running!");
    getAssessmentScheme(assessment);
    $('.assessment-confirmation-title').css('bottom','-100px');
    var lastScrollTop = 0;
    $(document).on('scroll',function(event){
        var st = $(this).scrollTop();
        if(assessmentComponentLoaded && !checkingModalActive){
            if (st > lastScrollTop){
                //Scroll Down
                $('.assessment-confirmation-title').css('bottom','-100px');
            } else {
                //Scroll Up
                $('.assessment-confirmation-title').css('bottom',"0px");
            }
        }
        lastScrollTop = st;
    });

    $(document).on('click','.assessment-next',function() {
        toggleReviewModal();
    });

    $(document).on('click','.assessment-confirmation-title',function (){
        toggleReviewModal();
    });

    $(document).on('click','.assessment-save',function () {
        saveAssessmentComponent();
    });

    $(document).on('click','.assessment-submit',function () {
        submitAssessment();
    });

    function toggleReviewModal(){
        if(!checkingModalActive) {
            $('.assessment-confirmation-content').css('display','block');
            $('.assessment-confirmation-content').css('height','0px');
            $('.assessment-confirmation-title').css('bottom',$(window).height()-$('.rfs-header').outerHeight()-$('.assessment-confirmation-title').outerHeight() + 1+"px");
            $('.assessment-confirmation-content').css('height',$(window).height()-$('.rfs-header').outerHeight()-$('.assessment-confirmation-title').outerHeight() + 1+"px");
            $('.assessment-confirmation-title').css('background-color','#6D38BD');

            $('body').css('overflow','hidden');
            $('.assessment-confirmation-title').text("Return to Assessment Scheme");
            populateModal();
            checkingModalActive = true;
        }else{
            $('.assessment-confirmation-content').css("height","0px");
            $('.assessment-confirmation-title').css('bottom',"0px");
            $('.assessment-confirmation-title').css('background-color','#4F49FC');
            $('body').css('overflow','');
            $('.assessment-confirmation-title').text("Review Your Assessment");
            populateModal();
            checkingModalActive = false;
        }
    }
});

function submitAssessment(){
    $('.assessment-submission-modal').fadeIn(500);
    var submitAssessmentModel = {
        AssignmentID : assessment,
        UserID : sipGrading.getCurrentUserInfo().userID,
        Components : compileAssessmentComponents(true)
    };
    console.log(JSON.stringify(submitAssessmentModel));
    sipGrading.ajaxHelper("SubmitAssessmentScheme","POST",submitAssessmentModel,function (data) {
        //window.location = "index.html";
    });
}

function saveAssessmentComponent(){
    localStorage.setItem('SIP-Grading-Client-Assessment-Draft-'+assessment,JSON.stringify(compileAssessmentComponents(false)));
    rfs_notify.show("Note: Drafts will only be saved locally!","Draft Saved!",rfs_notify.theme.success,false,'fa-floppy-o');
}

function loadSavedDraft(){
    var saved = localStorage.getItem('SIP-Grading-Client-Assessment-Draft-'+assessment);
    if(saved){
        saved = JSON.parse(saved);
        $('.marking-scheme-item').each(function () {
            var _this = $(this);
            for(var x = 0; x<saved.length; x++){
                if(saved[x].componentID == _this.attr("data-component-id")){
                    _this.find('.rfs-forms-slider').attr('data-initial',saved[x].score);
                    _this.find('.rfs-forms-textarea').val(saved[x].remarks);
                    break;
                }
            }
        });
        rfs_notify.show(" ","We have restored your previous draft",rfs_notify.theme.info);
    }
}

function compileAssessmentComponents(breaklinesConvert){
    var assessmentComponentCompiled = [];
    $('.marking-scheme-item').each(function () {
        var assessmentComponent = Object.create(assessmentSubmissionScheme);
        assessmentComponent.componentID = parseInt($(this).attr('data-component-id'));
        assessmentComponent.score = parseInt($(this).find(".rfs-forms-slider-values-current-value").text());
        assessmentComponent.remarks = $(this).find('.rfs-forms-textarea').val().replace(/(<([^>]+)>)/ig,"");
        if(breaklinesConvert){
            assessmentComponent.remarks = assessmentComponent.remarks.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        //console.log(assessmentComponent);
        assessmentComponentCompiled.push(assessmentComponent);
    });
    return assessmentComponentCompiled;
}

function populateModal(){
    $('.assessment-confirmation-content-view-b').html("");
    var assessmentSchemeReview = "";
    $('.marking-scheme-item').each(function () {
        assessmentSchemeReview += "<div class=\"assessment-confirmation-item\">";

        assessmentSchemeReview += "<div class=\"assessment-confirmation-item-title\">";
        assessmentSchemeReview += $(this).find('.marking-scheme-title').html();
        assessmentSchemeReview += "</div>";

        assessmentSchemeReview += "<div class=\"assessment-confirmation-content-item-grade\">";
        assessmentSchemeReview += "Your Score:";
        assessmentSchemeReview += "<div class=\"assessment-confirmation-content-item-grade-box\">";
        assessmentSchemeReview += "<div class=\"assessment-confirmation-content-item-grade-box-score\">"+$(this).find(".rfs-forms-slider-values-current-value").text()+"</div>";
        assessmentSchemeReview += "<div class=\"assessment-confirmation-content-item-grade-box-max\">/"+$(this).find(".rfs-forms-slider-values-max").text()+"</div>";
        assessmentSchemeReview += "</div>";
        assessmentSchemeReview += "</div>";

        assessmentSchemeReview += "<div class=\"clearfix\"></div>";
        assessmentSchemeReview += " <div class=\"assessment-confirmation-content-item-comments\">";
        assessmentSchemeReview += "<div class=\"assessment-confirmation-content-item-comments-title\">Your Remarks:</div>";

        if($(this).find('.rfs-forms-textarea').val()){
            assessmentSchemeReview += $(this).find('.rfs-forms-textarea').val().replace(/(?:\r\n|\r|\n)/g, '<br />');
        }else{
            assessmentSchemeReview += "<i>No Remarks</i>";
        }


        assessmentSchemeReview += "</div>";
        assessmentSchemeReview += "</div>";
    });
    $('.assessment-confirmation-content-view-b').append(assessmentSchemeReview);
}

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

            assessmentTemplate += "<div class=\"rfs-forms-submit\">";
            assessmentTemplate += "<button class=\"btn btn-info rfs-forms-lg-submit assessment-save\" style=\"width:50%\"><i class=\"fa fa-floppy-o\"></i> Save as Draft</button><button class=\"btn btn-success rfs-forms-lg-submit assessment-next\" style=\"width:50%\"><i class=\"fa fa-check\"></i> Submit Assessment</button>";
            assessmentTemplate += "</div>";

            assessmentTemplate += "</div>";
            $('body').find('.assessment-student-name').text(data.Student.name);
            $('.assessment-component').html(assessmentTemplate);
            loadSavedDraft();


            //Housekeeping
            ajaxRunning = false;
            assessmentComponentLoaded = true;
            iscout_red_fox_slider();
        });
    }
}
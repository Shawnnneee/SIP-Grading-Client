var componentModel = {
    Id : 0,
    Name : "",
    Description : "",
    Min : 0,
    Max : 0,
    Weightage : 0.00
}

var assessmentMarkingSchemeModal = {
    mschemeid : 0,
    createdby : 0,
    name : "",
    mscheme : ""
}
var assessmentComponentTemplate;
$(document).ready(function () {
    assessmentComponentTemplate = "<div class=\"assessment-component-container\">"+$(".assessment-component-container").html()+"<div class=\"rfs-input-gp\" style=\"text-align: right;\"><button class=\"rfs-btn-m rfs-btn-m-red create-component-delete\"><i class=\"fa fa-trash\"></i></button></div></div>";

    $(document).on('click','.add-new-component-btn',function () {
        console.log("Create New Component");
        $('.component-create-container').append(assessmentComponentTemplate);
    });

    $(document).on('click','.create-component-delete',function () {
        $(this).parent().parent().remove();
    });

    $('.create-component-container').css('top',$('.assessment-component-master .rfs-page-single-paper-header').position().top+"px");
    $('.create-component-container').css('left',$('.assessment-component-master').position().left+$('.assessment-component-master').width()+"px");
    setTimeout(function () {
        $('.create-component-container').addClass('component-container-animator');
    },10);

    $(document).on('click','.create-assessment-scheme-btn',function () {
        var totalWeightage = 0.00;
        var isValidMaster = true;
        $('.assessment-component-container').each(function () {
            var isValid = true;
            //Required Field Validation
            $(this).find('.rfs-required-field').each(function () {
                if($(this).val() == ""){
                    $(this).addClass("rfs-forms-input-has-error");
                    $(this).parent().find(".rfs-validation-error").remove();
                    $(this).parent().append('<div class="rfs-validation-error">This is a Required Field!</div>');
                    $(this).parent().find(".rfs-validation-error").css('display','block');
                    isValid = false;
                    isValidMaster = false;

                }else{
                    $(this).removeClass("rfs-forms-input-has-error");
                    $(this).parent().find(".rfs-validation-error").remove();
                }
            });

            if(isValid){
                var min = $(this).find('.component-min').val();
                var max = $(this).find('.component-max').val();

                if(min<0 || max<0){
                    var min = $(this).find('.component-min').addClass("rfs-forms-input-has-error");
                    var max = $(this).find('.component-max').addClass("rfs-forms-input-has-error");
                    $(this).find('.component-min').parent().find(".rfs-validation-error").remove();
                    $(this).find('.component-min').parent().append('<div class="rfs-validation-error">Scores must not be neagtive!</div>');
                    $(this).find('.component-min').parent().find(".rfs-validation-error").css('display','block');
                    isValidMaster = false;
                }else if(min>max){
                    var min = $(this).find('.component-min').addClass("rfs-forms-input-has-error");
                    var max = $(this).find('.component-max').addClass("rfs-forms-input-has-error");
                    $(this).find('.component-min').parent().find(".rfs-validation-error").remove();
                    $(this).find('.component-min').parent().append('<div class="rfs-validation-error">The maximum score must be more than the minimum score!</div>');
                    $(this).find('.component-min').parent().find(".rfs-validation-error").css('display','block');
                    isValidMaster = false;
                }else{
                    var min = $(this).find('.component-min').removeClass("rfs-forms-input-has-error");
                    var max = $(this).find('.component-max').removeClass("rfs-forms-input-has-error");
                    $(this).find('.component-min').parent().find(".rfs-validation-error").remove();
                }

                totalWeightage += parseFloat($(this).find('.component-weightage').val());
            }
        });

        if(isValidMaster){
            if(totalWeightage != 100){
                $('.assessment-component-container').find('.component-weightage').addClass("rfs-forms-input-has-error");
                rfs_notify.show("All component's weightage must add up to 100%!<br />Total is now: "+totalWeightage+"%","Validation Error!",rfs_notify.theme.fail,"","fa fa-exclamation-triangle",5000);
                isValidMaster = false;
            }else{
                $('.assessment-component-container').find('.component-weightage').removeClass("rfs-forms-input-has-error");
            }
        }

        //Create an array of object

        if(isValidMaster){
            var componentObjectArray = [];

            var count = 1;

            $('.assessment-component-container').each(function () {
                var tmp = Object.create(componentModel);
                tmp.Id = count;
                tmp.Name = $(this).find('.component-name').val();
                tmp.Description = $(this).find('.rfs-forms-textarea').val().replace(/(<([^>]+)>)/ig,"").replace(/(?:\r\n|\r|\n)/g, '<br />');
                tmp.Min = parseFloat($(this).find('.component-min').val());
                tmp.Max = parseFloat($(this).find('.component-max').val());
                tmp.Weightage = parseFloat($(this).find('.component-weightage').val());
                componentObjectArray.push(tmp);
                count++;
            });

            var isValid = true;

            $('body').find('.rfs-required-field').each(function () {
                if($(this).val() == ""){
                    $(this).addClass("rfs-forms-input-has-error");
                    $(this).parent().find(".rfs-validation-error").remove();
                    $(this).parent().append('<div class="rfs-validation-error">This is a Required Field!</div>');
                    $(this).parent().find(".rfs-validation-error").css('display','block');
                    isValid = false;
                }else{
                    $(this).removeClass("rfs-forms-input-has-error");
                    $(this).parent().find(".rfs-validation-error").remove();
                }
            });

            var componentJSON = JSON.stringify(componentObjectArray);

            var ajaxPOST = Object.create(assessmentMarkingSchemeModal);
            ajaxPOST.createdby = 1;
            ajaxPOST.mscheme = componentJSON;
            ajaxPOST.name = $('.assessment-name').val();
            console.log(JSON.stringify(ajaxPOST));
            sipGrading.ajaxHelper('markingscheme/','POST',ajaxPOST,function (data){
                window.location = 'index.html?message='+encodeURIComponent("Successfully Created Assessment Scheme!");
            });
        }

    });
});

$(window).resize(function () {
    $('.create-component-container').removeClass('component-container-animator');
    $('.create-component-container').css('top',$('.assessment-component-master .rfs-page-single-paper-header').position().top+"px");
    $('.create-component-container').css('left',$('.assessment-component-master').position().left+$('.assessment-component-master').width()+"px");
    setTimeout(function () {
        $('.create-component-container').addClass('component-container-animator');
    },10);
});
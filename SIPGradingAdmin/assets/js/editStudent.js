var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

$(document).ready(function () {
    if($_GET['studentid']){
        sipGrading.ajaxHelper('markingscheme','GET','',function (data) {
            $('.edit-student-markingscheme').html('');

            for(var x = 0; x<data.length; x++){
                var optionTmp = "";
                optionTmp = "<option value=\""+data[x].mschemeid+"\">"+data[x].name+", Created By: "+data[x].createdby+"</option>";
                $('.edit-student-markingscheme').append(optionTmp);
            }

            $('.edit-student-markingscheme').removeAttr('disabled');

            sipGrading.ajaxHelper('student/?studid='+$_GET['studentid'],'GET','',function (data) {
                console.log(data);

                if(data.name){
                    $('.edit-student-name-display').text(data.name);
                    $('.edit-student-name').val(data.name);
                    $('.edit-student-dip').val(data.dip);
                    $('.edit-student-adminno').val(data.matricno);
                    $('.edit-student-markingscheme').attr('data-initial-id',data.mschemeassigned)
                    $('.edit-student-markingscheme').find('option').each(function () {
                        if($(this).attr('value') == data.mschemeassigned){
                            $(this).attr('selected','selected');
                        }
                    });
                }else{
                    $('.err-show').html('<div class="edit-staff-warning">Student Could Not Be Found!</div>');
                    $('.update-student').remove();
                }

            });

        });
    }

    $(document).on('click','.student-delete-button',function () {
       var c = confirm("Are you sure you want to delete this student?");
        if(c){
            sipGrading.ajaxHelper('student?studid='+$_GET['studentid'],'DELETE','',function () {
                window.location = 'index.html?message='+encodeURIComponent("Successfully Deleted Student!");
            });
        }
    });



    $(document).on('click','.update-student',function () {
        var isValid = true;

        $('.rfs-required-field').each(function () {
            $(this).parent().find('.import-validation-error').remove();
            $(this).removeClass('rfs-validation-f-error');
            if($(this).val() == ''){
                $(this).addClass('rfs-validation-f-error');
                $(this).parent().append('<div style="color:#F73B74;" class="import-validation-error">This is a required field!</div>');
                isValid = false;
            }
        });

        console.log(isValid);

        if(isValid){
            var confirmOver = false;
            if($('.edit-student-markingscheme').attr('data-initial-id') != $('.edit-student-markingscheme').val()){
                confirmOver = confirm("You've changed the assigned marking scheme, any staff assigned to this student will be removed!\nAre you sure you want to continue?");
            }else{
                confirmOver = true;
            }
            if(confirmOver){
                var studentModal = {
                    name : $('.edit-student-name').val(),
                    dip : $('.edit-student-dip').val(),
                    matricno : $('.edit-student-adminno').val(),
                    mschemeassigned : $('.edit-student-markingscheme').val()
                }

                sipGrading.ajaxHelper('student/?studid='+$_GET['studentid'],'PUT',studentModal,function () {
                    window.location = 'index.html?message='+encodeURIComponent("Successfully Updated Student!");
                });
                console.log(studentModal);
            }
        }



    });
});
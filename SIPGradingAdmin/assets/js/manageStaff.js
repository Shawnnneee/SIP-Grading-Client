var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

var editing = false;

$(document).ready(function () {
    if($_GET['staffid']){
        editing = true;
        sipGrading.ajaxHelper('staff/?staffid='+$_GET['staffid'],'GET','',function (data) {

            if(data.name){
                $('.manage-staff-action').text('Editing: '+data.name);
                $('.manage-staff-btn').text('Update Staff');
                $('.manage-staff-name').val(data.name);
                $('.manage-staff-username').val(data.username);
                $('.staff-permissions').find('option').each(function () {
                    if($(this).attr('value') == data.permission){
                        $(this).attr('selected','selected');
                    }
                });

                $('.edit-staff-warning').fadeIn(1000);
                $('.delete-staff').fadeIn(1000);
            }else{
                $('.component-create-container').html('<div class="edit-staff-warning">Staff Could Not Be Found!</div>');
                $('.manage-staff-btn').remove();
            }


        });
    }else{
        $('.manage-staff-action').text('Add New Staff');
        $('.manage-staff-btn').text('Add New Staff');
    }

    $(document).on('click','.delete-staff-btn',function () {
        var c = confirm("Are you sure you want to delete this staff?");
        if(c){
            sipGrading.ajaxHelper('staff?staffid='+$_GET['staffid'],'DELETE','',function () {
                window.location = 'index.html?message='+encodeURIComponent("Successfully Deleted Staff!");
            });
        }
    });

    $(document).on('click','.manage-staff-btn',function () {
       var isValid = true;

        $('.rfs-required-field').each(function () {
            $(this).parent().find('.import-validation-error').remove();
            $(this).removeClass('rfs-forms-input-has-error');
            if($(this).val() == ''){
                $(this).addClass('rfs-forms-input-has-error');
                $(this).parent().append('<div style="color:#F73B74;" class="import-validation-error">This is a required field!</div>');
                isValid = false;
            }
        });

        if($('.manage-staff-password').val() != $('.manage-staff-password-again').val()){
            $('.manage-staff-password-again').addClass('rfs-forms-input-has-error');
            $('.manage-staff-password').addClass('rfs-forms-input-has-error');
            $('.manage-staff-password-again').parent().append('<div style="color:#F73B74;" class="import-validation-error">Passwords do not match!</div>');
            isValid = false;
        }else{
            $('.manage-staff-password-again').removeClass('rfs-forms-input-has-error');
            $('.manage-staff-password').removeClass('rfs-forms-input-has-error');
            $('.manage-staff-password-again').parent().find('.import-validation-error').remove();
        }

        if(isValid){
            var staffModal = {
                username : $('.manage-staff-username').val(),
                name : $('.manage-staff-name').val(),
                permssn : $('.staff-permissions').val(),
                passw :  $('.manage-staff-password').val()
            }

            if(editing){
                sipGrading.ajaxHelper('staff/?staffid='+$_GET['staffid'],'PUT',staffModal,function (){
                    window.location = 'index.html?message='+encodeURIComponent("Successfully Updated Staff!");
                });
            }else{
                sipGrading.ajaxHelper('staff/?staffid='+$_GET['staffid'],'POST',staffModal,function (){
                    window.location = 'index.html?message='+encodeURIComponent("Successfully Crated Staff!");
                });
            }
        }

    });
});
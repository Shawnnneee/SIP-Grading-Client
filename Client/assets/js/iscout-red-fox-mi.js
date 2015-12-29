$(document).ready(function () {
    $(document).on('focus','.rfs-floating-lbl>input',function () {
        $(this).parent().addClass('rfs-fl-active');
    });

    $(document).on('focusout','.rfs-floating-lbl>input',function () {
        if($(this).val() == "") {
            $(this).parent().removeClass('rfs-fl-active');
        }
    });

    $('.rfs-floating-lbl>input').each(function () {
        if($(this).val() != ""){
            $(this).parent().addClass('rfs-fl-active');
        }
    });

    $(document).on('click','.rfs-floating-lbl>label.placeholder',function () {
        $(this).parent().find('input').focus();
    });

    $('.rfs-hb-footer').click(function () {
        if($('.footer-quote').css('display') == "none"){
            $('.footer-quote').fadeIn(200,function(){
                foorterHB();
            });

        }else{
            $('.footer-quote').fadeOut(200,function () {
                foorterHB();
            });

        }
    });

    $(document).on('submit','.rfs-validator', function () {
        var valid = true;

       $('.rfs-required').each(function() {
           if($(this).val() == ""){
               $(this).parent().addClass('rfs-validation-f-error');
               $(this).parent().find(".rfs-validation-error").fadeIn();
               valid = false;
           }else{
               $(this).parent().removeClass('rfs-validation-f-error');
               $(this).parent().find(".rfs-validation-error").fadeOut();
           }
       });

        return valid;
    });
});
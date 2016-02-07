$(document).ready(function () {
   $(document).on('submit','.login-form-elements',function () {

        var username = $('.username').val();
        var password = $('.password').val();
        console.log(username+" "+password);
        if(username && password){
            $('.login-form-elements').fadeOut(300,function () {
                $('.login-loading-container').fadeIn(300,function () {
                    validateLogin(username,password);
                });
            });
        }else{
            //The validation class will handle the error messages
        }

       return false;
    });

    $('.branding-logo').click(function () {
        console.log("Changing");
        $('.login-background-container').css('background-image','url(assets/images/bg.jpg)');
    });
});

function validateLogin(username,password){
    //Simualted login
    var loginEndpoint = "login.ajax.php";
    $.ajax({
        url: loginEndpoint,
        type: "POST",
        data: "username="+username+"&password="+password+"",
        dataType: "JSON",
        success: function (data){
            if(data.success == "true"){
                alert("Login Success!");
            }else{
                $('.login-loading-container').delay(1000).fadeOut(300,function () {
                    $('.login-feedback').css("display","block");
                    $('.login-form-elements').fadeIn(300,function () {

                    });
                });

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


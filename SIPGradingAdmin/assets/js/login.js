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
});

function validateLogin(username,password){
    sipGrading.ajaxHelper('login?input_username='+username+'&input_password='+password,'POST','',function (data){
        if(data){
            sipGrading.ajaxHelper('staff/?username='+username,'GET','',function (data){

                if(data.permission != "admin"){
                    alert("You are not authorised to view this page!");
                    $('.login-loading-container').delay(1000).fadeOut(300, function() {
                        $('.login-form-elements').fadeIn(300, function() {
                        });
                    });
                }else{
                    localStorage.setItem("login_token_admin",sipGrading.base64_encode(JSON.stringify(data)));
                    window.location = 'index.html';
                }

            });
        }else{
            $('.login-loading-container').delay(1000).fadeOut(300, function() {
                $('.login-feedback').css("display", "block");
                $('.login-form-elements').fadeIn(300, function() {
                });
            });
        }
    });
}


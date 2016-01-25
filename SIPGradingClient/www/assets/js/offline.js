$(window).load(function () {
    $(".apiEndPoint").text("API Server: "+config.apiEndPoint());
});

function changeAPIServer(){

    try{
        navigator.notification.prompt('Please enter the URL for the API server',changeAPIServer_,['OK!','Cancel'],config.apiEndPoint());
    }catch(e){
        var a = prompt('Please enter the URL for the API server',config.apiEndPoint());
        changeAPIServer_(a);
    }
}

function changeAPIServer_(a){
    localStorage.setItem('apiEndPoint',a);
    window.location.reload();
}
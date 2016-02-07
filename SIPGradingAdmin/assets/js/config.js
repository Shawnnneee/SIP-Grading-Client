var config = {

    //PagesDefinitions
    loginPage : "login.html",

    apiEndPointDefault : "http://localhost/SIP-Grading-Client/Test-API-Server/api/",
    //apiEndPoint : "http://localhost/SIP-Grading-Client/Test-API-Server/api/"
    apiEndPoint : function(){
        if(localStorage.getItem("apiEndPoint")){
            return localStorage.getItem("apiEndPoint");
        }else{
            localStorage.setItem("apiEndPoint",this.apiEndPointDefault);
            return this.apiEndPointDefault;
        }
    }



}
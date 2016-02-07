var sipGrading = {
    isLogined : function (){
        return true;
    },
    protectPage : function(permission){
        if(this.isLogined()){
            if(permission){
                if(this.getCurrentUserInfo().permissions > parseInt(permission)){
                    window.location = config.loginPage+"?perms=0";
                }
            }
        }else{
            window.location = config.loginPage;
        }
    },
    getCurrentUserInfo : function(){
        return {
            userID : 1,
            permissions : 0,

        }
    },
    ajaxHelper : function ajaxHelper(url, method, data, successCallBack, errorCallBack) {
        var callbackData;
        return $.ajax({
            type: method,
            url: config.apiEndPoint()+url,
            dataType: 'json',
            data: (data ? JSON.stringify(data) : ""),
            //timeout: 5000,
            success : function (returnData){
                callbackData = returnData;
                if(typeof successCallBack != "undefined"){
                    successCallBack(callbackData);
                }else{
                    return callbackData;
                }

            },
            error : function (jqXHR, textStatus, errorThrown){
                console.error(errorThrown);

                if(typeof errorCallBack != "undefined"){
                    errorCallBack(jqXHR, textStatus, errorThrown);
                }else{
                    //window.location = "offline.html";
                    $("html").load("offline.html");
                }
            }
        });
    }
};
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
            permissions : 0
        }
    },
    ajaxHelper : function ajaxHelper(url, method, data, successCallBack) {
        console.log(data);
        console.log("sipGradingObject : ");
        var callbackData;
        return $.ajax({
            type: method,
            url: config.apiEndPoint+url,
            dataType: 'json',
            data: (data ? data : ""),
            success : function (returnData){
                callbackData = returnData;
                if(typeof successCallBack != "undefined"){
                    successCallBack(callbackData);
                }else{
                    return callbackData;
                }
                console.log("sipGradingObject : "+returnData);
            },
            error : function (jqXHR, textStatus, errorThrown){
                console.error(errorThrown);
            }
        });
    }
};
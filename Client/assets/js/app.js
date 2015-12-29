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
    }
};
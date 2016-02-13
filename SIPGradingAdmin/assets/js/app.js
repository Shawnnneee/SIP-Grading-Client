var sipGrading = {
    isLogined : function (){
        if(localStorage.getItem("login_token_admin")){
            return true;
        }else{
            return false;
        }
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
        var info = JSON.parse(this.base64_decode(localStorage.getItem("login_token_admin")));

        return {
            userID : info.staffid,
            permissions : (info.permission == "admin" ? 2 : 1)
        }
    },
    base64_encode : function(string){
        return i_base64_encode(string);
    },
    base64_decode : function(string){
        return i_base64_decode(string);
    },
    ajaxHelper : function ajaxHelper(url, method, data, successCallBack, errorCallBack) {
        var callbackData;
        return $.ajax({
            type: method,
            url: config.apiEndPoint()+url,
            dataType: 'json',
            contentType : 'application/json',
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

var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

function i_base64_encode(input) {
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}

function i_base64_decode(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return unescape(output);
}
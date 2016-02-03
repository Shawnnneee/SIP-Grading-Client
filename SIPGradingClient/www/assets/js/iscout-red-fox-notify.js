var rfs_notify = {

    theme : {
        success : "rfs-notify-success",
        fail : "rfs-notify-fail",
        info : "rfs-notify-info"
    },

    show : function (text,header,theme,progress,icon,timeout){
        var output = "";
        if(!theme){
            theme = this.theme.success;
        }
        output += "<div class=\"rfs-notify-container "+theme+"\">";

        output += "<div class=\"rfs-notify-content\">";

        if(icon){
            output += "<div class=\"rfs-notify-content-left\">";
            output += "<i class=\"fa "+icon+"\"></i>";
            output += "</div>";
            output += "<div class=\"rfs-notify-content-right\">";
        }



        if(header){
            output += "<div class=\"rfs-notify-title\">";
            output += header;
            output += "</div>"
        }

        output += "<div class=\"rfs-notify-text\">";
        output += text;
        output += "</div>";

        if(icon){
            output += "</div>";
        }


        output += "</div>";

        if(progress){
            output += "<div class=\"rfs-notify-progress\"></div>";
        }

        output += "</div>";


        $('body').append(output);

        var notifyObject = $('body').find('.rfs-notify-container');
        notifyObject.css('opacity','0');
        notifyObject.css('display','block');
        var left = ($(window).width() - notifyObject.width())/2;

        notifyObject.css('left',left+"px");
        notifyObject.addClass('rfs-notify-animator');
        notifyObject.css('opacity','0.9');

        if(!timeout){
            timeout = 5000;
        }

        setTimeout(function () {
            notifyObject.css('opacity','0');

            setTimeout(function () {
                notifyObject.remove();
            },501)

        },timeout);

        console.log("[RFS-NOTIFY] Created Object!");
    }
};

$(document).ready(function () {
});
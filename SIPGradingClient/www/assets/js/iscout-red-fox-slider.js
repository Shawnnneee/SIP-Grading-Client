/*iScout Extension for noUISlider*/
/*Automatic conversion of .rfs-forms-slider to a noUISlider object and creation of event listeners*/
$(document).ready(function (){
    iscout_red_fox_slider();
    $(document).on('click','.rfs-forms-slider-values-current-value',function () {
        var currentVal = $(this).text();
        var thisWidth = $(this).find('.rfs-forms-slider-values-current-value').width()+4;
        var oneCharacterWidth = (thisWidth/($(this).text().length + 1)) + 1;

        if(!$(this).parent().attr('data-is-editing')){
            $(this).parent().html("<input class=\"rfs-forms-slider-values-current-value-editor\" value=\""+currentVal+"\" type=\"number\" width=\""+thisWidth+"px\"data-charWidth=\""+oneCharacterWidth+"\"/>");
            $(document).find('.rfs-forms-slider-values-current-value-editor').focus();
            //console.log($(this).find('.rfs-forms-slider-values-current-value-editor'));
            $(this).parent().attr('data-is-editing','true');
        }

    });

    $(document).on('keyup','.rfs-forms-slider-values-current-value-editor',function () {
        var newWidth = parseInt($(this).attr('data-charWidth'))*$(this).val().length;
        $(this).css('width',newWidth+"px");
    });

    $(document).on('focusout','.rfs-forms-slider-values-current-value-editor',function () {

        /*Validation*/
        var validationPass = true;
        var value = $(this).val();
        var valueTestUnit = new RegExp('^\\d+$');
        $('.rfs-forms-slider-values-current-value-editor-error-desc').remove();
        if(!valueTestUnit.test(value)){
            $(this).parent().append("<div class=\"rfs-forms-slider-values-current-value-editor-error-desc\">Please enter a whole number!</div>");
            validationPass = false;
            $(this).focus();
        }else{
            value = parseInt(value);
            var min = parseInt($(this).parent().parent().parent().find('.rfs-forms-slider').attr('data-min'));
            var max = parseInt($(this).parent().parent().parent().find('.rfs-forms-slider').attr('data-max'));
            console.log("Min: "+min);
            console.log("Max: "+max);
            console.log("Value: "+value);
            if(value<min || value>max){
                $(this).parent().append("<div class=\"rfs-forms-slider-values-current-value-editor-error-desc\">Number out of range!</div>");
                validationPass = false;
                $(this).focus();
            }
        }

        if(validationPass){
            var sliderID = document.getElementById($(this).parent().parent().parent().find('.rfs-forms-slider').attr('id'));
            sliderID.noUiSlider.set(value);
            $(this).parent().removeAttr('data-is-editing');
            $(this).parent().html("<span class=\"rfs-forms-slider-values-current-value\">"+value+"</span>");
        }

    });
});

function iscout_red_fox_slider(){
    var sliderCount = 0;
    $('.rfs-forms-slider').each(function () {
        //Checks if the element has a unique ID if not assign one
        if(!$(this).attr('id')){
            $(this).attr('id','rfs-forms-slider-id-'+sliderCount);
        }

        //Checks if the min and max of the element exists if not assign one

        if(!$(this).attr('data-max')){
            $(this).attr('data-max','100');
        }

        if(!$(this).attr('data-min')){
            $(this).attr('data-min','0');
        }

        if(!$(this).attr('data-initial')){
            $(this).attr('data-initial',$(this).attr('data-min'))
        }

        //Creates the noSlider object
        var tmp = document.getElementById($(this).attr('id'));

        if(tmp.noUiSlider){
            tmp.noUiSlider = null;
        }

        noUiSlider.create(tmp,{
            start : parseInt($(this).attr('data-initial')),
            behaviour : 'tap',
            step : 1,
            range : {
                'min' : parseInt($(this).attr('data-min')),
                'max' : parseInt($(this).attr('data-max'))
            }
        });

        var thisID = $(this).attr('id');

        //AddEventListener for value change
        tmp.noUiSlider.on('update',function (v,h) {
            iscout_red_fox_slider_change(thisID,v);
        });

        //Add the ranges

        var sliderRange = "<div class=\"rfs-forms-slider-values\">";
        sliderRange += "<div class=\"rfs-forms-slider-values-min\">"+$(this).attr('data-min')+"</div>";
        sliderRange += "<div class=\"rfs-forms-slider-values-max\">"+$(this).attr('data-max')+"</div>";
        sliderRange += "<div class=\"rfs-forms-slider-values-current\"><span class=\"rfs-forms-slider-values-current-value\">"+$(this).attr('data-initial')+"</span></div>";
        sliderRange += "</div>";

        $(this).parent().append(sliderRange);

        sliderCount++;
    });
}

function iscout_red_fox_slider_change(target,value){
    //var this_  = document.getElementById(target);


    var sliderTransitionColor = {
        from : {
            red : 209,
            green : 13,
            blue : 117
        },
        to : {
            red : 0,
            green : 197,
            blue : 135
        }
    };

    var currentPercentage = (value/(parseInt($("#"+target).attr('data-max')) - parseInt($("#"+target).attr('data-min'))) );

    var changeSlider = {
        red : calculateFinalColor(sliderTransitionColor.from.red, sliderTransitionColor.to.red,currentPercentage) ,
        green : calculateFinalColor(sliderTransitionColor.from.green, sliderTransitionColor.to.green,currentPercentage),
        blue :  calculateFinalColor(sliderTransitionColor.from.blue, sliderTransitionColor.to.blue,currentPercentage)
    };

    function calculateFinalColor(from,to,percentage){
        var value = 0;
        if(from>to){
            value = from - ((from - to)*percentage);
        }else{
            value = from + ((to - from)*percentage);
        }
        return value;
    }

    var parsedSlider = 'rgba('+parseInt(changeSlider.red)+','+parseInt(changeSlider.green)+','+parseInt(changeSlider.blue)+',1)';
    console.log(parsedSlider);
    $('#'+target).find('.noUi-handle').css('background-color',parsedSlider);

    var valueTrimmed = value.toString().split('.')[0];
    $(this).parent().removeAttr('data-is-editing');
    $("#"+target).parent().find('.rfs-forms-slider-values-current').html("<span class=\"rfs-forms-slider-values-current-value\">"+valueTrimmed+"</span>");
}
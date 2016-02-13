(function ($){
    "use strict";
    $.fn.rfs_autocomplete = function (options){
        var settings = $.extend({
            minKeyTrigger : 3,
            maxHeight : "200px",
            dataSource : [],
            dataSourceCustomValues : false,
            ignoreCase : false,
            onUserSelectOption : undefined
        },options);

        var _this = $(this);
        var autoCompleteActive = false;
        var autocompleteID = "";
        var binded = false;

        var dataSourceModal = {
            Name : "",
            Value : ""
        };

        bindAutocompleteToInput();

        $(window).resize(function () {
            alignAutocomplete();
        });

        //Add event listener bindings
        if(binded){

            $(document).on('keyup','.rfs-autocomplete-bind-id-'+autocompleteID,function () {
                checkAutocomplete();
            });

            $(document).on('focusin','.rfs-autocomplete-bind-id-'+autocompleteID,function () {
                checkAutocomplete();
                log("Focused");
            });

            $(document).on('click','.rfs-autocomplete-id-'+autocompleteID+' .rfs-autocomplete-results li',function () {
                autocompleteOptionClicked(this);
                //log("Clicked");
            });

            $(document).on('focusout','.rfs-autocomplete-bind-id-'+autocompleteID,function () {
                setTimeout(function () {destroyAutoComplete()},30);
                log("Focus out");
            });
        }

        function autocompleteOptionClicked(target){
            console.log(target);
            target = {
                Name : $(target).attr('data-name'),
                Value : $(target).attr('data-value')
            }
            if(settings.onUserSelectOption){
                settings.onUserSelectOption(target,autocompleteID);
            }else{
                $('.rfs-autocomplete-bind-id-'+autocompleteID).val(target.Value);
            }
        }

        function checkAutocomplete(){
            if(_this.val().length >= settings.minKeyTrigger){
                if(!autoCompleteActive){
                    createAutoCompleteNode();
                }
                populateDataSource();
            }else{
                destroyAutoComplete();
            }
        }

        function bindAutocompleteToInput(){
            autocompleteID = generateAutocompleteID();
            _this.addClass("rfs-autocomplete-target");
            _this.addClass("rfs-autocomplete-bind-id-"+autocompleteID);
            _this.attr("data-rfs-autocomplete-id",autocompleteID);
            binded = true;
        }


        function populateDataSource(){
            var dataSource = parseDataSource(settings.dataSource);

            //console.log(dataSource);

            $('.rfs-autocomplete-id-'+autocompleteID).find('.rfs-autocomplete-results').find('li').remove();

            var inputValue = $(".rfs-autocomplete-bind-id-"+autocompleteID).val();

            for(var x = 0; x<dataSource.length; x++){
               // log("Check: "+dataSource[x].Name+", Value:"+inputValue+", Result:"+dataSource[x].Name.indexOf(inputValue));

               if(settings.ignoreCase){
                   if((dataSource[x].Name.toLowerCase().indexOf(inputValue.toLowerCase()) != -1)){
                       $('.rfs-autocomplete-id-'+autocompleteID).find('.rfs-autocomplete-results').append("<li data-value=\""+dataSource[x].Value+"\" data-name=\""+dataSource[x].Name+"\">"+dataSource[x].Name+"</li>");
                   }
               }else{
                   if((dataSource[x].Name.indexOf(inputValue) != -1)){
                       $('.rfs-autocomplete-id-'+autocompleteID).find('.rfs-autocomplete-results').append("<li data-value=\""+dataSource[x].Value+"\" data-name=\""+dataSource[x].Name+"\">"+dataSource[x].Name+"</li>");
                   }
               }


            }
        }

        function parseDataSource(dataSource){
            if(settings.dataSourceCustomValues){
                return dataSource;
            }else{
                var dataSourceParsed = [];
                for(var x = 0; x<dataSource.length; x++){
                    var tmp = Object.create(dataSourceModal);
                    tmp.Name = dataSource[x];
                    tmp.Value = dataSource[x];
                    dataSourceParsed.push(tmp);
                }
                return dataSourceParsed;
            }
        }

        function destroyAutoComplete(){
            if(autoCompleteActive){
                $('.rfs-autocomplete-id-'+autocompleteID).remove();
            }

            autoCompleteActive = false;
        }

        function generateAutocompleteID(){
            var unique = false;
            var autoCompleteID_ = 0;

            while(!unique){
                if($('body').find('.rfs-autocomplete-bind-id-'+autoCompleteID_).length == 0){
                    unique = true;
                }else{
                    autoCompleteID_++;
                    unique = false;
                }
            }
            log("Generated ID: rfs-autocomplete-id-"+autoCompleteID_)
            return autoCompleteID_;
        }

        function createAutoCompleteNode(){
            //autocompleteID = generateAutocompleteID();
            var autoCompleteOuter = document.createElement('div');
            var autoCompleteResults = document.createElement('ul');
            $(autoCompleteResults).addClass('rfs-autocomplete-results');
            $(autoCompleteOuter).addClass('rfs-autocomplete-id-'+autocompleteID);
            $(autoCompleteOuter).addClass('rfs-autocomplete');
            $(autoCompleteOuter).append(autoCompleteResults);
            _this.parent().append(autoCompleteOuter);
            alignAutocomplete();
            autoCompleteActive = true;
        }

        function alignAutocomplete(){
            $('.rfs-autocomplete').css('top',_this.position().top + _this.outerHeight()+"px");
            $('.rfs-autocomplete').css('left',_this.position().left+"px");
            $('.rfs-autocomplete').css('width',_this.width()+"px");
            $('.rfs-autocomplete').css('max-height',settings.maxHeight);
        }

        function log(message){
            console.log("[RFS-AUTOCOMPLETE] ID "+autocompleteID+": "+message);
        }

        return this;
    }
}(jQuery));
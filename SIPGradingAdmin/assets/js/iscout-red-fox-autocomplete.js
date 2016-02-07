(function ($){
    $.fn.rfs_autocomplete = function (options){
        var settings = $.extend({
            minKeyTrigger : 3,
            maxHeight : "200px",
            dataSource : [],
            dataSourceCustomValues : false
        },options);

        var _this = $(this);
        var autoCompleteActive = false;
        var autocompleteID = "";
        var dataSourceModal = {
            Name : "",
            Value : ""
        }

        $(window).resize(function () {
            alignAutocomplete();
        });

        //Add event listener bindings
        $(document).on('keyup',_this,function () {
            checkAutocomplete();
        });

        $(document).on('focusin',_this,function () {
            checkAutocomplete();
            console.log("Focused");
        })

        $(document).on('focusout',_this,function () {
            destroyAutoComplete();
        })

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

        function populateDataSource(){

            /*
            * customDataSource : {
            *   [
            *       {
            *           Name : "",
            *           Value : ""
            *       },
            *       {
            *           Name : "",
            *           Value : ""
            *       }
            *   ]
            * }
            * */

            var dataSource = parseDataSource(settings.dataSource);

            console.log(dataSource);

            /*for(var x = 0; x<dataSource.length; x++){

            }*/
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
                var autocompleteParsed = "."+autocompleteID;
                $(autocompleteParsed).remove();
            }

            autoCompleteActive = false;
        }

        function generateAutocompleteID(){
            var unique = false;
            var autoCompleteID_ = 0;

            while(!unique){
                if($('body').find('.rfs-autocomplete-id-'+autoCompleteID_).length == 0){
                    unique = true;
                }else{
                    autoCompleteID_++;
                    unique = false;
                }
            }
            console.log("Generated ID: rfs-autocomplete-id-"+autoCompleteID_)
            return "rfs-autocomplete-id-"+autoCompleteID_;
        }

        function createAutoCompleteNode(){
            autocompleteID = generateAutocompleteID();
            var autoCompleteOuter = document.createElement('div');
            var autoCompleteResults = document.createElement('ul');
            $(autoCompleteResults).addClass('rfs-autocomplete-results');
            $(autoCompleteOuter).addClass(autocompleteID);
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


        return this;
    }
}(jQuery));
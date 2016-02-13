var typeTableRow = $('.import-type-body').html();
var studentInfoModal = {
    name : "",
    dip : "",
    matricno : "",
    mschemeassigned : 0
}

$(document).ready(function () {

    typeTableRow = $('.import-type-body').html();

    document.getElementById("import-student-upload").addEventListener('change',uploadHandle,false);

    sipGrading.ajaxHelper('markingscheme','GET','',function (data) {
        $('.marking-scheme-select').html('');

        for(var x = 0; x<data.length; x++){
            var optionTmp = "";
            optionTmp = "<option value=\""+data[x].mschemeid+"\">"+data[x].name+", Created By: "+data[x].createdby+"</option>";
            $('.marking-scheme-select').append(optionTmp);
        }

        $('.marking-scheme-select').removeAttr('disabled');
    });

    $(document).on('click','.input-type-add-student',function () {
        addStudentRow();
    });

    $(document).on('click','.import-type',function () {
        $('.import-select-method').css('display','none');
        $('.import-type-container').slideDown(1000);
    });

    $(document).on('click','.import-student-submit',function () {
        var isValid = true;
        $('.rfs-required-field').each(function () {
            $(this).parent().find('.import-validation-error').remove();
            if($(this).val() == ''){
                $(this).parent().append('<div style="color:#F73B74;" class="import-validation-error">This is a required field!</div>');
                isValid = false;
            }
        });

        if(isValid){
            $('.import-student-submit').attr('disabled','disabled');
            var students = [];
            $('.import-type-single').each(function () {
                var studentTmp = Object.create(studentInfoModal);
                studentTmp.name = $(this).find('.student-name').val();
                studentTmp.dip = $(this).find('.student-dip').val();
                studentTmp.matricno = $(this).find('.student-adminno').val();
                studentTmp.mschemeassigned = parseInt($('.marking-scheme-select').val())
                students.push(studentTmp);
            });

            if(students.length == 0){
                rfs_notify.show('Please add at least 1 student!','Validation errors has occurred!',rfs_notify.theme.fail);
            }else{
                sipGrading.ajaxHelper('student','POST',students,function (data) {
                    window.location = 'index.html?message='+encodeURIComponent("Successfully Imported Students!");
                });
            }

        }else{
            rfs_notify.show('Please fix the validation errors before continuing','Validation errors has occurred!',rfs_notify.theme.fail);
        }
    });

    $(document).on('click','.import-type-student-delete',function () {
        $(this).parent().parent().remove();
    });

    $(document).on('click','.import-upload',function () {
        $('#import-student-upload').click();
    });

    /*$('.student-dip').rfs_autocomplete({
        dataSource: ['Information Technology','Digital Forensics']
    });*/
});

function addStudentRow(name,dip,adminno){
    var tableTmp = $(typeTableRow);

    tableTmp.find('.student-name').val(name);
    tableTmp.find('.student-dip').val(dip);
    tableTmp.find('.student-adminno').val(adminno);

    $('.import-type-body').append(tableTmp);
}

function uploadHandle(evt){
    var f = evt.target.files;
    if(f){
        f = f[0];
        var fr = new FileReader();
        fr.onload = function (e){
            var text = e.target.result;
            parseImportStudent(parseCSV(text));
        };
        fr.readAsText(f);
    }
}

function parseImportStudent(studentData){
    $('.import-type-body').html('');
    for(var x = 0; x<studentData.length; x++){
        try{
            addStudentRow(studentData[x][0],studentData[x][1],studentData[x][2]);
        }catch(e){
            alert("Uploaded file is not of the correct format!");
        }
    }
    $('.import-select-method').css('display','none');
    $('.import-type-container').slideDown(1000);

}

function parseCSV(csv){
    var csvReturn = [];
    var lines = csv.split('\n');
    for(var x = 0; x<lines.length; x++){
        csvReturn.push(parseCSVLine(lines[x]));
    }
    return csvReturn;
}

function parseCSVLine(row){
    var insideQuote = false;
    var entries = [];
    var entry = [];

    row.split('').forEach(function (character) {
        if(character === '"') {
            insideQuote = !insideQuote;
        } else {
            if(character == "," && !insideQuote) {
                entries.push(entry.join(''));
                entry = [];
            } else {
                entry.push(character);
            }
        }
    });
    entries.push(entry.join(''));
    return entries;
}
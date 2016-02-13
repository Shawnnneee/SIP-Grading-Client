var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

$(document).ready(function () {
    if($_GET['message']){
        rfs_notify.show($_GET['message'],'',rfs_notify.theme.success);
    }
    sipGrading.protectPage(2);
    sipGrading.ajaxHelper('student','GET','',function (data) {
        for(var x = 0; x<data.length; x++){
            var o = "";
            o += '<div class="list-view-container lv-bordered" data-marking-scheme-id="'+data[x].markingScheme.mschemeid+'">';

            o += '<div class="lv-header lv-header-fixed">';
            o += '<div class="lv-title">';
            o += data[x].markingScheme.name;
            o += " <small>(Created By: "+data[x].markingScheme.createdby+")</small>";
            o += '<div class="lv-side-menu">';
            o += '<button class="lv-side-button" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></button>';
            o += "<ul class=\"dropdown-menu\" style=\"position:relative; z-index:9999;left:50px;top:28px;\">";
            o += "<li><a href=\"#\" class=\"view-results-marking-scheme\">View All Results in Marking Scheme</a></li>";
            o += "</ul>";
            o += '</div>';
            o += '</div>';
            o += '</div>';

            o += '<div class="lv-main-container">';

            for(var y = 0; y<data[x].students.length; y++){
                o += '<div class="lv-item list-student-single" data-student-id="'+data[x].students[y].studid+'">';
                o += '<div class="lv-item-content">';

                o += '<div class="lv-item-title-nowrap lv-title-larger">';
                o += data[x].students[y].name;
                o += '</div>';

                o += '<ul class="lv-meta">';
                o += '<li>Diploma: '+data[x].students[y].dip+'</li>';
                o += '<li>Admission Number: '+data[x].students[y].matricno+'</li>';
                o += '</ul>';

                o += '<div class="lv-item-menu">';
                o += '<a href="#" title="Edit Student" class="edit-student-menu" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>';
                o += "<ul class=\"dropdown-menu\" style=\"top: 35px;right: 0;left:inherit;\">";
                o += "<li><a href=\"#\" class=\"edit-student-btn\">Edit Student Details</a></li>";
                o += "<li><a href=\"#\" class=\"edit-assignment-btn\">Marking Scheme Details</a></li>";
                o += "<li><a href=\"#\" class=\"edit-view-results\">View Results</a></li>";
                o += "</ul>";
                o += '</div>';

                o += '</div>';
                o += '</div>';
            }

            o += '</div>';

            o += '</div>';

            $('.list-student-container').append(o);
        }
    });

    $(document).on('click','.edit-student-btn',function (){
        window.location = 'EditStudent.html?studentid='+$(this).parent().parent().parent().parent().parent().attr('data-student-id');
    });

    $(document).on('click','.edit-view-results',function (){
        window.location = 'ViewResults.html?studentId='+$(this).parent().parent().parent().parent().parent().attr('data-student-id');
    });

    $(document).on('click','.view-results-marking-scheme',function (){
        window.location = 'ViewResults.html?markingSchemeId='+$(this).parent().parent().parent().parent().parent().parent().attr('data-marking-scheme-id');
    });

    $(document).on('click','.edit-assignment-btn',function () {

        window.location = 'AssignStaffToAssessment.html?studentid='+$(this).parent().parent().parent().parent().parent().attr('data-student-id');

    });
});
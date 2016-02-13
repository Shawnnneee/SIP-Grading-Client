var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}


$(document).ready(function () {
    if($_GET['studentId']){
        sipGrading.ajaxHelper('assessmentExport?studentId='+$_GET['studentId'],'GET','',function (data) {
            if(data){
                generateResultsReport(data);

            }else{
                $('.results-container').html('<div class="edit-staff-warning">Student Could Not Not Be Found!</div>');
            }
        });
    }else if($_GET['markingSchemeId']){
        sipGrading.ajaxHelper('assessmentExport?markingSchemeId='+$_GET['markingSchemeId'],'GET','',function (data) {
            if(data){
                generateResultsReport(data);

            }else{
                $('.results-container').html('<div class="edit-staff-warning">Marking Scheme Could Not Be Found!</div>');
            }
        });
    }else{
            sipGrading.ajaxHelper('assessmentExport','GET','',function (data) {
            if(data){
                generateResultsReport(data);

            }else{

            }
        })
    }
});

function generateResultsReport(dataInput){
    for(var z = 0; z<dataInput.length; z++){

        var data = dataInput[z];

        var o = '';
        o += '<div class="results-container-single">';

        o += '<div class="results-container-student-info">';
        o += '<table>';
        o += '<tr>';
        o += '<td>Name</td>';
        o += '<td>'+data.name+'</td>';
        o += '</tr>';
        o += '<tr>';
        o += '<td>Diploma</td>';
        o += '<td>'+data.diploma+'</td>';
        o += '</tr>';
        o += '<tr>';
        o += '<td>Admission Number</td>';
        o += '<td>'+data.admissionNo+'</td>';
        o += '</tr>';
        o += '<tr>';
        o += '<td>Assigned Marking Scheme</td>';
        o += '<td>'+data.markingScheme.name+' (Created By: '+data.markingScheme.createdBy+')</td>';
        o += '</tr>';
        o += '</table>';
        o += '</div>';

        o += '<div class="results-components-container">';
        o += '<div class="header">Results</div>'
        for(var x = 0; x<data.markingScheme.components.length; x++){
            var component = data.markingScheme.components[x];

            var cs = '';
            cs += '<div class="results-components-single">';

            cs += '<div class="component-title">';
            cs += component.Id+". "+component.Name+" ["+component.Weightage+"%]";
            cs += '</div>';

            cs += '<div class="component-description">';
            cs += component.Description;
            cs += '</div>';

            cs += '<div class="results-average">Average: <span class="result-average-number">[{Average-Text}]</span></div>';

            var totalScore = 0;
            var totalSubmittedStaff = 0;

            for(var y = 0; y<component.results.length; y++){
                var result = component.results[y];

                cs += '<div class="scores-container">';

                cs += '<table>';
                cs += '<tr class="scores-header">';
                cs += '<td class="scores-staff-name">'+result.staffName+'</td>';

                if(result.submitted){
                    cs += '<td>Score '+result.score+'/'+component.Max+'</td>';
                    totalScore += result.score
                    totalSubmittedStaff++;
                }else{
                    cs += '<td><span class="score-not-submitted"></span></td>';
                }

                cs += '</tr>';

                cs += '<tr class="scores-remarks">';
                cs += '<td colspan="2">';

                if(result.submitted){
                    if(result.remarks != ""){
                        cs += result.remarks;
                    }else{
                        cs += '<i>No Remarks</i>';
                    }
                }else{
                    cs += '<span class="score-not-submitted"></span>';
                }

                cs += '</td>';
                cs += '</tr>';

                cs += '</table>';

                cs += '</div>';
            }

            cs += '</div>';

            var aveText = "";

            if(totalSubmittedStaff != 0){
                aveText = (totalScore/totalSubmittedStaff)+"/"+component.Max;
            }else{
                aveText = "0/"+component.Max;
            }
            cs = cs.replace('[{Average-Text}]',aveText);

            o += cs;
        }
        o += '</div>';

        o += '</div>';

        $('.results-container').append(o);
    }

}
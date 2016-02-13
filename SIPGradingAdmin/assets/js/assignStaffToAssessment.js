var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}
var staffList = [];
var assignmentPrevObject = [];

$(document).ready(function () {

    if($_GET['studentid']){
        console.log($_GET['studentid']);
        sipGrading.ajaxHelper('staff','GET','',function(data){
            staffList = data;
            sipGrading.ajaxHelper('assignment/?studentid='+$_GET['studentid'],'GET','',function(data){

                if(data.student.name){
                    $('.assessment-assignment-studentName').val(data.student.name);
                    $('.assessment-assignment-msname').val(data.markingScheme.name);
                    assignmentPrevObject = data;
                    var components = data.markingScheme.components;
                    for(var x = 0; x<components.length; x++){
                        var component = components[x];
                        var o = "";

                        o += "<div class=\"assessment-scheme-create-container assignment-single assessment-assign-"+component.Id+"\" data-component-id=\""+component.Id+"\">";
                        o += "<div class=\"assessment-component-container\">";

                        o += "<div class=\"rfs-input-lg-gp\">";

                        o += "<div class=\"rfs-input-lg-gp-input-lg\">";
                        o += component.Name;
                        o += " ["+component.Weightage+"%]";
                        o += "</div>";

                        o += "</div>";

                        o += "<div class=\"rfs-input-gp\">";
                        o += component.Description;
                        o += "</div>";

                        o += "<div class=\"assessment-component-assigned\">";
                        o += "Currently assigned to this component";
                        o += "<ul>";
                        o += "</ul>"
                        o += "</div>";

                        o += "<div class=\"rfs-input-gp\">";
                        o += "<input type=\"text\" class=\"rfs-forms-input rfs-required-field staff-name component-staff-"+component.Id+"\" placeholder=\"Start Typing a Staff Name\"/>";
                        o += "</div>";


                        o += "</div>";
                        o += "</div>";

                        $('.assessment-assignment-container').append(o);

                        //Parse the staffList
                        var dataSet = [];
                        for(var y = 0; y<staffList.length; y++){
                            dataSet.push({Name : staffList[y].name, Value : staffList[y].staffid});
                        }
                        console.log(dataSet);
                        $(".component-staff-"+component.Id).rfs_autocomplete({
                            dataSource : dataSet,
                            dataSourceCustomValues : true,
                            ignoreCase : true,
                            minKeyTrigger : 0,
                            onUserSelectOption : function(a,b){
                                addStaffAssessment(a,b);
                            }
                        });
                    }

                    var staffAssigned = data.staffAssigned;

                    //Display the staff assigned
                    for(var x = 0; x<staffAssigned.length; x++){
                        var staffName = getStaffById(staffAssigned[x].staffID);
                        for(var y = 0; y<staffAssigned[x].componentID.length; y++){
                            $('.assessment-assign-'+staffAssigned[x].componentID[y]).find('.assessment-component-assigned ul').append('<li data-staff-id="'+staffName.id+'">'+staffName.name+' <small class="assignment-staff-delete"></small></li>');
                        }
                    }
                }else{
                    $('.err-show').html('<div class="edit-staff-warning">Student Could Not Be Found!</div>');
                    $('.submit-assessment-submit').remove();
                    $('.assessment-component-maste').remove();
                }

            });
        });

        $(document).on('click','.assignment-staff-delete',function () {
            $(this).parent().remove();
        });

        $(document).on('click','.submit-assessment-submit',function () {
            var assignmentCompiled = [];

            var listOfAllStaff = [];

            $('.assignment-single').each(function () {
                var staffIDs = [];
                $(this).find('ul li').each(function () {
                    staffIDs.push($(this).attr('data-staff-id'));
                    listOfAllStaff.push($(this).attr('data-staff-id'));
                });
                assignmentCompiled.push({
                    componentID : $(this).attr('data-component-id'),
                    assignedStaffs : staffIDs
                });
            });

            var listOfUniqueStaff = [];

            for(var x = 0; x<listOfAllStaff.length; x++){
                if(listOfUniqueStaff.indexOf(listOfAllStaff[x]) == -1){
                    listOfUniqueStaff.push(listOfAllStaff[x]);
                }
            }

            var assignmentByStaff = [];

            for(var x = 0; x<listOfUniqueStaff.length; x++){
                var assignedToStaff = [];
                for(var y = 0; y<assignmentCompiled.length; y++){
                    if(assignmentCompiled[y].assignedStaffs.indexOf(listOfUniqueStaff[x]) != -1){
                        assignedToStaff.push(assignmentCompiled[y].componentID);
                    }
                }
                assignmentByStaff.push({
                    staffId : listOfUniqueStaff[x],
                    componentsAssigned : assignedToStaff.join(',')
                });
            }

            var ajaxObject = {
                studentId : assignmentPrevObject.student.studid,
                markingschemeId : parseInt(assignmentPrevObject.student.mschemeassigned),
                assignedStaff : assignmentByStaff
            };

            console.log(ajaxObject);

            var cfm = confirm("If a staff is reassigned, and they have already submitted their assessment, it will be deleted!\nAre you sure you want to continue?");

            if(cfm){
                sipGrading.ajaxHelper('assignment','POST',ajaxObject,function (data) {
                    window.location = 'index.html?message='+encodeURIComponent("Updated Assignment!");
                });
            }


        });
    }else{
        $('.rfs-page-single-paper-container').html('<div class="edit-staff-warning">Invalid Student ID!</div>');
    }
});

function addStaffAssessment(value,autocompleteID){
    console.log("Value: "+value.Name+", autocompleteID: "+autocompleteID+"");
    var unique = true;
    $('.rfs-autocomplete-bind-id-'+autocompleteID).parent().parent().find('.assessment-component-assigned ul li').each(function () {
        if($(this).attr('data-staff-id') == value.Value){
            rfs_notify.show(''+value.Name+" is already assigned to this component!","Error Assigning Staff!",rfs_notify.theme.fail);
            unique = false;
        }
    });
    if(unique){
        $('.rfs-autocomplete-bind-id-'+autocompleteID).parent().parent().find('.assessment-component-assigned ul').append('<li data-staff-id="'+value.Value+'">'+value.Name+'<small class="assignment-staff-delete"></small></li>');
    }

    $('.rfs-autocomplete-bind-id-'+autocompleteID).val('');
}

function getStaffById(id){
    for(var x = 0; x<staffList.length; x++){
        if(staffList[x].staffid == id){
            return {id : staffList[x].staffid, name : staffList[x].name};
            break;
        }
    }
}
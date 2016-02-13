$(document).ready(function () {
    sipGrading.ajaxHelper('staff','GET','',function (data) {
            var o = "";
            o += '<div class="list-view-container lv-bordered">';

            o += '<div class="lv-header lv-header-fixed">';
            o += '<div class="lv-title">';
            o += 'Click on a staff to edit (including passwords)'
            o += '</div>';
            o += '</div>';

            o += '<div class="lv-main-container">';

            for(var y = 0; y<data.length; y++){
                o += '<div class="lv-item list-staff-single" data-staff-id="'+data[y].staffid+'">';
                o += '<div class="lv-item-content">';

                o += '<div class="lv-item-title-nowrap lv-title-larger">';
                o += data[y].name;
                o += '</div>';

                o += '<ul class="lv-meta">';
                o += '<li>Username: '+data[y].username+'</li>';
                o += '<li>User Type: '+data[y].permission+'</li>';
                o += '</ul>';

                o += '</div>';
                o += '</div>';
            }

            o += '</div>';

            o += '</div>';

            $('.list-staff-container').append(o);

    });

    $(document).on('click','.list-staff-single',function () {
        window.location = 'ManageStaff.html?staffid='+$(this).attr('data-staff-id');
    });
});
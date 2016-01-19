$(document).ready(function () {
    $(document).on('click','.rfs-drawer-button',function () {

        $('.rfs-overlay-menu-blinds').fadeIn(200,function () {
            $('.rfs-overlay-menu').css('left','0');
            $('.rfs-overlay-menu-hot-spot').css('display','block');
            $('.rfs-overlay-menu-hot-spot').css('left',$('.rfs-overlay-menu').width()+"px");
        });
    });

    $(document).on('click','.rfs-overlay-menu-hot-spot',function () {
        $('.rfs-overlay-menu').css('left','-1000px');
        $('.rfs-overlay-menu-blinds').fadeOut(200,function () {
            $('.rfs-overlay-menu-hot-spot').css('display','none');
        });
    });
});
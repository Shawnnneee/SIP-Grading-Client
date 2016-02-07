$(document).ready(function () {
    centerTop('.login-container');
    fullHeight();
    foorterHB();
    FastClick.attach(document.body);

    var initial = $('.sip-g-menu-header').text();
    $('.sip-g-menu-header').click(function () {
        if($('.sip-g-menu-header').text() == initial){
            $('.sip-g-menu-header').fadeOut(100,function () {
                $('.sip-g-menu-header').text('No Day But Today!');
                $('.sip-g-menu-header').fadeIn(100);
            });

        }else{
            $('.sip-g-menu-header').fadeOut(100,function () {
                $('.sip-g-menu-header').text(initial);
                $('.sip-g-menu-header').fadeIn(100);
            });
        }
    });
});

$(window).resize(function () {
    centerTop('.login-container');
    fullHeight();
    foorterHB();
});

function centerTop(elm) {
    $(elm).css('top', (($(window).height() - $(elm).height()) / 2) + 'px');
    $(elm).css('left', (($(window).width() - $(elm).width()) / 2) + 'px');
}

function fullHeight(){
    $('.full-height').css('min-height', $(window).height() + 'px');
}

function foorterHB(){
    $('.rfs-hb-footer').css('top',($(document).height() - $('.rfs-hb-footer').height())+"px");
}
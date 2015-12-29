$(document).ready(function () {
    centerTop('.login-container');
    fullHeight();
    foorterHB();
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
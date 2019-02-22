$('.js_to-top').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});


var scrollPos = 0;

$(window).on('scroll', function(){
    var st = $(this).scrollTop();
    if (st < 1000){
        $('.js_to-top ').removeClass('show');
    } else {
        $('.js_to-top ').addClass('show');
    }
    scrollPos = st;
});
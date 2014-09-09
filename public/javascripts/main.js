require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'jquery',
    }
})
define(['jquery','../javascripts/header'], function($){
    // JavaScript Document

    //prettyPhoto

    $("a[rel^='prettyPhoto']").prettyPhoto();
    
    //Portfolio item
    $('.item-block').hover(function() {
        $(this).css({
            background: '#f8f8f8'
        });
        $(this).find('.zoom').animate({
            left: "+=130px"
        },
        {
            duration: 300,
            specialEasing: {
                width: 'easeOutExpo'
            }
        });

        $(this).find('.link').animate({
            right: "+=130px"
        },
        {
            duration: 300,
            specialEasing: {
                width: 'easeOutExpo'
            }
        });

    },
    function() {
        $(this).css({
            background: 'none'
        });
        $(this).find('.zoom').animate({
            left: "-70px"
        },
        {
            duration: 300,
            specialEasing: {
                width: 'easeOutExpo'
            }
        });

        $(this).find('.link').animate({
            right: "-70px"
        },
        {
            duration: 300,
            specialEasing: {
                width: 'easeOutExpo'
            }
        });

        return false;
    });
     // Carousel plugin
    
    $('.testimonialswrap').carousel({
                slider: '#testimonials',
                slide: '.testimonials-slide',
                nextSlide : '.next-l',
                prevSlide : '.prev-l',
                addNav : false
            });


})


require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'jquery',
        'handlebars' : 'handlebars-v1.3.0'
    },
    shim : {
        handlebars  : {
            exports : "Handlebars" 
        }
    }
})
define(['jquery','handlebars'], function($, Handlebars){
    // JavaScript Document
    $(document).ready(function() {
    // console.log(Handlebars);
    //     Handlebars.registerHelper("FormatDate", function(date) {
    //       //return phoneNumber = phoneNumber.toString();
    //       var y = date.getFullYear(),
    //           m = date.getMonth() + 1,
    //           d = date.getDate();
    //       return y + '/' + m + '/' + d;
    //     });

        $(".rslides1").responsiveSlides({
            //auto: false,
            //nav: true,
            pause: true,
            pager: true,
            speed: 300
            //maxwidth: 540
        });
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
})


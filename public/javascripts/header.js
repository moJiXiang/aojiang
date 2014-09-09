require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'jquery',
    }
})
define(['jquery'], function($){
	// Top Text widget cycle                                

    $('.info-text').cycle({
        fx: 'scrollDown',
        speed: 500,
        timeout: 3500,
        pause: 1,
        cleartypeNoBg: true
    });


    setTimeout(function() {

        $('.top-bar').slideDown();

        //Social icon hover

        $('ul.socicon li').fadeTo(300, 0.5);
        var width = 0;
        var sWidth = width += $('ul.top-w li').outerWidth(true);
        var n = $('ul.top-w li').length;

        $('ul.top-w li').hover(function() {
            $(this).fadeTo(300, 0.8);

        },
        function() {
            $(this).fadeTo(300, 0.5);

        });

        $('ul.top-w').hover(function() {
            $('ul.top-w').stop().animate({
                width: sWidth * n
            },
            {
                duration: 500,
                specialEasing: {
                    width: 'swing'
                }
            });

        },
        function() {
            $('ul.top-w').stop().animate({
                width: '30px'
            },
            {
                duration: 500,
                specialEasing: {
                    width: 'swing'
                }
            });

        });

    },
    1000);
	// Search effect 
    
    $('.navbar-search').hover(function() {
        $('.search-query').stop().animate({
            width: '150px'
        },
        {
            duration: 500,
            specialEasing: {
                width: 'swing'
            }
        });

    },
    function() {
        $('.search-query').stop().animate({
            width: '8px'
        },
        {
            duration: 500,
            specialEasing: {
                width: 'swing'
            }
        });

    });

    $("#header input#searchsubmit").mouseover(function() {
        $('#header #search form input#s').stop(false, true).animate({
            width: '152px',
            marginRight: '-6px',
            paddingLeft: '10px',
            paddingRight: '10px'
        }).focus();
    });
    $("#header #search").mouseleave(function() {
        value = '';
        $('#header #search form input#s').stop(false, true).animate({
            width: '3px',
            marginRight: '0',
            padding: '0'
        }).blur().val(value);
    });
})
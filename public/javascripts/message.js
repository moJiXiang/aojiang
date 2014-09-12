require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'jquery',
    }
})
define(['jquery'], function($){
	// Top Text widget cycle                                
    $('.header').find('li').removeClass('current').eq(3).addClass('current');

	// Carousel plugin
    $('.testimonialswrap').carousel({
        slider: '#testimonials',
        slide: '.testimonials-slide',
        nextSlide: '.next-l',
        prevSlide: '.prev-l',
        addNav: false
    });

})
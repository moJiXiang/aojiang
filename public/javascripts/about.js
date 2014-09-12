require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'jquery',
    }
})
define(['jquery'], function($){
	// Top Text widget cycle                                
    $('.header').find('li').removeClass('current').eq(1).addClass('current');

	// Carousel plugin
	// $('#Carousel').carousel({
	// 	slider: '#carousel-inner',
	// 	slide: '.carousel-item',
	// 	nextSlide: '.right',
	// 	prevSlide: '.left',
 //        addNav : false
	// });
	$('.testimonialswrap').carousel({
                slider: '#testimonials',
                slide: '.testimonials-slide',
                nextSlide : '.next-l',
                prevSlide : '.prev-l',
                addNav : false
            });

})
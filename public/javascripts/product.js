require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'jquery',
    }
})

define(['jquery'], function($){
	// Top Text widget cycle                                
    $('.header').find('li').removeClass('current').eq(2).addClass('current');

    console.log('sdf');
    //Portfolio filter

    $('ul#portfolio-filter a').click(function() {

        $('ul#portfolio-filter a.currents').removeClass('currents');
        $(this).addClass('currents');

        var filterVal = $(this).text().toLowerCase().replace(' ', '-');

        if (filterVal == 'all') {
            $('#containment-portfolio li.hidden').show(1000).removeClass('hidden');
        } else {

            $('#containment-portfolio li').each(function() {
                if (!$(this).hasClass(filterVal)) {
                    $(this).hide(1000).addClass('hidden');

                } else {
                    $(this).show(1000).removeClass('hidden');

                }
            });
        }

        return false;
    });

})
$(document).ready(function() {
	$('#saveproduct').click(function() {
		
		var product = $('form.product').serialize();
		console.log(product);

	})
	$('#saveattr').click(function() {
		var attr = $('form.attribute').serialize();
		console.log(attr);
		$.post('/addattr', attr, function(data) {
			console.log(data);
		})
	})
})
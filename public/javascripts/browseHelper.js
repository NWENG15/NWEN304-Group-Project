$(document).ready(function(e) {
	
		$.ajax({
			method: 'GET',
			url: '/',
			contentType: 'application/json',
			success: function(response){
			console.log('Database retrieval successful!'); 
			}
		});	
});